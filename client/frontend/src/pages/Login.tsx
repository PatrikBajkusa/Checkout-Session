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
    <div>
      {!loggedIn && (
        <form
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
          }}
        >
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
          <input type="text" onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={fetchLogin}>Log in</Button>
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
