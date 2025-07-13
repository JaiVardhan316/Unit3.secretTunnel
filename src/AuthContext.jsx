import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");

  // TODO: signup
  async function signup() {
  try {
    const response = await fetch(API + "/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "jai",
        password: "password",
      }),
    });
    const result = await response.json();
    console.log(result, "\n");

    setToken(result.token)
    setLocation("TABLET")
    // return result.token;
  } catch (e) {
    console.error("something went wrong");
  }
}

  // TODO: authenticate
  async function authenticate() {
  if (!token) throw Error("no token in state");
  try {
    const response = await fetch(API + "/authenticate", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    console.log(result);

    setLocation("TUNNEL");
  } catch (e) {
    console.error(e);
  }
}

  const value = { location, authenticate, signup };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
