import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_BASE = "https://learndeskmisserver.onrender.com";

const useUserData = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(`${API_BASE}/userData`);
      setUserData(res.data);
    } catch (err) {
      console.error("Failed to fetch user data", err);
      setError(err.response?.data?.message || "Failed to load user data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return {
    userData,
    loading,
    error,
    refetch: fetchUserData,
  };
};

export default useUserData;
