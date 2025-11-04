import toast from "react-hot-toast";
import type { Teacher } from "../../../types/teacher";
import Icon from "../../Icon/Icon";
import { usePaginatedTeachersStore } from "../../zustand/stores/teachers";
import Button from "../Button";
import css from "./BtnFavorit.module.css";
import { useAuthStore } from "../../zustand/stores/authStore";
import { useModalStore } from "../../zustand/stores/modalStore";

export default function BtnFavorit({
  className,
  teacher,
}: {
  className: string;
  teacher: Teacher;
}) {
  const user = useAuthStore((s) => s.user);
  const favorites = usePaginatedTeachersStore((state) => state.favorites);
  const isFavorite = favorites.includes(teacher.id);
  const toggleFavorite = usePaginatedTeachersStore(
    (state) => state.toggleFavorite
  );
  const setModalType = useModalStore((state) => state.setModalType);

  const handleFavorite = async () => {
    if (!user?.uid) {
      setModalType("authRequired");
      return;
    }
    try {
      await toggleFavorite(teacher.id);
      const updatedFavorites = usePaginatedTeachersStore.getState().favorites;
      const nowFavorite = updatedFavorites.includes(teacher.id);
      toast.success(
        nowFavorite ? "Added to favorites" : "Removed from favorites"
      );
    } catch (error) {
      toast.error("Failed to update favorites");
      console.error("toggleFavorite error:", error);
    }
  };

  return (
    <Button
      className={className}
      onClick={handleFavorite}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Icon
        iconName={"heart"}
        className={isFavorite ? css.isFavorite : css.noFavorite}
        size={26}
      />
    </Button>
  );
}
