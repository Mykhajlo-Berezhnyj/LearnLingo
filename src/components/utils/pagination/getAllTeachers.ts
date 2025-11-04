import { getDatabase, ref, get } from "firebase/database";
import type { TeacherRaw, Teacher } from "../../../types/teacher";

export async function getAllTeachers(): Promise<Teacher[]> {
  const db = getDatabase();
  const snapshot = await get(ref(db, "teachers"));
  const raw = snapshot.val();
  if (!raw) return [];

  return Object.entries(raw).map(([id, value]: [string, TeacherRaw]) => ({
    id,
    ...value,
    avatar_url: value.avatar_url || "/images/defaultAvatar.png",
    languages: value.languages ? Object.keys(value.languages) : [],
    levels: value.levels ? Object.keys(value.levels) : [],
    reviews: value.reviews ? Object.values(value.reviews) : [],
    conditions: value.conditions ? Object.values(value.conditions) : [],
  }));
}
