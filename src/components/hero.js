// Hero.jsx
import { useState } from "react";
import { ImageUploadSection } from "./imageUploadSection";
import { Alert } from "./alert";
import { ShowSelectedImages } from "./selectedImages";
import Pricing from "./pricing";
import OtpPage from "./otpPage";
import { Preview } from "./preview";
import LoadingOverlay from "./loadingOverlay";
import { ForgetPasswordPage } from "./forgetPasswordPage";
import Login from "./login";
import Signup from "./signup";

export function Hero({ view, setView, setUser, setLogout, email, setEmail, setShowNotif, setNotifyMsg, selectedImages, setSelectedImages }) {
  const [quality, setQuality] = useState(10);
  const [previewImages, setPreviewImages] = useState({});
  const [message, setMessage] = useState(null);
  const heroViews = {
    alert: <Alert setView={setView} />,
    // auth: (
    //   <LoginAndSignup
    //     setView={setView}
    //     setLogout={setLogout}
    //     setUser={setUser}
    //     setEmail={setEmail}
    //     setMessage={setMessage}
    //     setShowNotif={setShowNotif}
    //     setNotifyMsg={setNotifyMsg}
    //   />
    // ),
    forget: (
      <ForgetPasswordPage
        setView={setView}
        email={email}
        setEmail={setEmail}
        setMessage={setMessage}
        setShowNotif={setShowNotif}
        setNotifyMsg={setNotifyMsg}
      />
    ),
    home: <ImageUploadSection setView={setView} setSelectedImages={setSelectedImages} setNotifyMsg={setNotifyMsg} setShowNotif={setShowNotif}/>,
    loading: <LoadingOverlay />,
    login: <Login setLogout={setLogout} setNotifyMsg={setNotifyMsg} setShowNotif={setShowNotif} setUser={setUser} setView={setView} />,
    otpPage: <OtpPage email={email} setView={setView} message={message} setShowNotif={setShowNotif} setNotifyMsg={setNotifyMsg} />,
    pricing: <Pricing />,
    preview: <Preview previewImages={previewImages} />,
    signup: <Signup setEmail={setEmail} setMessage={setMessage} setNotifyMsg={setNotifyMsg} setShowNotif={setShowNotif} setView={setView} />,
    selectedImages: (
      <ShowSelectedImages
        quality={quality}
        setQuality={setQuality}
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        setView={setView}
        setLogout={setLogout}
        setPreviewImages={setPreviewImages}
        setShowNotif={setShowNotif}
        setNotifyMsg={setNotifyMsg}
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
