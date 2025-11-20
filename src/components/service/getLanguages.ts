import { get, getDatabase, ref } from "firebase/database";

export async function getLanguages(): Promise<string[]> {
  const db = getDatabase();
  const snapshot = await get(ref(db, "languages"));
  if (!snapshot.exists()) return;
  return Object.keys(snapshot.val());
}
