import { useState, useEffect } from "react";
import axios from "axios";

const useUserData = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch UserData data
  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/userData.json"); // UserData.json should be in public folder
      setUserData(response.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch UserData data", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // console.log("using student", userData)

  return { userData, loading, error, refetch: fetchUserData };
};

export default useUserData;
