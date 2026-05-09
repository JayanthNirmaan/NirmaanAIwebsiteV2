import { readdirSync, readFileSync, writeFileSync, renameSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const OUT = join(process.cwd(), "out");
const FROM = "_next";
const TO = "next";

if (!existsSync(join(OUT, FROM))) {
  console.log(`No ${FROM} folder in out/, skipping.`);
  process.exit(0);
}

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const s = statSync(full);
    if (s.isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

const TEXT_EXT = /\.(html?|js|mjs|css|json|txt|xml|map)$/i;
let changed = 0;

for (const f of walk(OUT)) {
  if (!TEXT_EXT.test(f)) continue;
  const before = readFileSync(f, "utf8");
  if (!before.includes("_next")) continue;
  const after = before.replaceAll("/_next/", `/${TO}/`).replaceAll('"_next/', `"${TO}/`).replaceAll("'_next/", `'${TO}/`);
  if (after !== before) {
    writeFileSync(f, after);
    changed++;
  }
}

renameSync(join(OUT, FROM), join(OUT, TO));
console.log(`Renamed ${FROM} -> ${TO}, rewrote ${changed} files.`);
