import PropTypes from "prop-types";

const Button = ({
  title,
  btnStyle = "",
  titleStyle = "",
  onClick,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full bg-indigo-600 px-10 py-2 rounded-md ${
        disabled && "opacity-60"
      } ${btnStyle}`}
    >
      <span className={`text-slate-100 text-lg font-medium ${titleStyle}`}>
        {title}
      </span>
    </button>
  );
};
Button.propTypes = {
  title: PropTypes.string.isRequired,
  btnStyle: PropTypes.string,
  titleStyle: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default Button;
