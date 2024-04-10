import { Button, Container } from "react-bootstrap";
import { ProductsList } from "../components/ProductsList";

import { FormEvent, useEffect, useState } from "react";
import axios from "axios";

export const HomePage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState("");

  useEffect(() => {
    const authorize = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/auth/authorize",
        { withCredentials: true }
      );

      if (response.status === 200) {
        setLoggedIn(response.data);
        console.log("hello");
      } else {
        console.log(response.status);
        setLoggedIn("");
      }
    };
    authorize();
  }, []);
  const fetchLogin = async () => {
    const response = await axios.post(
      "http://localhost:3000/api/auth/login",
      {
        email: userName,
        password: password,
      },
      {
        withCredentials: true,
      }
    );
    if (response.status === 400) {
      console.log(response);
    } else {
      setLoggedIn(response.data);

      console.log(response.data);
    }
  };
  const fetchLogout = async () => {
    const response = await axios.post("http://localhost:3000/api/auth/logout", {
      withCredentials: true,
    });
    setLoggedIn("");

    console.log(response.data);
  };

  return (
    <Container>
      <div className="d-flex  justify-content-center align-items-center">
        {!loggedIn && (
          <form
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

        {loggedIn && (
          <div>
            <Button onClick={fetchLogout}>Log Out</Button>
          </div>
        )}
      </div>
      <ProductsList />
    </Container>
  );
};
