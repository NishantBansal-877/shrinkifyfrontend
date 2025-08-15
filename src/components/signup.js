import { useState, useEffect } from "react";

export function Signup({ setView, setEmail, setMessage, setShowNotif, setNotifyMsg }) {
  const [fullName, setFullName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(null);
  const [confirmText, setConfirmText] = useState(false);

  useEffect(() => {
    if (signupPassword && confirmPassword) {
      setConfirmText(true);
      setPasswordMatch(confirmPassword === signupPassword ? true : confirmPassword === "" ? null : false);
    } else {
      setConfirmText(false);
    }
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

  async function handleSignupSubmit(e) {
    e.preventDefault();
    if (!fullName || !signupEmail || !signupPassword || !confirmPassword) {
      setShowNotif(true);
      setNotifyMsg("Please fill all fields");
      return;
    }
    if (signupPassword !== confirmPassword) {
      setShowNotif(true);
      setNotifyMsg("Passwords do not match");
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
      setShowNotif(true);
      setNotifyMsg(msg);

      if (msg === "send otp to your email" || msg === "otp sent") {
        setEmail(signupEmail);
        setView("loading");
        setMessage("otpVerify");
        setTimeout(() => setView("otpPage"), 3000);
      }
      if (msg === "already exist") {
        setShowNotif(true);
        setNotifyMsg(msg);
        setView("login");
      }
    } catch (err) {
      console.error(err);
      setShowNotif(true);
      setNotifyMsg("Network error while signing up");
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="form-section">
          <h1>
            Join Us, <br /> Create Your Account
          </h1>
          <p>Let's get you set up</p>

          <form onSubmit={handleSignupSubmit}>
            <input name="fullName" type="text" placeholder="Full Name" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              autoComplete="email"
            />
            <input
              name="password"
              type="password"
              placeholder="Create password"
              required
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              autoComplete="new-password"
            />
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />

            <span id="confirmText" style={{ visibility: `${confirmText ? "visible" : "hidden"}` }}>
              {passwordMatch === null ? "" : passwordMatch ? "equal to password 👍" : "not equal to password ❌"}
            </span>
            <button type="submit">Sign Up</button>
          </form>

          <p className="signup-text">
            Already have an account?{" "}
            <a
              onClick={(e) => {
                e.preventDefault();
                setView("login");
              }}
            >
              Sign In
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

export default Signup;
