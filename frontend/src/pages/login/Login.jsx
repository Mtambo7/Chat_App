import { useState } from "react";
import { Link } from "react-router-dom";

import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({username, password});
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300 ">
          Login <span className="text-blue-900">chatApp</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <label className="label p-2">
            <span className="text-base label-text">Username</span>
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your username"
            className="w-full input input-bordered h-10"
          />
          <label className="label">
            <span className="text-base label-text">Password</span>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full input input-bordered h-10"
          />
          <Link
            to="/signup"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            {"  Don't "}have an account?
          </Link>
          <div>
            <button className="btn btn-block btn-sm mt-2 btn-info text-white" disabled={loading}>
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
