import { CheckCircle2, CircleAlert, CircleX, Info } from "lucide-react";

const variants = {
  success: {
    icon: CheckCircle2,
    className: "border-success/20 bg-success/10 text-success",
  },
  error: {
    icon: CircleX,
    className: "border-danger/20 bg-danger/10 text-danger",
  },
  warning: {
    icon: CircleAlert,
    className: "border-warning/20 bg-warning/10 text-warning",
  },
  info: {
    icon: Info,
    className: "border-info/20 bg-info/10 text-info",
  },
};

const Toast = ({
  type = "info",
  message,
  className = "",
}) => {
  const { icon: Icon, className: variantClass } =
    variants[type] || variants.info;

  return (
    <div
      role="alert"
      className={`
        flex
        items-start
        gap-3
        rounded-lg
        border
        px-4
        py-3
        shadow-sm
        transition-all
        duration-200
        ease-out
        ${variantClass}
        ${className}
      `}
    >
      <Icon
        size={20}
        strokeWidth={1.75}
        className="mt-0.5 shrink-0"
      />

      <p className="text-sm leading-6 font-medium">
        {message}
      </p>
    </div>
  );
};

export default Toast;