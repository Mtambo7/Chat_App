import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversation = async () => {
      setLoading(true);

      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        }

        setConversations(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    getConversation();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
