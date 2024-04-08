import axios from "axios";
import { FormEvent, useState } from "react";
import { Button } from "react-bootstrap";

export const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedOut, setLoggedOut] = useState(true);

  const fetchLogin = async () => {
    const response = await axios.post("http://localhost:3000/api/auth/login", {
      email: userName,
      password: password,
    });
    if (response.status === 400) {
      console.log(response);
    } else {
      setLoggedIn(true);
      setLoggedOut(false);
      console.log(response.data);
    }
  };
  const fetchLogout = async () => {
    const response = await axios.post("http://localhost:3000/api/auth/logout");
    setLoggedIn(false);
    setLoggedOut(true);
    console.log(response.data);
  };

  return (
    <div className="d-flex  justify-content-center align-items-center">
      {!loggedIn && (
        <form
          action=""
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
          }}
        >
          <div className="mb-3">
            <label htmlFor="email" className="d-block">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="d-block">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-success" onClick={fetchLogin}>
            Log in
          </button>
        </form>
      )}

      {!loggedOut && (
        <div>
          <Button onClick={fetchLogout}>Log Out</Button>
        </div>
      )}
    </div>
  );
};
