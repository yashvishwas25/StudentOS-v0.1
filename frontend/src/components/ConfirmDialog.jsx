import Button from "./Button";

const ConfirmDialog = ({
  open,
  title = "Confirm action",
  message = "Are you sure you want to continue?",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
    >
      <div className="w-full max-w-md rounded-lg border border-border bg-surface p-6 shadow-xl">
        <h2
          id="confirm-dialog-title"
          className="font-display text-xl font-semibold text-ink"
        >
          {title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-ink-muted">
          {message}
        </p>

        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelLabel}
          </Button>

          <Button
            type="button"
            variant="dangerGhost"
            onClick={onConfirm}
            loading={loading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;