import "dotenv/config";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";

export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY!,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN!,
  databaseURL: process.env.FIREBASE_DATABASE_URL!,
  projectId: process.env.FIREBASE_PROJECT_ID!,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.FIREBASE_APP_ID!,
};

const app = initializeApp(firebaseConfig);
const rtdb = getDatabase(app);
const firestore = getFirestore(app);

function normalizeArray(input: unknown): string[] {
  if (!input) return [];
  if (Array.isArray(input)) return input;
  if (typeof input === "object") return Object.values(input) as string[];
  return [];
}

async function fixTeacherArrays(id: string, value: any) {
  const ref = doc(firestore, "teachers", id);

  // 🔹 1. Видаляємо старі поля
  await updateDoc(ref, {
    languages: deleteField(),
    levels: deleteField(),
    conditions: deleteField(),
    reviews: deleteField(),
  });

  // 🔹 2. Записуємо нові масиви
  await updateDoc(ref, {
    languages: [
      ...Object.values((value.languages as Record<string, string>) || {}),
    ],
    levels: [...Object.values((value.levels as Record<string, string>) || {})],
    conditions: [
      ...Object.values((value.conditions as Record<string, string>) || {}),
    ],
    reviews: [
      ...Object.values((value.reviews as Record<string, string>) || {}),
    ],
  });

  console.log(`✅ Fixed arrays for ${id}`);
}

async function migrateTeachers() {
  const snapshot = await get(ref(rtdb, "teachers"));
  const raw = snapshot.val();

  if (!raw) {
    console.log("❌ No teachers found in Realtime DB");
    return;
  }

  const entries = Object.entries(raw);
  console.log(`🔄 Found ${entries.length} teachers`);

  for (const [id, value] of entries) {
    const teacher = {
      languages: [
        ...Object.values((value.languages as Record<string, string>) || {}),
      ],
      levels: [
        ...Object.values((value.levels as Record<string, string>) || {}),
      ],
      conditions: [
        ...Object.values((value.conditions as Record<string, string>) || {}),
      ],
      reviews: [
        ...Object.values((value.reviews as Record<string, string>) || {}),
      ],
    };

    //     };

    try {
      await setDoc(doc(firestore, "teachers", id), teacher, { merge: true });
      await fixTeacherArrays(id, value);

      // await setDoc(doc(firestore, "teachers", id), teacher, { merge: true });
      console.log(`✅ Migrated teacher: ${id}`);
      console.log("✅ languages:", [...Object.values(value.languages || {})]);
      console.log("✅ conditions:", [...Object.values(value.conditions || {})]);
      console.log(
        "✅ Array.isArray:",
        Array.isArray([...Object.values(value.languages || {})])
      );
    } catch (err) {
      console.error(`❌ Error migrating ${id}:`, err);
    }
  }

  console.log("🎉 Migration complete");
}

migrateTeachers();
