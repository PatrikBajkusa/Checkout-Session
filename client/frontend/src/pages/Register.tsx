import axios from "axios";
import { useState } from "react";


export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [customerCreated, setCustomerCreated] = useState(false);

  const registerCustomer = async () => {
    let user = {
      name,
      email,
      password,
    };
    const response = await axios.post(
      "http://localhost:3000/api/auth/register",
      user
    );
    console.log(response);
    if (response.status === 201) {
      setCustomerCreated(true);
    } else {
      console.log("Something went wrong on serverside");
    }
  };

  const backToHomePage: () => void = () => {
    window.location.href = "/";
  };
  return (
    <div className="d-flex justify-content-center align-items-center ">
      {!customerCreated && (
        <form onSubmit={(e) => e.preventDefault()}>
          <div style={{ paddingBottom: "10px" }}>
            <label className="d-block">Namn</label>
            <input
              type="name"
              placeholder="Förnamn + Efternamn"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div style={{ paddingBottom: "10px" }}>
            <label className="d-block">Email</label>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div style={{ paddingBottom: "10px" }}>
            <label className="d-block">Lösenord</label>
            <input
              type="password"
              placeholder="Lösenord"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <button className="btn btn-success" onClick={registerCustomer}>
            Registrera
          </button>
        </form>
      )}
      {customerCreated && (
        <div style={{ marginTop: "50px", textAlign: "center" }}>
          <h3>Du är nu registrerad!</h3>
          <button className="btn btn-primary" onClick={backToHomePage}>
            Till Start
          </button>
        </div>
      )}
    </div>
  );
};
