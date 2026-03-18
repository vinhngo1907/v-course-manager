import { useFormContext, RegisterOptions } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import Field from "./Field";
import Label from "./Label";

type Props = {
  name: string;
  label?: string;
  options?: RegisterOptions;
};

const TextAreaInput = ({ name, label, options }: Props) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <Field>
      {label && <Label htmlFor={name}>{label}</Label>}

      <TextareaAutosize
        minRows={3}
        className="
        w-full
        rounded-md
        px-3
        py-2
        bg-[#FFF1DC]
        border
        border-[#FFB347]/40
        text-[#2C2C2C]
        placeholder-[#F5A028]/60
        focus:outline-none
        focus:ring-2
        focus:ring-[#FFB347]
        focus:border-[#FFB347]
        transition
        "
        {...register(name, options)}
      />

      {errors[name] && (
        <span className="text-red-500 text-sm mt-1">
          {name} is required
        </span>
      )}
    </Field>
  );
};

export default TextAreaInput;