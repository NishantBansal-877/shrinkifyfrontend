import { useState, useEffect } from "react";

export function ForgetPasswordPage({ setView, email, setEmail, setMessage }) {
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(null);

  useEffect(() => {
    setPasswordMatch(confirmPassword === signupPassword ? true : confirmPassword === "" ? null : false);
  }, [confirmPassword, signupPassword]);

  async function handleForgetSubmit() {
    if (!email || !signupPassword || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }
    if (signupPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      setView("loading");
      const res = await fetch("http://127.0.0.1:8000/auth/forgetpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: email, password: signupPassword }),
      });

      const data = JSON.parse(await res.text());

      if (data.message === "forget otp sent") {
        setMessage("forgetOtp");
        setView("otpPage");
      } else {
        alert(data.message || "password forgetting failed");
      }
    } catch (err) {
      console.error(err);
      alert("Network error while forgetting in");
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="form-section">
          <h1>Forget your password</h1>
          <p>Submit your Email to get Otp </p>

          <form onSubmit={handleForgetSubmit} action={"POST"}>
            <input name="email" type="email" placeholder="example@gmail.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
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
            <button type="submit">Send Otp</button>
          </form>
        </div>

        <div className="illustration-section">
          <img src="/login.jpg" alt="Login Illustration" />
        </div>
      </div>
    </div>
  );
}
