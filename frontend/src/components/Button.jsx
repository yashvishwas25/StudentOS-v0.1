const variants = {
  primary: "bg-primary text-white hover:bg-primary-hover",
  outline: "border border-border text-ink hover:bg-surface",
  danger: "bg-danger text-white hover:opacity-90",
  ghost: "text-ink-muted hover:text-ink",
};

const Button = ({
  children,
  variant = "primary",
  type = "button",
  disabled = false,
  loading = false,
  onClick,
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
};

export default Button;
