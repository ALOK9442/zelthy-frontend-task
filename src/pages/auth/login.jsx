import { useState } from "react";
import { signInWithEmail, signInWithGoogle } from "../../firebase/auth";
import { FaGoogle } from "react-icons/fa";
import Button from "../../components/button/button";
import Logo from "../../utils/logo";
import InputBox from "../../components/input/input";
import { useNavigate } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import AnimatedChat from "../../components/animatedchat/animatedchat";
import { handleAlert } from "../../utils/handlealert";
import BigLoader from "../../utils/loader";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (!email || !password) {
      handleAlert("Please fill all the fields", "error");
      setLoader(false);
      return;
    }
    try {
      await signInWithEmail(email, password);
    } catch (err) {
      handleAlert("Invalid email or password", "error");
    } finally {
      setLoader(false);
    }
  };
  const handleGoogleLogin = async () => {
    // e.preventDefault();
    // setLoader(true);
    try {
      await signInWithGoogle();
      navigate("/dashboard");
    } catch (err) {
      handleAlert("Something went wrong, Try again!", "error");
    } finally {
      setLoader(false);
    }
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
        <div className="w-2/3 sm:max-w-1/2 text-center md:text-left hidden md:flex flex-col items-center">
          <p
            className="text-gray-500 text-center text-xl w-full"
            style={{
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            Tired of endless time zone confusion? Use Schedulery to easily
            schedule and book a convenient time effortless and hassle-free!
          </p>
          <AnimatedChat />
        </div>

        <div className="bg-white shadow-lg rounded-lg p-2 md:p-8 md:mt-10">
          <h3 className="text-xl font-semibold text-gray-800">
            Login to Your Account
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            Welcome back! Please login to continue.
          </p>
          {loader ? (
            <div className="flex justify-center items-center h-56">
              <BigLoader />
            </div>
          ) : (
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
          )}

          <div className="text-gray-500 text-sm text-center mt-4">OR</div>

          <Button
            buttonText={`Sign in with Google`}
            icon={FaGoogle}
            className="mt-4 flex items-center justify-center 
            bg-white text-gray-700 shadow-md 
            px-6 py-3 rounded-lg border w-full 
            hover:text-white hover:bg-red-500"
            iconClassName="text-red-500"
            onClick={handleGoogleLogin}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
