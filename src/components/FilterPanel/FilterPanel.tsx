import { useEffect, useState } from "react";
import { getLanguages } from "../service/getLanguages";
import { teachersStore } from "../zustand/stores/teachers";
import FilterSelect from "../FilterSelect/FilterSelect";
import css from "./FilterPanel.module.css";
import Container from "../Container/Container";
import BtnClearFilters from "../Button/BtnClearFilters/BtnClearFilters";

export default function FilterPanel() {
  const { filters, setFilters, totalCount } = teachersStore();
  const [languages, setLanguages] = useState<string[]>([]);

  const levels = [
    "A1 Beginner",
    "A2 Elementary",
    "B1 Intermediate",
    "B2 Upper-Intermediate",
    "C1 Advanced",
    "C2 Proficient",
  ];
  const prices = Array.from({ length: 11 }, (_, i) => i + 25);

  useEffect(() => {
    async function fetchLanguages() {
      try {
        const data = await getLanguages();
        setLanguages(data);
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    }
    fetchLanguages();
  }, []);

  return (
    <div className={css.sectionFilters}>
      <Container className={css.containerFilters}>
        <div className={css.filterWrap}>
          <FilterSelect
            label="Language"
            className={css.filterLang}
            name="language"
            array={languages}
            value={filters.language || ""}
            onChange={(value) => {
              setFilters({ language: value });
            }}
            onClear={() => {
              setFilters({ language: null });
            }}
          />
          <FilterSelect
            label="Level of knowledge"
            className={css.filterLevel}
            name="levels"
            array={levels.map(String)}
            value={filters.level || ""}
            onChange={(value) => {
              setFilters({ level: value });
            }}
            onClear={() => {
              setFilters({ level: null });
            }}
          />
          <FilterSelect
            label="Price"
            className={css.filterPrice}
            name="price"
            array={prices.map(String)}
            value={filters.price_per_hour?.toString() || ""}
            onChange={(value) => setFilters({ price_per_hour: Number(value) })}
            onClear={() => setFilters({ price_per_hour: null })}
          />
        </div>
        {totalCount > 0 && (
          <p>
            {totalCount === 1
              ? "Found 1 teacher"
              : `Found ${totalCount} teachers`}
          </p>
        )}
        {totalCount === 0 && <BtnClearFilters className={css.btnClear} />}
      </Container>
    </div>
  );
}
