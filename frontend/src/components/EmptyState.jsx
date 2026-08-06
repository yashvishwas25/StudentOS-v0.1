import Button from "./Button";

const EmptyState = ({
  title,
  description,
  actionLabel,
  onAction,
  icon,
  className = "",
}) => {
  return (
    <section
      className={`
        flex
        flex-col
        items-center
        justify-center
        rounded-lg
        border
        border-dashed
        border-border
        bg-surface
        px-8
        py-14
        text-center
        shadow-sm
        ${className}
      `}
    >
      {icon && (
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-paper text-ink-muted">
          {icon}
        </div>
      )}

      <h2 className="font-display text-xl font-semibold text-ink">
        {title}
      </h2>

      {description && (
        <p className="mt-3 max-w-md text-sm leading-6 text-ink-muted">
          {description}
        </p>
      )}

      {actionLabel && onAction && (
        <div className="mt-6">
          <Button onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </section>
  );
};

export default EmptyState;