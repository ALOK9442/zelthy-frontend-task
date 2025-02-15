import { FaGoogle } from "react-icons/fa";
import Button from "../../components/button/button";
import "./landing.css";
import { useNavigate } from "react-router-dom";
import Logo from "../../utils/logo";

const Landing = () => {
  const navigate = useNavigate();
  const Links = [
    "DashBoard",
    "Solutions",
    "Enterprise",
    "Pricing",
    "Resources",
  ];

  const handleSignupWithGoogle = async () => {
    try {
      await signInWithGoogle();
      navigate("/dashboard");
    } catch (err) {
      handleAlert("Something went wrong, Try again!", "error");
    }
  }

  return (
    <div className="relative min-h-[100dvh] bg-transparent flex flex-col items-center font-semibold overflow-hidden">
      <div className="absolute pointer-events-none w-full h-full overflow-hidden">
        <svg
          className="absolute w-[600px] h-[600px] opacity-30 animate-move1"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="rgb(0, 153, 255)"
            d="M49.1,-61.8C63.4,-54.3,75.7,-41,79.3,-26.4C83,-11.8,77.8,4,73.1,21.8C68.4,39.5,64.1,59.1,50.1,66.6C36,74.1,12.3,69.5,-6.6,62.7C-25.6,55.8,-41,46.8,-53.7,33.3C-66.4,19.9,-76.5,2,-72.2,-11.8C-67.9,-25.6,-49.2,-35.3,-34.4,-43.7C-19.7,-52,-9.8,-58.9,3.3,-63.1C16.3,-67.3,32.7,-68.7,49.1,-61.8Z"
            transform="translate(100 100)"
          />
        </svg>
        <svg
          className="absolute w-[500px] h-[500px] opacity-30 animate-move2"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="rgb(255, 153, 0)"
            d="M42.5,-55.1C55.4,-44.9,66.3,-30.9,70.7,-14.7C75.2,1.6,73.1,19.9,63.6,32.5C54.2,45.1,37.4,52,20.7,57.6C4.1,63.1,-12.5,67.3,-28.6,63.4C-44.7,59.5,-60.2,47.5,-68.5,32.2C-76.7,16.9,-77.8,-1.7,-70.5,-16.9C-63.2,-32,-47.5,-43.7,-32.7,-54C-18,-64.2,-9,-73.1,3.1,-76.6C15.1,-80,30.3,-78.1,42.5,-55.1Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
      <header className="w-full flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <Logo />
        <nav className="hidden md:flex space-x-6 text-gray-700">
          {Links.map((link, index) =>
            link === "DashBoard" ? (
              <a
                key={index}
                onClick={() => navigate("/dashboard")}
                className="hover:text-blue-600 cursor-pointer"
              >
                {link}
              </a>
            ) : (
              <a
                key={index}
                href="#"
                className="hover:text-blue-600 cursor-pointer"
              >
                {link}
              </a>
            )
          )}
        </nav>
        <div className="hidden sm:flex items-center sm:space-x-4">
          <Button
            className="text-blue-600 text:xs sm:text-l hover:bg-blue-500 hover:text-white"
            buttonText={`Sign In`}
            onClick={() => navigate("/login")}
          />
          <Button
            className="bg-blue-600 text-white sm:px-4 sm:py-2 rounded-lg"
            buttonText={`Get Started`}
          />
        </div>
      </header>
      <section className="text-center mt-16 px-4 md:px-0 flex flex-col sm:gap-6 items-center">
        <span
          className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-md w-fit cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          DashBoard
        </span>
        <h2 className="text-4xl sm:text-6xl font-bold text-[#133558]">
          Easy scheduling ahead
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mt-2">
          Schedulerly is your scheduling automation platform for eliminating the
          back-and-forth emails to find the perfect time – and so much more.
        </p>
        <div className="mt-6 flex flex-col justify-center">
          <Button
            className="flex items-center justify-center bg-blue-500 text-white shadow-md sm:px-6 sm:py-3 rounded-lg border"
            buttonText={`Sign up with Google`}
            icon={FaGoogle}
            iconClassName="text-red-500"
            onClick={handleGoogleSignup}
          />
          <p className="mt-4 text-sm text-gray-500">OR</p>
          <a
            href=""
            className="text-blue-500 hover:text-white hover:bg-blue-500 hover:rounded-md sm:py-4 sm:px-2 mt-2 block"
            onClick={() => navigate("/signup")}
          >
            Sign up with email
          </a>
        </div>
      </section>
    </div>
  );
};

export default Landing;
