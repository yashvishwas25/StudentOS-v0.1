const variants = {
  default:
    "bg-paper text-ink border border-border",

  primary:
    "bg-primary/10 text-primary border border-primary/20",

  success:
    "bg-success/10 text-success border border-success/20",

  warning:
    "bg-warning/10 text-warning border border-warning/20",

  danger:
    "bg-danger/10 text-danger border border-danger/20",

  info:
    "bg-info/10 text-info border border-info/20",

  accent:
    "bg-accent-soft text-accent border border-accent/20",
};

const Badge = ({
  children,
  variant = "default",
  className = "",
  ...props
}) => {
  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-md
        border
        px-2.5
        py-1
        text-xs
        font-medium
        whitespace-nowrap
        transition-colors
        duration-150
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;