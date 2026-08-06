import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = ({
  label,
  error,
  id,
  type = "text",
  className = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-ink"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={id}
          type={inputType}
          className={`
            w-full
            rounded-md
            border
            border-border
            bg-surface
            px-3
            py-2
            text-sm
            text-ink
            placeholder:text-ink-muted/60
            shadow-sm
            transition-all
            duration-150
            ease-out
            hover:border-primary/40
            focus:border-primary
            focus:ring-2
            focus:ring-primary/15
            focus:outline-none
            disabled:bg-paper
            disabled:text-ink-muted
            ${isPassword ? "pr-10" : ""}
            ${error ? "border-danger focus:border-danger focus:ring-danger/15" : ""}
            ${className}
          `}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((prev) => !prev)}
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-ink-muted
              transition-colors
              duration-150
              hover:text-ink
            "
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff size={16} strokeWidth={1.75} />
            ) : (
              <Eye size={16} strokeWidth={1.75} />
            )}
          </button>
        )}
      </div>

      {error && (
        <p
          id={`${id}-error`}
          className="text-xs text-danger"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;