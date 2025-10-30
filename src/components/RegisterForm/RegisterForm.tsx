import { registrationSchema } from "../validation/validation";
import type { RegistrationData } from "../validation/validation";
import AuthForm from "../AuthForm/AuthForm";
import type { FieldConfig } from "../AuthForm/AuthForm";
import { useModalStore } from "../zustand/stores/modalStore";
import { useAuthActions } from "../service/useAuthActions";

const fields: FieldConfig<RegistrationData>[] = [
  { name: "name", placeholder: "Name" },
  { name: "email", type: "email", placeholder: "Email" },
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
      onSuccess={(user) => {
        console.log("User created:", user);
        closeModal();
      }}
      fields={fields}
    />
  );
}
