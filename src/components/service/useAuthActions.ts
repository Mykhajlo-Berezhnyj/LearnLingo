import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  updateProfile,
  signOut,
  type User,
} from "firebase/auth";
import { ref, set, get } from "firebase/database";
import { auth, database } from "../../firebase";
import { useAuthStore } from "../zustand/stores/authStore";
import { FirebaseError } from "firebase/app";
import type { RegistrationData, LoginData } from "../validation/validation";
import { usePaginatedTeachersStore } from "../zustand/stores/teachers";

export function useAuthActions() {
  const setUser = useAuthStore.getState().setUser;

  const saveUserToDatabase = async (user: User, additionalData?: any) => {
    const userRef = ref(database, `users/${user.uid}`);

    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      await set(userRef, {
        name: user.displayName || additionalData?.name || "User",
        email: user.email || "",
        photoURL: user.photoURL || "",
        provider: user.providerData[0]?.providerId || "email",
        registeredAt: new Date().toISOString(),
        ...additionalData,
      });
    }
  };

  const register = async (data: RegistrationData): Promise<User> => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(user, { displayName: data.name });

      await saveUserToDatabase(user, { name: data.name });

      setUser(user);
      return user;
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/email-already-in-use") {
          throw new Error("This email is already in use");
        }
        if (error.code === "auth/weak-password") {
          throw new Error("Password is too weak");
        }
      }
      throw error;
    }
  };

  const login = async (data: LoginData): Promise<User> => {
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      setUser(user);
      return user;
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (
          error.code === "auth/user-not-found" ||
          error.code === "auth/invalid-credential"
        ) {
          throw new Error("Invalid email or password");
        }
        if (error.code === "auth/wrong-password") {
          throw new Error("Wrong password");
        }
      }
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    await signOut(auth);
    setUser(null);
    usePaginatedTeachersStore.getState().resetFavorites();
  };

  const googleLogin = async (): Promise<User> => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await saveUserToDatabase(user);

      setUser(user);
      return user;
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/popup-closed-by-user") {
          throw new Error("Login cancelled");
        }
        if (error.code === "auth/account-exists-with-different-credential") {
          throw new Error("An account already exists with this email");
        }
      }
      throw error;
    }
  };

  const facebookLogin = async (): Promise<User> => {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await saveUserToDatabase(user);

      setUser(user);
      return user;
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/popup-closed-by-user") {
          throw new Error("Login cancelled");
        }
        if (error.code === "auth/account-exists-with-different-credential") {
          throw new Error("An account already exists with this email");
        }
      }
      throw error;
    }
  };

  const githubLogin = async (): Promise<User> => {
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await saveUserToDatabase(user);

      setUser(user);
      return user;
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/popup-closed-by-user") {
          throw new Error("Login cancelled");
        }
        if (error.code === "auth/account-exists-with-different-credential") {
          throw new Error("An account already exists with this email");
        }
      }
      throw error;
    }
  };

  return { register, login, logout, googleLogin, facebookLogin, githubLogin };
}
