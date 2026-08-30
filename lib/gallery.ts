import { readdir } from "node:fs/promises";
import path from "node:path";

const imageExtensions = new Set([".avif", ".jpeg", ".jpg", ".png", ".svg", ".webp"]);

export async function getGalleryImages() {
  const galleryDirectory = path.join(process.cwd(), "public", "gallery");

  try {
    const entries = await readdir(galleryDirectory, { withFileTypes: true });

    return entries
      .filter((entry) => entry.isFile() && !entry.name.startsWith("."))
      .filter((entry) => imageExtensions.has(path.extname(entry.name).toLowerCase()))
      .sort((first, second) => first.name.localeCompare(second.name))
      .map((entry) => ({
        fileName: entry.name,
        url: `/gallery/${encodeURIComponent(entry.name)}`,
      }));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }

    throw error;
  }
}