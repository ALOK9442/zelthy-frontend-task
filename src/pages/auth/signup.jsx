import { FaGoogle } from "react-icons/fa";
import Button from "../../components/button/button";
import Logo from "../../utils/logo";
import InputBox from "../../components/input/input";
import { signInWithGoogle, signUpWithEmail } from "../../firebase/auth";
import { useState } from "react";
import { handleAlert } from "../../utils/handlealert";
import { useNavigate } from "react-router-dom";
import BigLoader from "../../utils/loader";

export default function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const handleSignup = async () => {
    setLoading(true);
    if (!emailRegex.test(email)) {
      handleAlert("Please enter a valid email", "error");
      setLoading(false);
      return;
    }
    if (!email || !password || !username) {
      handleAlert("Please fill all the fields", "error");
      setLoading(false);
      return;
    }
    try {
      await signUpWithEmail(email, password, username);
      handleAlert("Account created successfully", "success");
      navigate("/login");
    } catch (err) {
      console.log(err);
      handleAlert("Something went wrong, Try again!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col p-2 h-screen md:overflow-hidden md:items-center">
      <div className="flex justify-between items-center md:p-4 sm:fixed w-full z-10">
        <Logo />
        <Button
          buttonText={`Login`}
          className="bg-blue-500 text-white p-2 rounded h-fit"
          onClick={() => navigate("/login")}
        />
      </div>

      <div className="flex flex-col h-screen sm:h-fit md:flex-row items-center my-auto justify-center bg-gray-50 sm:p-6">
        <div className="w-2/3 sm:max-w-1/2 text-center md:text-left">
          <h3
            className="text-blue-600 text-sm font-semibold tracking-wider uppercase"
            style={{
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            Try Schedulerly for free
          </h3>
          <h1
            className="text-4xl md:text-5xl font-bold mt-2"
            style={{
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            Create your <span className="text-blue-600">free account</span>
          </h1>
          <p
            className="text-gray-600 mt-4 font-normal sm:block hidden"
            style={{
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            Make scheduling with clients and recruits easier with a free
            Schedulerly account. First-time signups also receive a free, 14-day
            trial of our Teams subscription plan!
          </p>

          <h4 className="font-semibold text-lg mt-6 hidden md:block">
            This Teams trial includes upgrades like:
          </h4>
          <ul className="text-gray-600 mt-2 space-y-2 hidden md:block">
            <li>✅ Ability to book meetings as a team with clients</li>
            <li>✅ Access to premium scheduling features</li>
            <li>✅ Sync with your existing calendar</li>
          </ul>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-2 md:p-8 md:mt-10 md:w-1/3">
          <h3 className="text-xl font-semibold text-gray-800">
            Sign up for your Schedulerly account
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            Always free! No credit card required.
          </p>

          {loading ? (
            <div className="flex justify-center items-center h-56">
              <BigLoader />
            </div>
          ) : (
            <div className="sm:mt-4">
              <InputBox
                type="text"
                placeholder="Enter your email"
                className="mb-4"
                onChange={(e) => setEmail(e.target.value)}
              />

              <InputBox
                type="text"
                placeholder="Enter Username"
                className="mb-4"
                onChange={(e) => setUsername(e.target.value)}
              />
              <InputBox
                type="password"
                placeholder="Enter Password"
                className="mb-4"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                buttonText={`Sign up`}
                className="bg-blue-500 text-white w-full"
                onClick={handleSignup}
              />
            </div>
          )}

          <div className="text-gray-500 text-sm text-center mt-4">OR</div>

          <Button
            buttonText={`Sign up with Google`}
            icon={FaGoogle}
            className="mt-4 flex items-center 
          justify-center bg-white text-gray-700 
          shadow-md sm:px-6 sm:py-3 rounded-lg border 
          w-full hover:text-white 
          hover:bg-blue-500"
            iconClassName="text-red-500"
            onClick={() => signInWithGoogle()}
          />
        </div>
      </div>
    </div>
  );
}
