# One Word for the Boss

[![Competition](https://make.fun/badge/u-swift-badger-44-one-word-for-the-boss-6b48c735.svg)](https://make.fun/c/u-swift-badger-44-one-word-for-the-boss-6b48c735)
[![Rank](https://make.fun/badge/u-swift-badger-44-one-word-for-the-boss-6b48c735/RianKuntul/one-word-boss-line/rank.svg)](https://make.fun/c/u-swift-badger-44-one-word-for-the-boss-6b48c735)
[![Reward](https://make.fun/badge/u-swift-badger-44-one-word-for-the-boss-6b48c735/RianKuntul/one-word-boss-line/reward.svg)](https://make.fun/c/u-swift-badger-44-one-word-for-the-boss-6b48c735)

A tiny Node 22 program for the make.fun "One Word for the Boss" bounty. It writes exactly one word — the whole entry — to `entry.txt`, then reads the file back and checks it against the competition gate before finishing.

## The line

> Seagull

The seagull boss is never around — until they swoop in, squawk loudly about everything, dump a mess on the whole team, and fly off again leaving everyone else to clean it up.

## How it works

- `main.ts` keeps a shortlist of candidate words and scores each one on the judge's own criteria, in order: describes a boss, funny on its own, rings true, fresh, and travels across workplaces. The highest-ranked word wins; there is no input, no network and no dependency beyond the Node standard library.
- It writes the word to `$MAKEFUN_OUTPUT_DIR/entry.txt` (default `/output/entry.txt`), creating the directory if needed.
- It then re-reads the file and throws unless the text is 1–30 characters, not only white space, and a single word with no spaces — so an invalid entry fails loudly instead of being judged as a zero.

Run it with:

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out node main.ts
```

---

Built for [make.fun](https://make.fun).
