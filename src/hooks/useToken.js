import { useEffect, useState } from "react";

const useToken = (email) => {
  const [token, setToken] = useState("");

  // get jwt token for the user
  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/jwt?email=${email}`)
        .then((res) => res.json())
        .then((result) => {
          // save the token
          localStorage.setItem("accessToken", result.accessToken);

          // set to token state
          setToken(result.accessToken);
        });
    }
  }, [email]);

  return { token };
};

export default useToken;
