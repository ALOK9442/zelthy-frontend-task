export default function InputBox({
  type,
  placeholder,
  value,
  onChange,
  className,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
}
