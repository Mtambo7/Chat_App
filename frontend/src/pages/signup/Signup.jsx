import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, signup } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(input);
  };

  const handleGenderCheckbox = (gender) => {
    setInput({ ...input, gender });
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300 ">
          Sign Up <span className="text-blue-900">chatApp</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your Full Name"
              value={input.fullname}
              onChange={(e) => setInput({ ...input, fullname: e.target.value })}
              className="w-full input input-bordered h-10"
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              value={input.username}
              onChange={(e) => setInput({ ...input, username: e.target.value })}
              placeholder="Enter your User Name"
              className="w-full input input-bordered h-10"
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              value={input.confirmPassword}
              onChange={(e) =>
                setInput({ ...input, confirmPassword: e.target.value })
              }
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
            />
          </div>

          <GenderCheckbox
            onCheckBoxChange={handleGenderCheckbox}
            selectedGender={input.gender}
          />

          <Link
            to="/login"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            Already have an account?
          </Link>
          <div>
            <button
              className={`btn btn-block btn-sm mt-2 btn-info  text-white`}
              disabled={loading}
            >
              {loading ? (
                <span
                  className={` ${
                    loading ? "loading loading-spinner loading-sm " : ""
                  }`}
                ></span>
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

export default Signup;
