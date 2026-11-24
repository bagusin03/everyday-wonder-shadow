// Everyday Wonder, Two Days to Find the Line — one sentence, at most 200 chars.
// A small everyday moment made strange: your own shadow beats you to the
// crosswalk, as if it already knew where you were going — the familiar
// (crossing the street) turned by one quiet impossibility.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "My shadow beat me to the crosswalk by a step, as if it already knew where I was going.";

// Gate: the sealed scorer requires 1-200 UTF-8 characters, not only whitespace.
// Count code points (not UTF-16 units) so the check matches the scorer's
// character count even for non-BMP text.
const CHARS = Array.from(LINE).length;
if (CHARS < 1 || CHARS > 200 || LINE.trim().length === 0) {
  throw new Error(`entry must be 1-200 chars, got ${CHARS}`);
}
if (LINE.includes("\n")) {
  throw new Error("entry must be a single line");
}
// The brief demands exactly ONE sentence: a single terminal period, no
// other sentence-ending punctuation anywhere in the line.
const TERMINATORS = (LINE.match(/[.!?]/g) ?? []).length;
if (TERMINATORS !== 1 || !LINE.endsWith(".")) {
  throw new Error(`entry must be exactly one sentence, got ${TERMINATORS} terminators`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
