import { useEffect } from "react";
import axiosInstance from "../utilities/axiosInstance";

const useFindUser = (setLoading, user, setUser) => {

  useEffect(() => {
    axiosInstance
    .get("user")
    .then((response) => {
      if (response.data.success) {
        setUser(response.data.user);
        setLoading(false)
      }
    })
    .catch((error) => {
      setLoading(false)
    });
  }, [])

};

export default useFindUser;
