import { useAuthActions } from "../../service/useAuthActions";
import { useModalStore } from "../../zustand/stores/modalStore";
import toast from "react-hot-toast";
import css from "./SocialAuthButton.module.css";

interface SocialAuthButtonProps {
  provider: "google" | "facebook" | "github";
  label?: string;
}

export default function SocialAuthButton({
  provider,
  label,
}: SocialAuthButtonProps) {
  const { googleLogin, facebookLogin, githubLogin } = useAuthActions();
  const closeModal = useModalStore((s) => s.closeModal);

  const handleClick = async () => {
    try {
      let user;
      if (provider === "google") user = await googleLogin();
      if (provider === "facebook") user = await facebookLogin();
      if (provider === "github") user = await githubLogin();

      toast.success(`Welcome, ${user?.displayName ?? "user"}!`);
      closeModal();
    } catch (err) {
      toast.error("Social login failed");
    }
  };

  return (
    <button className={css.socialButton} onClick={handleClick}>
      {label ?? `Continue with ${provider}`}
    </button>
  );
}
