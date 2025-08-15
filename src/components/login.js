import { useState } from "react";

export function Login({ setView, setUser, setLogout, setShowNotif, setNotifyMsg }) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  async function parseResponse(res) {
    const ct = res.headers.get("content-type") || "";
    if (ct.includes("application/json")) return res.json();
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      return { message: text };
    }
  }

  async function handleLoginSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("https://shrinkifybackend.vercel.app/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await parseResponse(res);

      if (data.message === "login successful" || data === "login successful") {
        setShowNotif(true);
        setNotifyMsg(data.message);
        setUser(data);
        setView("loading");
        setTimeout(() => setView("home"), 3000);
        setLogout(true);
      } else {
        setShowNotif(true);
        setNotifyMsg(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setShowNotif(true);
      setNotifyMsg("Network error while logging in");
    }
  }

  function forgetPassword(e) {
    e.preventDefault();
    setView("loading");
    setTimeout(() => setView("forget"), 3000);
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="form-section">
          <h1>
            Holla, <br /> Welcome Back
          </h1>
          <p>Hey, welcome back to your special place</p>

          <form onSubmit={handleLoginSubmit}>
            <input
              name="email"
              type="email"
              placeholder="example@gmail.com"
              required
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              autoComplete="email"
            />
            <input
              name="password"
              type="password"
              placeholder="••••••••••••"
              required
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              autoComplete="new-password"
            />

            <div className="form-options">
              <a href="#" onClick={forgetPassword}>
                Forgot Password?
              </a>
            </div>

            <button type="submit">Sign In</button>
          </form>

          <p className="signup-text">
            Don't have an account?
            <a
              onClick={(e) => {
                e.preventDefault();
                setView("signup");
              }}
            >
              Sign Up
            </a>
          </p>
        </div>
        <div className="illustration-section">
          <img src="/login.jpg" alt="Login Illustration" />
        </div>
      </div>
    </div>
  );
}

export default Login;
