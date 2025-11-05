import { ref, set, remove, get } from "firebase/database";
import { db } from "../../firebase";

export async function saveFavorite(userId: string, teacherId: string) {
  const favRef = ref(db, `favorites/${userId}/${teacherId}`);
  try {
    await set(favRef, true);
  } catch (error) {
    console.error("set() failed:", error);
  }
}

export async function removeFavorite(userId: string, teacherId: string) {
  const favRef = ref(db, `favorites/${userId}/${teacherId}`);
  try {
    await remove(favRef);
  } catch (error) {
    console.error("et() failed:", error);
  }
}

export async function fetchFavorites(userId: string): Promise<string[]> {
  try {
    const snapshot = await get(ref(db, `favorites/${userId}`));
    const data = snapshot.val() || {};
    return Object.keys(data);
  } catch (error) {
    console.error("Failed to fetch favorites:", error);
    return [];
  }
}
