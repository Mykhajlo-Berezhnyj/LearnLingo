export function SelectField({ name, options, register, error }) {
  return (
    <div className="inputWrapper">
      <select {...register(name)}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {error && <span className="error">{error}</span>}
    </div>
  );
}
