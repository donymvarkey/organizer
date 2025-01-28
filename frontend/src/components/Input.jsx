import {
  EyeClosedIcon,
  EyeIcon,
  Link2Icon,
  LockIcon,
  MailIcon,
  SearchIcon,
  Text,
} from "lucide-react";
import { useState } from "react";
import PropTypes from "prop-types";

const Input = ({
  label = "",
  id,
  type = "text",
  placeholder,
  defaultValue,
  onChange,
  labelStyle,
  inputStyle,
  error,
  onBlur,
  disabled = false,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const renderInputLeftIcon = (type) => {
    switch (type) {
      case "email":
        return <MailIcon className="text-zinc-500 w-5 h-5" />;
      case "password":
        return <LockIcon className="text-zinc-500 w-5 h-5" />;
      case "text":
        return <Text className="text-zinc-500 w-5 h-5" />;
      case "url":
        return <Link2Icon className="text-zinc-500 w-5 h-5" />;
      default:
        return <SearchIcon className="text-zinc-500 w-5 h-5" />;
    }
  };
  return (
    <div className={`flex flex-col space-y-2 `}>
      <label className={`text-gray-600 ${labelStyle}`} htmlFor={id}>
        {label}
      </label>
      <div
        className={`flex items-center justify-start border rounded-md px-3 py-2 ${
          disabled && "bg-gray-100"
        } ${error ? "border-red-600" : "border"} `}
      >
        {renderInputLeftIcon(type)}
        <input
          className={`flex-1 focus:outline-none mx-2 ${inputStyle}`}
          disabled={disabled}
          defaultValue={defaultValue}
          onChange={(e) => onChange(e)}
          type={
            type === "password"
              ? isPasswordVisible
                ? "text"
                : "password"
              : type
          }
          placeholder={placeholder}
          id={id}
          onBlur={onBlur}
        />
        {type === "password" && (
          <button onClick={() => setIsPasswordVisible((prev) => !prev)}>
            {isPasswordVisible ? (
              <EyeClosedIcon className="text-zinc-500 w-5 h-5" />
            ) : (
              <EyeIcon className="text-zinc-500 w-5 h-5" />
            )}
          </button>
        )}
      </div>
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  );
};
Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  labelStyle: PropTypes.string,
  inputStyle: PropTypes.string,
  error: PropTypes.string,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Input;
