export const customSelectStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: "var(--background)",
    border: "none",
    boxShadow: "none",
    height: 48,
    borderRadius: "var(--input-radius)",
    display: "flex",
    alignItems: "center",
    "&:hover": { borderColor: "#555" },
  }),
  valueContainer: (base) => ({
    ...base,
    height: 48,
    margin: 0,
    padding: "0 14px",
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "center",
  }),
  placeholder: (base, state) => ({
    ...base,
    margin: 0,
    color: state.selectProps.error ? "red" : "var(--font-main)",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#333",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    zIndex: 10,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#FFFFFF"
      : state.isFocused
      ? "#e6f0ff"
      : "#fff",
    color: state.isSelected ? "#101828" : "#8D929A",
    "&:active": {
      color: "#101828",
    },
    "&:hover": {
      color: "#101828",
      backgroundColor: "#F7F7F7",
    },
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#101828",
    padding: 13,
    size: 20,
  }),
  indicatorSeparator: () => ({
    display: "block",
  }),
};
