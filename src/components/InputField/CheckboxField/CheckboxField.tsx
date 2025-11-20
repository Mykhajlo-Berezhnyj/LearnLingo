export function CheckboxField({ name, label, register, error }) {
  return (
    <label className="checkboxWrapper">
      <input type="checkbox" {...register(name)} />
      {label}
      {error && <span className="error">{error}</span>}
    </label>
  );
}
