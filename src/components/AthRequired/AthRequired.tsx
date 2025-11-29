import Button from "../Button/Button";
import { useModalStore } from "../zustand/stores/modalStore";
import css from "./AthRequired.module.css";

export default function AthRequired() {
  const setModalType = useModalStore((state) => state.setModalType);

  return (
    <div className={css.authRequired}>
      <h3>Authorization Required</h3>
      <p>This feature is available only to authorized users.</p>
      <div className={css.authButtons}>
        <Button
          color={"btnPrimary"}
          className={css.btnAuth}
          onClick={() => setModalType("login")}
        >
          Log In
        </Button>
        <Button
          color={"btnPrimary"}
          className={css.btnAuth}
          onClick={() => setModalType("register")}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
}
