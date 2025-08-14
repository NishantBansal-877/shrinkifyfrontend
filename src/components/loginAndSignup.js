// LoginAndSignup.jsx
import { useState, useEffect } from "react";

export function LoginAndSignup({ setView, setUser, setLogout, setEmail, setMessage }) {
  const [isSignup, setIsSignup] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [fullName, setFullName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(null);

  useEffect(() => {
    setPasswordMatch(confirmPassword === signupPassword ? true : confirmPassword === "" ? null : false);
  }, [confirmPassword, signupPassword]);

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

      if (data.message === "login successful" || data === "login successful" || data.message === "login successful") {
        setUser(() => data);
        setView("loading");
        setTimeout(() => setView("home"), 3000);
        setLogout(true);
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Network error while logging in");
    }
  }

  async function handleSignupSubmit(e) {
    e.preventDefault();
    if (!fullName || !signupEmail || !signupPassword || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }
    if (signupPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("https://shrinkifybackend.vercel.app/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ fullName, email: signupEmail, password: signupPassword }),
      });

      const data = await parseResponse(res);

      const msg = data.message || data;
      alert(msg);
      if (msg === "send otp to your email" || msg === "otp sent") {
        setEmail(signupEmail);
        setView("loading");
        setMessage("otpVerify");
        setTimeout(() => setView("otpPage"), 3000);
      }
      if (msg === "already exist") {
        setIsSignup(false);
      }
    } catch (err) {
      console.error(err);
      alert("Network error while signing up");
    }
  }

  async function forgetPassword(e) {
    e.preventDefault();
    setView("loading");
    setTimeout(() => setView("forget"), 3000);
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="form-section">
          {!isSignup ? (
            <>
              <h1>
                Holla, <br /> Welcome Back
              </h1>
              <p>Hey, welcome back to your special place</p>

              <form onSubmit={handleLoginSubmit} action={"POST"}>
                <input
                  name="email"
                  type="email"
                  placeholder="example@gmail.com"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
                <input
                  name="password"
                  type="password"
                  placeholder="••••••••••••"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />

                <div className="form-options">
                  <a href="#" onClick={forgetPassword}>
                    Forgot Password?
                  </a>
                </div>

                <button type="submit">Sign In</button>
              </form>

              <p className="signup-text">
                Don't have an account?{" "}
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    setIsSignup(true);
                  }}
                >
                  Sign Up
                </a>
              </p>
            </>
          ) : (
            <>
              <h1>
                Join Us, <br /> Create Your Account
              </h1>
              <p>Let's get you set up</p>

              <form onSubmit={handleSignupSubmit} action={"POST"}>
                <input name="fullName" type="text" placeholder="Full Name" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Create password"
                  required
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                />
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span id="confirmText">{passwordMatch === null ? "" : passwordMatch ? "equal to password 👍" : "not equal to password ❌"}</span>

                <button type="submit">Sign Up</button>
              </form>

              <p className="signup-text">
                Already have an account?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsSignup(false);
                    setPasswordMatch(null);
                  }}
                >
                  Sign In
                </a>
              </p>
            </>
          )}
        </div>

        <div className="illustration-section">
          <img src="/login.jpg" alt="Login Illustration" />
        </div>
      </div>
    </div>
  );
}

export default LoginAndSignup;
