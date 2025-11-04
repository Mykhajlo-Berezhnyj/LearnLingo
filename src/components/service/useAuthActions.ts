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
import { ref, set } from "firebase/database";
import { auth, database } from "../../firebase";
import { useAuthStore } from "../zustand/stores/authStore";
import { FirebaseError } from "firebase/app";
import type { RegistrationData, LoginData } from "../validation/validation";
import { usePaginatedTeachersStore } from "../zustand/stores/teachers";

export function useAuthActions() {
  const setUser = useAuthStore.getState().setUser;

  const register = async (data: RegistrationData): Promise<User> => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(user, { displayName: data.name });

      const userRef = ref(database, `users/${user.uid}`);
      await set(userRef, {
        name: data.name,
        email: data.email,
        registeredAt: new Date().toISOString(),
      });

      setUser(user);
      return user;
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/email-already-in-use") {
          throw new Error("this email is existing");
        }
        if (error.code === "auth/weak-password") {
          throw new Error("Password low");
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
        if (error.code === "auth/user-not-found") {
          throw new Error("User not found");
        }
        if (error.code === "auth/wrong-password") {
          throw new Error("wrong password");
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
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    setUser(user);
    return user;
  };

  const facebookLogin = async (): Promise<User> => {
    const provider = new FacebookAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    setUser(user);
    return user;
  };

  const githubLogin = async (): Promise<User> => {
    const provider = new GithubAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    setUser(user);
    return user;
  };

  return { register, login, logout, googleLogin, facebookLogin, githubLogin };
}
