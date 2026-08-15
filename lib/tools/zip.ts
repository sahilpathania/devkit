import { unzipSync, zipSync, strToU8 } from "fflate";
import { replaceExtension } from "@/lib/tools/image-convert";

export const ACCEPT_ZIP = "application/zip,application/x-zip-compressed,.zip";

export interface ZipEntryInfo {
  name: string;
  size: number;
}

/** Create a ZIP from File objects (flat names; duplicates get a suffix). */
export async function createZip(
  files: File[],
  filename = "archive.zip"
): Promise<{ blob: Blob; filename: string; entries: ZipEntryInfo[] }> {
  if (!files.length) throw new Error("Add at least one file.");

  const used = new Set<string>();
  const entries: Record<string, Uint8Array> = {};
  const info: ZipEntryInfo[] = [];

  for (const file of files) {
    let name = file.name || "file";
    if (used.has(name)) {
      const ext = name.includes(".") ? name.slice(name.lastIndexOf(".")) : "";
      const base = ext ? name.slice(0, -ext.length) : name;
      let i = 2;
      while (used.has(`${base}-${i}${ext}`)) i++;
      name = `${base}-${i}${ext}`;
    }
    used.add(name);
    const bytes = new Uint8Array(await file.arrayBuffer());
    entries[name] = bytes;
    info.push({ name, size: bytes.byteLength });
  }

  const zipped = zipSync(entries, { level: 6 });
  return {
    blob: new Blob([zipped.slice().buffer], { type: "application/zip" }),
    filename,
    entries: info,
  };
}

export interface ExtractedZipFile {
  name: string;
  blob: Blob;
}

/** Extract a ZIP; returns file list. Folders (trailing /) are skipped. */
export async function extractZip(file: File): Promise<ExtractedZipFile[]> {
  if (
    !file.type.includes("zip") &&
    !file.name.toLowerCase().endsWith(".zip")
  ) {
    throw new Error("Please upload a .zip file.");
  }
  const data = new Uint8Array(await file.arrayBuffer());
  let unpacked: Record<string, Uint8Array>;
  try {
    unpacked = unzipSync(data);
  } catch {
    throw new Error("Could not read this ZIP (corrupt or unsupported).");
  }

  const out: ExtractedZipFile[] = [];
  for (const [name, bytes] of Object.entries(unpacked)) {
    if (name.endsWith("/")) continue;
    out.push({
      name,
      blob: new Blob([bytes.slice().buffer]),
    });
  }
  if (!out.length) throw new Error("ZIP is empty.");
  return out;
}

/** Re-pack extracted files into a single downloadable ZIP (for bulk download). */
export async function packExtracted(
  files: ExtractedZipFile[],
  filename = "extracted.zip"
): Promise<{ blob: Blob; filename: string }> {
  const entries: Record<string, Uint8Array> = {};
  for (const f of files) {
    entries[f.name] = new Uint8Array(await f.blob.arrayBuffer());
  }
  const zipped = zipSync(entries, { level: 6 });
  return {
    blob: new Blob([zipped.slice().buffer], { type: "application/zip" }),
    filename: filename.endsWith(".zip")
      ? filename
      : replaceExtension(filename, "zip"),
  };
}

/** Tiny helper kept for text entries if needed later. */
export function textToZipBytes(text: string): Uint8Array {
  return strToU8(text);
}
