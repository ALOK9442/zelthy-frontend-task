import { useState } from "react";
import { signInWithEmail, signInWithGoogle } from "../../firebase/auth";
import { FaGoogle } from "react-icons/fa";
import Button from "../../components/button/button";
import Logo from "../../utils/logo";
import InputBox from "../../components/input/input";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Login = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    await signInWithEmail(email, password);
  };

  return (
    <div className="flex flex-col p-2 h-screen md:overflow-hidden md:items-center">
      <div className="flex justify-between items-center md:p-4 sm:fixed w-full z-10">
        <Logo />
        <Button
          buttonText={`Sign Up`}
          className="bg-blue-500 text-white p-2 rounded h-fit"
          onClick={() => navigate("/signup")}
        />
      </div>

      <div className="flex flex-col h-screen sm:h-fit md:flex-row items-center my-auto justify-center bg-gray-50 sm:p-6">
        <div className="w-2/3 sm:max-w-1/2 text-center md:text-left hidden md:block">
          <h3 className="text-blue-600 text-sm font-semibold tracking-wider uppercase">
            Select a Date
          </h3>
          <Calendar
            onChange={setDate}
            value={date}
            className="border border-gray-300 rounded-lg shadow-lg p-4 w-full mt-4"
          />
          <p className="text-gray-700 mt-2 text-sm">
            Selected Date: <b>{date.toDateString()}</b>
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-2 md:p-8 md:mt-10">
          <h3 className="text-xl font-semibold text-gray-800">
            Login to Your Account
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            Welcome back! Please login to continue.
          </p>

          <form onSubmit={handleLogin} className="sm:mt-4">
            <InputBox
              type="email"
              placeholder="Enter your email"
              className="mb-4"
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputBox
              type="password"
              placeholder="Enter Password"
              className="mb-4"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              buttonText={`Login`}
              className="bg-blue-500 text-white w-full"
              type="submit"
            />
          </form>

          <div className="text-gray-500 text-sm text-center mt-4">OR</div>

          <Button
            buttonText={`Sign in with Google`}
            icon={FaGoogle}
            className="mt-4 flex items-center justify-center 
            bg-white text-gray-700 shadow-md 
            px-6 py-3 rounded-lg border w-full 
            hover:text-white hover:bg-red-500"
            iconClassName="text-red-500"
            onClick={() => signInWithGoogle()}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
