import PropTypes from "prop-types";

const Avatar = ({ name, size = "md", className = "" }) => {
  // Get first letter of the name, handle empty or invalid input
  const getInitial = (name) => {
    if (!name || typeof name !== "string") return "?";
    return name.trim().charAt(0).toUpperCase();
  };

  // Size classes mapping
  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
    xl: "w-16 h-16 text-xl",
  };

  // Generate background color based on name
  const getBackgroundColor = (name) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-red-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
    ];

    const index =
      name.split("").reduce((acc, char) => {
        return acc + char.charCodeAt(0);
      }, 0) % colors.length;

    return colors[index];
  };

  return (
    <div
      className={`
        ${sizeClasses[size] || sizeClasses.md}
        ${name && getBackgroundColor(name)}
        rounded-full
        flex
        items-center
        justify-center
        text-white
        font-semibold
        ${className}
      `}
    >
      {getInitial(name)}
    </div>
  );
};

Avatar.propTypes = {
  name: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  className: PropTypes.string,
};

export default Avatar;
