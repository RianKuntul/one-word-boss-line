// One Word for the Boss — entry writer.
//
// Revision 2: the word, rethought.
//
// The first draft used "Helicopter" — a boss who hovers. It works, but
// it borrows its joke from "helicopter parent", so the laugh arrives
// second-hand. This revision picks a word that names a boss habit
// people have actually lived through, in one complete little scene:
//
//   Seagull
//
// The seagull boss is never around — until they are. They swoop in
// out of nowhere, squawk very loudly about everything, dump a mess
// on the whole team, and fly off again, leaving everyone else to
// clean it up. Kitchen, warehouse or office: anyone who has worked
// a shift under one recognises the bird instantly, no caption needed.
//
// Rather than hard-coding the winner, the program keeps the shortlist
// it was chosen from, scores each candidate on the judge's own order
// of criteria, and writes the best one. That keeps the choice honest
// and auditable instead of a magic string.
//
// Gate (from the kit): /output/entry.txt must be UTF-8 text of
// 1 to 30 characters and not only white space. The judge brief also
// demands exactly one word, so any candidate containing a space is
// rejected before it can be written.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_CHARS = 30;

interface Candidate {
  word: string;
  // Scored 0-5 in the judge's priority order.
  describesBoss: number; // actually used about the person you report to
  funnyAlone: number; // a colleague would repeat it at lunch
  ringsTrue: number; // catches a real, lived boss habit
  fresh: number; // not the first word anyone would reach for
  travels: number; // works in a kitchen, a warehouse or an office
}

const SHORTLIST: Candidate[] = [
  { word: "Helicopter", describesBoss: 4, funnyAlone: 3, ringsTrue: 4, fresh: 2, travels: 5 },
  { word: "Micromanager", describesBoss: 5, funnyAlone: 1, ringsTrue: 5, fresh: 0, travels: 5 },
  { word: "Overtime", describesBoss: 1, funnyAlone: 1, ringsTrue: 3, fresh: 1, travels: 4 },
  { word: "Seagull", describesBoss: 5, funnyAlone: 5, ringsTrue: 5, fresh: 4, travels: 5 },
];

// Earlier criteria outweigh later ones, mirroring the judge's brief:
// weight each score by a falling factor so a fresher word can never
// beat a word that describes a boss better.
function rank(candidate: Candidate): number {
  const scores = [
    candidate.describesBoss,
    candidate.funnyAlone,
    candidate.ringsTrue,
    candidate.fresh,
    candidate.travels,
  ];
  return scores.reduce((total, score, i) => total + score * (scores.length - i), 0);
}

function pickWord(): string {
  const winner = [...SHORTLIST].sort((a, b) => rank(b) - rank(a))[0];
  if (!winner) throw new Error("shortlist is empty: no word to enter");
  return winner.word;
}

function checkGate(text: string): void {
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (/\s/.test(text)) {
    throw new Error("entry must be exactly one word: no spaces allowed");
  }
}

function main(): void {
  const word = pickWord();
  checkGate(word);

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });

  const outFile = join(outDir, "entry.txt");
  writeFileSync(outFile, word, "utf8");

  // Read the file back and hold the bytes on disk — not just the
  // in-memory string — to the gate before declaring success.
  const written = readFileSync(outFile, "utf8");
  checkGate(written);
  if (written !== word) {
    throw new Error(`entry.txt mismatch: picked "${word}", read "${written}"`);
  }

  console.log(`wrote ${outFile}: "${written}" (${written.length} chars)`);
}

main();
