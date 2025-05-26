import PropTypes from "prop-types";

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default function Button({
  type = "button",
  onClick,
  disabled = false,
  className = "",
  children,
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`transition-all focus:outline-none ${className} ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
      {...props}
    >
      {children}
    </button>
  );
}

