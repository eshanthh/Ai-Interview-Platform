import { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const contentType = response.headers.get("content-type") || "";
      const data = contentType.includes("application/json")
        ? await response.json()
        : { message: `Signup API returned an unexpected response (${response.status})` };

      if (!response.ok) {
        throw new Error(data.message);
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      alert(`Welcome ${data.user.name}`);
    } catch (error) {
      alert(error.message || "Unable to create account");
    }
  };

  return (
    <div className="container">
      <div className="login-card">
        <nav className="auth-nav" aria-label="Authentication">
          <Link to="/login">Log in</Link>
          <Link to="/signup">Sign up</Link>
        </nav>

        <h1>Create an account</h1>
        <p>Sign up with your email and password</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
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
            minLength="8"
            required
          />
          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
