import { readFile } from "node:fs/promises";
import path from "node:path";

export type BasNote = {
  id: number;
  calledByBas: string;
  knownFor: string;
  roast: string;
  appreciation: string;
};

function parseCsv(source: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    if (quoted) {
      if (char === '"' && source[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
    } else if (char === '"' && field.length === 0) {
      quoted = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && source[index + 1] === "\n") index += 1;
      row.push(field);
      if (row.some((value) => value.trim())) {
        rows.push(row);
      } else if (rows.length && row.length === 1) {
        rows[rows.length - 1][rows[rows.length - 1].length - 1] += "\n";
      }
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  if (quoted) throw new Error("Unclosed quoted field in about-bas.csv");
  if (field.length || row.length) {
    row.push(field);
    if (row.some((value) => value.trim())) rows.push(row);
  }
  return rows;
}

export async function getBasNotes(): Promise<BasNote[]> {
  const csv = await readFile(path.join(process.cwd(), "data/about-bas.csv"), "utf8");
  const rows = parseCsv(csv);
  return rows.slice(1).map((row, index) => ({
    id: index + 1,
    calledByBas: row[1]?.trim() ?? "",
    knownFor: row[2]?.trim() ?? "",
    roast: row[3]?.trim() ?? "",
    appreciation: row[4]?.trim() ?? "",
  })).filter((entry) => entry.calledByBas || entry.roast || entry.appreciation);
}
