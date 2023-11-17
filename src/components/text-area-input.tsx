import { FC } from "react";
import { Control, useController } from "react-hook-form";

interface Props {
  placeholder?: string;
  textError?: string;
  size?: "xs" | "sm" | "md" | "lg";
  label?: string;
  control: Control<any>;
  name: string;
}

const TextAreaInput: FC<Props> = ({
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
      <textarea
        onChange={field.onChange} // send value to hook form
        onBlur={field.onBlur} // notify when input is touched/blur
        value={field.value} // input value
        name={field.name} // send down the input name
        ref={field.ref} // send input ref, so we can focus on input when error appear
        placeholder={placeholder}
        className={`input input-bordered w-full input-${size}`}
      ></textarea>
      <label className="label">
        <span className="label-text-alt text-error">{textError}</span>
      </label>
    </div>
  );
};

export default TextAreaInput;
