import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import { useAuthActions } from "../service/useAuthActions";
import { useModalStore } from "../zustand/stores/modalStore";
import css from "./OtherAuth.module.css";

export default function OtherAuth({ className }: { className: string }) {
  const { modalType, setModalType } = useModalStore();
  const { googleLogin } = useAuthActions();

  return (
    <div className={className}>
      <Button
        color={"btnPrimary"}
        className={css.btnGoogle}
        onClick={() => {
          googleLogin();
          setModalType(null);
        }}
      >
        <Icon iconName={"google"} className={css.iconGoogle} size={24} />
        {modalType === "register" ? "Sign in" : "Log in"} Google
      </Button>
      <Button
        className={css.btnOtherAuth}
        onClick={() =>
          setModalType(modalType === "register" ? "login" : "register")
        }
      >
        {modalType === "register" ? "Log in" : "Registration"}{" "}
      </Button>
    </div>
  );
}
