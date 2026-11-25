import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "We're StatueCare: subscription licensing for pigeon-approved perches on bronze generals. You own the statue; we monetize the shoulders. Currently in negotiations with a warhorse.";

const len = [...LINE].length;
if (len < 1 || len > 200) {
  console.error(`entry must be 1-200 characters, got ${len}`);
  process.exit(1);
}
if (/[\u0000-\u001f\u007f]/.test(LINE)) {
  console.error("entry must not contain control characters");
  process.exit(1);
}
if (LINE !== LINE.trim() || LINE.includes("\n")) {
  console.error("entry must be a single line with no leading/trailing whitespace");
  process.exit(1);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE + "\n", "utf8");

// Read-back check: the file on disk must be exactly the line + newline.
const onDisk = readFileSync("/output/entry.txt", "utf8");
if (onDisk !== LINE + "\n") {
  console.error("read-back mismatch: entry.txt does not match the line");
  process.exit(1);
}
