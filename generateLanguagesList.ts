import { getDatabase, ref, get, set } from "firebase/database";

export async function generateLanguagesList() {
  const db = getDatabase();
  const teachersRef = ref(db, "teachers");

  const snapshot = await get(teachersRef);
  if (!snapshot.exists()) {
    return;
  }

  const teachers = snapshot.val();
  const allLanguages = new Set<string>();

  Object.values(teachers).forEach((teacher: any) => {
    if (teacher.languages) {
      Object.keys(teacher.languages).forEach((lang) => {
        allLanguages.add(lang);
      });
    }
  });

  const languagesObj: Record<string, boolean> = {};
  for (const lang of allLanguages) {
    languagesObj[lang] = true;
  }

  await set(ref(db, "languages"), languagesObj);
}
