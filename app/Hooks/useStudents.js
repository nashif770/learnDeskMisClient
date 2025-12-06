import { useState, useEffect } from "react";
import axios from "axios";

const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch students data
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/studentinformation.json"); // students.json should be in public folder
      setStudents(response.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch students data", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  console.log("using student", students)

  return { students, loading, error, refetch: fetchStudents };
};

export default useStudents;
