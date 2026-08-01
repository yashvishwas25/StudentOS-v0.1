const typeStyles = {
  success: "bg-primary text-white",
  error: "bg-danger text-white",
};

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          onClick={() => removeToast(toast.id)}
          className={`cursor-pointer rounded-md px-4 py-3 text-sm font-medium shadow-lg ${
            typeStyles[toast.type] || typeStyles.success
          }`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;