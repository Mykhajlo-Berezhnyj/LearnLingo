import { FirebaseError } from "firebase/app";
import toast from "react-hot-toast";

export function handleFirebaseError(err: unknown) {
  if (err instanceof FirebaseError) {
    switch (err.code) {
      case "auth/network-request-failed":
        toast.error("Network error. Please check your internet connection.");
        break;
      case "auth/wrong-password":
        toast.error("Incorrect password.");
        break;
      case "auth/user-not-found":
        toast.error("No user found with this email.");
        break;
      case "auth/email-already-in-use":
        toast.error("This email is already registered.");
        break;
      case "auth/invalid-email":
        toast.error("Invalid email format.");
        break;
      case "auth/too-many-requests":
        toast.error("Too many attempts. Please try again later.");
        break;
      default:
        toast.error(`Firebase error: ${err.message}`);
    }
  } else if (err instanceof Error) {
    toast.error(`Error: ${err.message}`);
  } else {
    toast.error("Unknown error occurred.");
  }
}
