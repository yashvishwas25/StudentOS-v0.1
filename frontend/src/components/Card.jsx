const Card = ({
  children,
  className = "",
  hover = false,
  padding = true,
  as: Component = "div",
  ...props
}) => {
  return (
    <Component
      className={`
        rounded-lg
        border
        border-border
        bg-surface
        shadow-sm
        transition-all
        duration-200
        ease-out

        ${padding ? "p-6" : ""}

        ${
          hover
            ? "hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md"
            : ""
        }

        ${className}
      `}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card;