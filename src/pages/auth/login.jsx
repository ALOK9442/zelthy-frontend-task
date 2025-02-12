import { signInWithEmail, signInWithGoogle } from "../../firebase/auth";


const Login = () => {
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    await signInWithEmail(email, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input name="email" type="email" placeholder="Email" className="mb-2 p-2 border rounded w-full" />
        <input name="password" type="password" placeholder="Password" className="mb-2 p-2 border rounded w-full" />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
      </form>

      <button onClick={signInWithGoogle} className="mt-4 bg-red-500 text-white p-2 rounded">
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
