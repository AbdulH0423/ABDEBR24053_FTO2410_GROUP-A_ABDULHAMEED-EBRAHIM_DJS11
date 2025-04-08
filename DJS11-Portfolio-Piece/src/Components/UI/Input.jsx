export function Input({ type, placeholder, className, ...props }) {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className={`bg-gray-800 text-white border-none rounded-lg px-4 py-2 w-full sm:w-1/2 md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      />
    );
  }