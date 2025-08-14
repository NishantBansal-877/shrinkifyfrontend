import { useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

export function Contacts({ user }) {
  const formRef = useRef(null);

  useEffect(() => {
    emailjs.init("F9GwNe9L_m682cUsb");

    const form = formRef.current;
    if (!form) return;

    const handleSubmit = (e) => {
      e.preventDefault();

      emailjs
        .sendForm("service_sut8b1c", "template_bhu489u", form)
        .then(() => {
          alert("Email sent!");
          form.reset();
        })
        .catch((error) => {
          console.error("Failed to send email:", error);
          alert("Failed to send email.");
        });
    };

    form.addEventListener("submit", handleSubmit);

    return () => {
      form.removeEventListener("submit", handleSubmit);
    };
  }, []);

  return (
    <div className="contact-section" id="contact">
      <div className="contact-info">
        <h4>Contact Us</h4>
        <h1>Let’s Get In Touch</h1>
        <p>Have questions, feedback, or just want to say hello? We’d love to hear from you.</p>
        <p className="manual-contact">
          Or reach out directly at
          <br />
          <a href="mailto:nishant87706@gmail.com">nishant87706@gmail.com</a>
        </p>
      </div>

      <div className="contact-form">
        <form ref={formRef} id="contact-form">
          <div className="form-group">
            <input type="text" defaultValue={user.fullName} name="name" required readOnly />
            <input type="email" defaultValue={user.email} name="email" required readOnly />
          </div>
          <textarea name="message" rows="5" placeholder="Your message..." maxLength="300" required></textarea>
          <button type="submit">Send Message →</button>
        </form>
      </div>
    </div>
  );
}
