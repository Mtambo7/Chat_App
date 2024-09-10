/* eslint-disable no-undef */
import { useState } from "react";
import { userSignupSchema } from "../validation/validationSchema";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";


const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  // Accept input values as parameters
  const signup = async ({
    fullname,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    // Validate the input fields using the schema
    const { value, error } = userSignupSchema.validate({
      fullname,
      username,
      password,
      confirmPassword,
      gender,
    });

    // eslint-disable-next-line react-hooks/rules-of-hooks, no-unused-vars
   

    // If validation fails, show the error message using toast
    if (error) {
      return toast.error(error.message); // Convert error to string to display message properly
    }

    setLoading(true);
    try {
      // Send a POST request to your API to signup the user
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: value.fullname,
          username: value.username,
          password: value.password,
          confirmPassword: value.confirmPassword,
          gender: value.gender,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Signup failed, please try again.");
      }

      localStorage.setItem("auth-user", JSON.stringify(data));
      setAuthUser(data);

      // Optionally, you can show a success toast if the signup is successful
      toast.success("Signup successful!");
    } catch (err) {
      // Show an error toast if the signup fails
      toast.error(err.message);
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  return { loading, signup };
};

export default useSignup;
