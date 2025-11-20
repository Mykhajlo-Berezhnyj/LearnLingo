import Icon from "../../Icon/Icon";

export function RadioGroup({ name, options, watch, register, error, label }) {
  const selected = watch(name);

  return (
    <div className="radioWrap">
      <h3 className="radioLabel">{label}</h3>

      <div className="radioGroup">
        {options.map((opt) => (
          <label key={opt.value} className="radioOption">
            <input
              type="radio"
              {...register(name)}
              value={opt.value}
              className="hiddenRadio"
            />

            {selected === opt.value ? (
              <Icon iconName="radio-checked" size={24} />
            ) : (
              <Icon iconName="radio" size={24} />
            )}

            <span>{opt.label}</span>
          </label>
        ))}
      </div>

      {error && <span className="error">{error}</span>}
    </div>
  );
}
