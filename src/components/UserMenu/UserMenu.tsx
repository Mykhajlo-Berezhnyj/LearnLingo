import BtnLogInOut from "../Button/BtnLogInOut/BtnLogInOut";
import { useAuthActions } from "../service/useAuthActions";
import { useAuthStore } from "../zustand/stores/authStore";
import css from "./UserMenu.module.css";

type UserMenuProps = {
  className?: string;
  onCloseMenu?: () => void;
};

export default function UserMenu({ className, onCloseMenu }: UserMenuProps) {
  const user = useAuthStore((store) => store.user);
  const userName = user.displayName || user.email || "User";
  const initial = userName[0];
  const { logout } = useAuthActions();

  return (
    <div className={className}>
      <div className={css.userInfo}>
        <span className={css.avatar}>{initial}</span>
        <span className={css.username}>{userName}</span>
      </div>
      <BtnLogInOut
        btnLabel={"Log Out"}
        iconPosition="right"
        classNameIcon={css.iconLogOut}
        onClick={() => {
          logout();
          onCloseMenu();
        }}
      />
    </div>
  );
}
