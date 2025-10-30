import { ref, set } from "firebase/database";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, database } from "../../firebase";
import { useAuthStore } from "../../components/zustand/stores/authStore";
import type { RegistrationData } from "../validation/validation";

export default async function sendToBackend(
  data: RegistrationData
): Promise<void> {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    const user = userCredential.user;

    await updateProfile(user, { displayName: data.name });

    const userRef = ref(database, `users/${user.uid}`);
    await set(userRef, {
      name: data.name,
      email: data.email,
      registeredAt: new Date().toISOString(),
    });

    useAuthStore.getState().setUser(user);

    console.log("✅ Користувач успішно створений і збережений у БД");
    // return user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Помилка при створенні користувача:", error.message);
      throw error;
    }
  }
}
