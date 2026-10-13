import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      alert(`Welcome back ${data.user.name}`);
    } catch (error) {
      alert(error.message || "Unable to log in");
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      console.log("Google Response:");
      console.log(credentialResponse);

      const credential = credentialResponse.credential;

      console.log("Google Credential:");
      console.log(credential);

   
      const response = await fetch(
        "http://localhost:4000/api/auth/google",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            credential: credential,
          }),
        }
      );

      

      const data = await response.json();

      console.log("Backend Response:");
      console.log(data);

      if (!response.ok) {
        throw new Error(data.message);
      }


      localStorage.setItem("token", data.token);


      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      alert(`Welcome ${data.user.name}`);

    } catch (error) {

      console.log("Login Error:", error);

      alert(error.message);

    }
  };


  const handleGoogleError = () => {
  console.log("Google Login Failed");
  alert("Google Login Failed. Check the browser console.");
};


  return (

    <div className="container">

      <div className="login-card">

        <nav className="auth-nav" aria-label="Authentication">
          <Link to="/login">Log in</Link>
          <Link to="/signup">Sign up</Link>
        </nav>

        <h1>Welcome Back 👋</h1>

        <p>Log in with your email or Google account</p>

        <form className="auth-form" onSubmit={handleLogin}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Log in</button>
        </form>

        <div className="auth-divider">or</div>

        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={handleGoogleError}
        />

      </div>

    </div>

  );
}

export default App;