import { teachersStore } from "../../zustand/stores/teachers";
import Button from "../Button";

interface BtnClearFiltersProps {
  className?: string;
}

export default function BtnClearFilters({ className }: BtnClearFiltersProps) {
  const { clearFilters } = teachersStore();

  return (
    <Button className={className} onClick={() => clearFilters()}>
      Reset all filters
    </Button>
  );
}
