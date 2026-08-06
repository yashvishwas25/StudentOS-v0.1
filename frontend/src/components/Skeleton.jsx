const Skeleton = ({
  className = "",
  rounded = "rounded-md",
}) => {
  return (
    <div
      className={`
        animate-pulse
        bg-border
        ${rounded}
        ${className}
      `}
    />
  );
};

export default Skeleton;