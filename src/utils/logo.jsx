import { useNavigate } from "react-router-dom";
import TextAvatar from "./avatar";

export default function Logo() {
  const navigate = useNavigate();
  return (
    <h1 className="sm:text-2xl font-bold text-blue-600 flex gap-1 items-center" onClick={() => navigate("/")}>
      <TextAvatar name={"S"} /> Schedulerly
    </h1>
  );
}
