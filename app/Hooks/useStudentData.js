import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_BASE = "studentData.json";

const useStudentData = () => {
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchstudentData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(`http://localhost:5000/studentData`);
      setStudentData(res.data);
    } catch (err) {
      console.error("Failed to fetch student data", err);
      setError(err.response?.data?.message || "Failed to load student data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchstudentData();
  }, [fetchstudentData]);

  return {
    studentData,
    loading,
    error,
    refetch: fetchstudentData,
  };
};

export default useStudentData;
