import { useEffect, useRef } from "react";

export function OtpPage({ email = "", setView, message }) {
  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  const formRef = useRef(null);

  useEffect(() => {
    otpRefs[0].current?.focus();
  }, []);

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 1);
    e.target.value = val;
    if (val && idx < otpRefs.length - 1) otpRefs[idx + 1].current?.focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      if (e.target.value === "") {
        if (idx > 0) otpRefs[idx - 1].current?.focus();
      } else {
        // clear current value on backspace
        e.target.value = "";
      }
    } else if (e.key === "ArrowLeft") {
      if (idx > 0) otpRefs[idx - 1].current?.focus();
    } else if (e.key === "ArrowRight") {
      if (idx < otpRefs.length - 1) otpRefs[idx + 1].current?.focus();
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(formRef.current);
    let otp = "";
    for (const pair of fd.entries()) {
      if (!pair[1]) {
        alert("Missing OTP number");
        return;
      }
      otp += pair[1];
    }

    try {
      const res = await fetch("https://shrinkifybackend.vercel.app/auth/otpverification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, otp, message: message }),
      });

      const ct = res.headers.get("content-type") || "";
      let data;
      if (ct.includes("application/json")) data = await res.json();
      else {
        const text = await res.text();
        try {
          data = JSON.parse(text);
        } catch {
          data = { message: text };
        }
      }

      const msg = data.message || data;

      if (msg === "login successful" || msg === "signup successful" || msg === "new password created") {
        setView("loading");
        setTimeout(() => setView("auth"), 3000);
      }
    } catch (err) {
      console.error(err);
      alert("Network error verifying OTP");
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="form-section">
          <h2>OTP Verification</h2>
          <p>
            Enter OTP Code sent to <strong>{email}</strong>
          </p>

          <form className="form" ref={formRef} onSubmit={handleSubmit}>
            <div className="otp-inputs" style={{ display: "flex", gap: 8 }}>
              {otpRefs.map((r, i) => (
                <input
                  key={i}
                  ref={r}
                  name={String(i + 1)}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={1}
                  onChange={(e) => handleChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  style={{ width: 40, textAlign: "center" }}
                />
              ))}
            </div>

            <p className="resend-text">
              Didn't receive OTP code? <a href="#">Resend Code</a>
            </p>

            <button type="submit" className="btn-primary">
              Verify & Proceed
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OtpPage;
