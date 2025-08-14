// Hero.jsx
import { useState } from "react";
import { ImageUploadSection } from "./imageUploadSection";
import { Alert } from "./alert";
import { ShowSelectedImages } from "./selectedImages";
import { LoginAndSignup } from "./loginAndSignup";
import Pricing from "./pricing";
import OtpPage from "./otpPage";
import { Preview } from "./preview";
import LoadingOverlay from "./loadingOverlay";
import { ForgetPasswordPage } from "./forgetPasswordPage";

export function Hero({ view, setView, setUser, setLogout, email, setEmail }) {
  const [quality, setQuality] = useState(10);
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewImages, setPreviewImages] = useState({});
  const [message, setMessage] = useState(null);
  const heroViews = {
    alert: <Alert setView={setView} />,
    auth: <LoginAndSignup setView={setView} setLogout={setLogout} setUser={setUser} setEmail={setEmail} setMessage={setMessage} />,
    forget: <ForgetPasswordPage setView={setView} email={email} setEmail={setEmail} setMessage={setMessage} />,
    home: <ImageUploadSection setView={setView} setSelectedImages={setSelectedImages} />,
    loading: <LoadingOverlay />,
    otpPage: <OtpPage email={email} setView={setView} message={message} />,
    pricing: <Pricing />,
    preview: <Preview previewImages={previewImages} />,
    selectedImages: (
      <ShowSelectedImages
        quality={quality}
        setQuality={setQuality}
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        setView={setView}
        setLogout={setLogout}
        setPreviewImages={setPreviewImages}
      />
    ),
  };

  return (
    <header className="hero" id="hero">
      {heroViews[view]}
    </header>
  );
}
export default Hero;
