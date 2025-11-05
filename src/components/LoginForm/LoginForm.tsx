import type { User } from "firebase/auth";
import type { FieldConfig } from "../AuthForm/AuthForm";
import AuthForm from "../AuthForm/AuthForm";
import { useAuthActions } from "../service/useAuthActions";
import { LoginData, loginSchema } from "../validation/validation";
import { useModalStore } from "../zustand/stores/modalStore";

const fields: FieldConfig<LoginData>[] = [
  { name: "email", type: "email", placeholder: "Email" },
  { name: "password", type: "password", placeholder: "Password" },
];

export default function LoginForm() {
  const closeModal = useModalStore((store) => store.closeModal);
  const { login } = useAuthActions();

  return (
    <AuthForm<typeof loginSchema, User>
      sendToBackend={login}
      schema={loginSchema}
      titleForm={"Log In"}
      textForm={
        "Welcome back! Please enter your credentials to access your account and continue your search for an teacher."
      }
      btnLabel={"Log In"}
      successMessage={(user) =>
        `Log In successful! Welcome back, ${user.displayName ?? "user"}!`
      }
      onSuccess={(user) => {
        console.log("User log In:", user);
        closeModal();
      }}
      fields={fields}
    />
  );
}
