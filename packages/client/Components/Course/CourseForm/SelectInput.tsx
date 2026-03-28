import { useFormContext, RegisterOptions } from "react-hook-form";
import Field from "./Field";
import Label from "./Label";


type Props = {
    name: string;
    label?: string;
    options: Option[];
    placeholder?: string;
    registerOptions?: RegisterOptions;
}

type Option = {
  label: string;
  value: string;
};


const SelectInput = ({
  name,
  label,
  options,
  placeholder = "Select an option",
  registerOptions = {},
}: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Field>
      {label && <Label htmlFor={name}>{label}</Label>}

      <select
        id={name}
        className="border-gray-200 p-2 rounded-md"
        {...register(name, registerOptions)}
      >
        <option value="">{placeholder}</option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </Field>
  );
};

export default SelectInput;