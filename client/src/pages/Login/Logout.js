import axios from "axios";
import React, { useEffect } from "react";
import useHistory from "react-router-dom";

const Logout = () => {
  const history = useHistory();

  const logoutData = async () => {
    try {
      const data = await axios.get("/logout");
      history.push(data, { replace: true });
    } catch (error) {
        console.log("error");
    }
  };

  useEffect(() => {
    logoutData();
  }, []);

  return <div>Logout</div>;
};

export default Logout;
