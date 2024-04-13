import axios from "axios";
import { useEffect, useState } from "react";

export const ConfirmedPayment = () => {
  const [verified, setVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!verified) {
      const verifySession = async () => {
        let sessionId;
        const dataFromLs = localStorage.getItem("sessionId");

        if (dataFromLs) {
          sessionId = JSON.parse(dataFromLs);
        }
        const response = await axios.post(
          "http://localhost:3000/api/stripe/verify-session",
          {
            sessionId,
          }
        );
        if (response.status === 200) {
          setVerified(response.data.verified);
          setIsLoading(false);
          localStorage.clear();
        }
      };
      verifySession();
    }
  }, [verified]);

  const toStart: () => void = () => {
    window.location.href = "/";
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ marginTop: "100px" }}>
        <h3>Din betalning har gått igenom!</h3>
      </div>
      <button className="btn btn-success" onClick={toStart}>
        Till start
      </button>
    </div>
  );
};
