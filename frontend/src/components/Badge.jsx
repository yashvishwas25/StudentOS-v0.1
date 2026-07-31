const statusStyles = {
  pending: "bg-accent-soft text-accent",
  "in-progress": "bg-primary/10 text-primary",
  completed: "bg-success/10 text-success",
};

const Badge = ({ status }) => {
  const style = statusStyles[status] || "bg-border text-ink-muted";

  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${style}`}>
      {status}
    </span>
  );
};

export default Badge;
