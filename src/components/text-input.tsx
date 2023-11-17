import { FC, HTMLInputTypeAttribute } from "react";
import { Control, useController } from "react-hook-form";

interface Props {
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  textError?: string;
  size?: "xs" | "sm" | "md" | "lg";
  label?: string;
  control: Control<any>;
  name: string;
}

const TextInput: FC<Props> = ({
  type = "text",
  placeholder = "",
  textError = "",
  size = "md",
  label = "",
  control,
  name,
}) => {
  const { field } = useController({
    control,
    name,
  });
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text font-bold">{label}</span>
      </label>
      <input
        onChange={field.onChange} // send value to hook form
        onBlur={field.onBlur} // notify when input is touched/blur
        value={field.value} // input value
        name={field.name} // send down the input name
        ref={field.ref} // send input ref, so we can focus on input when error appear
        type={type}
        placeholder={placeholder}
        className={`input input-bordered w-full input-${size}`}
      />
      <label className="label">
        <span className="label-text-alt text-error">{textError}</span>
      </label>
    </div>
  );
};

export default TextInput;
