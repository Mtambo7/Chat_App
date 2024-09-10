import { useState } from "react";
import toast from "react-hot-toast";

import { userLoginSchema } from "../validation/validationSchema";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  // eslint-disable-next-line no-unused-vars
  const login = async ({username, password}) => {
    setLoading(true);
      try {
        
          const {value, error} = userLoginSchema.validate({username,password})
          if (error) {
            return toast.error(error.message); // Convert error to string to display message properly
          }

          
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({username: value.username, password:value.password}),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Login failed, please try again.");
      }

      localStorage.setItem("auth-user", JSON.stringify(data));
      setAuthUser(data);

      toast.success("Login successfully");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;
