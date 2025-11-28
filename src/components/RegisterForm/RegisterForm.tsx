import { registrationSchema } from "../validation/validation";
import type { RegistrationData } from "../validation/validation";
import AuthForm from "../AuthForm/AuthForm";
import type { FieldConfig } from "../AuthForm/AuthForm";
import { useModalStore } from "../zustand/stores/modalStore";
import { useAuthActions } from "../service/useAuthActions";
import { checkEmailExists } from "../service/checkEmailExists";
import { useAuthStore } from "../zustand/stores/authStore";
import toast from "react-hot-toast";
import OtherAuth from "../OtherAuth/OtherAuth";
import css from "./RegisterForm.module.css";

const fields: FieldConfig<RegistrationData>[] = [
  { name: "name", placeholder: "Name" },
  {
    name: "email",
    type: "email",
    placeholder: "Email",
    onBlur: async (e) => {
      const email = e.target.value;
      if (!email) return;
      try {
        const exists = await checkEmailExists(email);
        if (exists) {
          toast(
            "Welcome back! This email is already registered in our system. Please enter your password to log in.",
            { duration: 4000 }
          );
          useAuthStore.getState().setPendingEmail(email);
          useModalStore.getState().setModalType("login");
        }
      } catch (error) {
        console.error("Error checking email:", error);
      }
    },
  },
  { name: "password", type: "password", placeholder: "Password" },
];

export default function RegistrationForm() {
  const closeModal = useModalStore((state) => state.closeModal);
  const { register } = useAuthActions();
  return (
    <AuthForm
      sendToBackend={register}
      schema={registrationSchema}
      titleForm={"Registration"}
      textForm={
        "Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information"
      }
      btnLabel={"Sign Up"}
      successMessage={(user) =>
        `Registration successful! Welcome, ${user.displayName ?? "user"}!`
      }
      onSuccess={() => {
        closeModal();
      }}
      fields={fields}
      otherContent2={<OtherAuth className={css.otherAuth} />}
    />
  );
}
