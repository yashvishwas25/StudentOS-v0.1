const variants = {
  primary:
    "bg-primary text-white hover:bg-primary-hover focus-visible:bg-primary-hover",

  outline:
    "border border-border bg-surface text-ink hover:bg-paper",

  danger:
    "bg-danger text-white hover:opacity-90",

  dangerGhost:
    "text-danger hover:bg-danger/10",

  ghost:
    "text-ink-muted hover:bg-paper hover:text-ink",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
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
      className={`
        inline-flex items-center justify-center gap-2
        rounded-md
        font-medium
        whitespace-nowrap
        transition-all duration-150 ease-out
        shadow-sm
        hover:shadow-md
        active:scale-[0.98]
        disabled:pointer-events-none
        disabled:opacity-40
        ${sizes[size]}
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
};

export default Button;