export const customSelectStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: "var(--background)",
    border: "none",
    boxShadow: "none",
    height: 48,
    borderRadius: 14,
    display: "flex",
    alignItems: "center",
    // "&:hover": { borderColor: "#555" },
  }),
  valueContainer: (base) => ({
    ...base,
    height: 48,
    backgroundColor: "var(--background)",
    margin: 0,
    padding: "0 18px",
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "center",
    borderRadius: 14,
  }),
  placeholder: (base, state) => ({
    ...base,
    margin: 0,
    color: state.selectProps.error ? "red" : "var(--font-main)",
  }),
  singleValue: (base) => ({
    ...base,
    color: "var(--font-main)",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "var(--background)",
    borderRadius: 12,
    padding: "0 18px",
    zIndex: 20,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "var(--background)"
      : state.isFocused
      ? "var(--background)"
      : "var(--background)",
    color: state.isSelected
      ? "var(--color-font-main)"
      : state.isFocused
      ? "var(--color-font-main)"
      : "var(--color-font-second)",
    "&:active": {
      color: "var(--color-font-main)",
    },
    // "&:hover": {
    //   color: "#101828",
    //   backgroundColor: "#F7F7F7",
    // },
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
