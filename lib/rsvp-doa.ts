import { prisma } from "@/lib/prisma";

export type RsvpDoaEntry = {
  name: string;
  attendance: "attending" | "declining";
  notes: string;
};

export async function getRsvpDoaEntries(): Promise<RsvpDoaEntry[]> {
  try {
    const records = await prisma.rsvp.findMany({
      select: { name: true, attendance: true, notes: true },
      orderBy: { updatedAt: "desc" },
    });

    return records.flatMap(({ name, attendance, notes }) => {
      const message = notes.trim();
      if (!message || (attendance !== "attending" && attendance !== "declining")) return [];
      return [{ name, attendance, notes: message }];
    });
  } catch {
    return [];
  }
}
