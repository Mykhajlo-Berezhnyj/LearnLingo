import InputField from "../../InputField/InputField";
import PasswordField from "../../PasswordField/PasswordField";

export function TextFieldsGroup({ fields, register, errors }) {
  return (
    <div className="inputWrap">
      {fields.map((field) => {
        const error = errors[field.name]?.message as string | undefined;

        if (field.type === "password") {
          return (
            <PasswordField
              key={field.name}
              name={field.name}
              register={register}
              placeholder={field.placeholder}
              error={error}
            />
          );
        }

        return (
          <InputField
            key={field.name}
            name={field.name}
            type={field.type}
            register={register}
            placeholder={field.placeholder}
            error={error}
          />
        );
      })}
    </div>
  );
}
