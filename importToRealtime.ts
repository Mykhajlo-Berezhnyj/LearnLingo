import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import raw from "./teachers.json"; // твій JSON
import { firebaseConfig } from "./migrateTeachers"; // твій конфіг

const app = initializeApp(firebaseConfig);
const rtdb = getDatabase(app);

// 🔧 Перетворює масиви на об’єкти
function transformTeacherData(raw: Record<string, any>) {
  const transformed: Record<string, any> = {};

  for (const [id, teacher] of Object.entries(raw)) {
    transformed[id] = {
      ...teacher,
      languages: Object.fromEntries(
        (teacher.languages || []).map((l) => [l, true])
      ),
      levels: Object.fromEntries((teacher.levels || []).map((l) => [l, true])),
      //   conditions: Object.fromEntries(
      //     (teacher.conditions || []).map((c) => [c, true])
      //   ),
      //   reviews: Object.fromEntries(
      //     (teacher.reviews || []).map((r, i) => [`review${i + 1}`, r])
      //   ),
    };
  }

  return transformed;
}

async function importToRealtime() {
  const transformed = transformTeacherData(raw);
  await set(ref(rtdb, "teachers"), transformed);
}

importToRealtime();
