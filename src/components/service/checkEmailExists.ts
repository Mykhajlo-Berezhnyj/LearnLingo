import { createUserWithEmailAndPassword, AuthError } from "firebase/auth";
import { auth } from "../../firebase";

let isCheckingEmailGlobal = false;

export function getIsCheckingEmail() {
  return isCheckingEmailGlobal;
}

export async function checkEmailExists(email: string): Promise<boolean> {
  isCheckingEmailGlobal = true;

  try {
    const randomPassword = Math.random().toString(36).slice(-12) + "Aa1!";

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.trim().toLowerCase(),
      randomPassword
    );

    await userCredential.user.delete();
    return false;
  } catch (error) {
    const authError = error as AuthError;

    if (authError.code === "auth/email-already-in-use") {
      return true;
    }

    if (authError.code === "auth/invalid-email") {
      return false;
    }

    console.error("Error checking email:", authError);
    return false;
  } finally {
    setTimeout(() => {
      isCheckingEmailGlobal = false;
    }, 100);
  }
}
