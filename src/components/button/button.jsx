export default function Button({
  buttonText,
  className,
  onClick,
  icon: Icon,
  iconClassName: iconClassName,
}) {
  return (
    <button className={`p-2 rounded font-mono !cursor-pointer ${className}`} onClick={onClick}>
      {Icon && <Icon className={`${iconClassName} mr-1.5`} />} {buttonText}
    </button>
  );
}
