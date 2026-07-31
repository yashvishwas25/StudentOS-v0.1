const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="font-display text-2xl font-semibold text-primary">
            StudentOS
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            Your persistent academic workspace
          </p>
        </div>
        <div className="rounded-lg border border-border bg-surface p-6 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
