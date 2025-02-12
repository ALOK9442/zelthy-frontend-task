import TextAvatar from "./avatar";

export default function Logo() {
  return (
    <h1 className="sm:text-2xl font-bold text-blue-600 flex gap-1 items-center">
      <TextAvatar name={"S"} /> Schedulerly
    </h1>
  );
}
