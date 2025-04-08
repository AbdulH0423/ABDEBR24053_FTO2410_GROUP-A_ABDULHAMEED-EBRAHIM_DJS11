export function Button({ variant = "default", className, children, ...props }) {
    const baseStyles = "px-4 py-2 rounded-md font-semibold";
    const variants = {
      default: "bg-blue-500 text-white hover:bg-blue-600",
      ghost: "bg-transparent text-white hover:bg-gray-700",
    };
  
    return (
      <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
        {children}
      </button>
    );
}