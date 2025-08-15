import { useState, useEffect } from "react";

export function ForgetPasswordPage({ setView, email, setEmail, setMessage, setShowNotif, setNotifyMsg }) {
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
  }, [confirmPassword, signupPassword]);

  async function handleForgetSubmit() {
    if (!email || !signupPassword || !confirmPassword) {
      setShowNotif(true);
      setNotifyMsg("Please fill all fields");
      // alert("Please fill all fields");
      return;
    }
    if (signupPassword !== confirmPassword) {
      setShowNotif(true);
      setNotifyMsg("Passwords do not match");
      // alert("Passwords do not match");
      return;
    }
    try {
      setView("loading");
      const res = await fetch("https://shrinkifybackend.vercel.app/auth/forgetpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: email, password: signupPassword }),
      });

      const data = JSON.parse(await res.text());

      if (data.message === "forget otp sent") {
        setShowNotif(true);
        setNotifyMsg("forget otp sent");
        setMessage("forgetOtp");
        setView("otpPage");
      } else {
        setShowNotif(true);
        setNotifyMsg(data.message || "password forgetting failed");
        // alert(data.message || "password forgetting failed");
      }
    } catch (err) {
      console.error(err);
      setShowNotif(true);
      setNotifyMsg("Network error while forgetting in");
      // alert("Network error while forgetting in");
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="form-section">
          <h1>Forget your password</h1>
          <p>Submit your Email to get Otp </p>

          <form onSubmit={handleForgetSubmit}>
            <input
              name="email"
              type="email"
              placeholder="example@gmail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
