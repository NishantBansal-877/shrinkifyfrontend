import { Navbar } from "./components/navbar";
import { Hero } from "./components/hero";
import { Features } from "./components/features";
import { Footer } from "./components/footer";
import { useState, useEffect } from "react";
import { Contacts } from "./components/contacts";
import { refreshAccess } from "./utils/refreshAccess";
import NotificationBox from "./components/notification";
export default function App() {
  const [view, setView] = useState("home");
  const [logout, setLogout] = useState(false);
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const [notifyMsg, setNotifyMsg] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const result = await refreshAccess();

        if (result.message === "Invalid refresh token") {
          setView("home");
          return;
        }
        setTimeout(() => setShowNotif(true), 1000);
        setNotifyMsg(`Hello Mr. ${result.fullName}!!!`);
        setUser(result);
        setLogout(true);
      } catch (err) {
        console.error("Error in refreshAccess:", err);
      }
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const result = await refreshAccess();

        if (result.message === "Invalid refresh token") {
          clearInterval(interval);
          return;
        }
        console.log(result);
        setUser(result);
        setLogout(true);
      } catch (err) {
        console.error("Error in refreshAccess:", err);
      }
    }, 9 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar
        setView={setView}
        user={user}
        logout={logout}
        setLogout={setLogout}
        setShowNotif={setShowNotif}
        setNotifyMsg={setNotifyMsg}
        setSelectedImages={setSelectedImages}
      />
      <Hero
        view={view}
        setView={setView}
        setLogout={setLogout}
        setUser={setUser}
        email={email}
        setEmail={setEmail}
        setShowNotif={setShowNotif}
        setNotifyMsg={setNotifyMsg}
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
      />
      <Features />
      {logout && <Contacts user={user} setShowNotif={setShowNotif} setNotifyMsg={setNotifyMsg} />}
      <Footer />
      {showNotif && <NotificationBox message={notifyMsg} duration={5000} onClose={() => setShowNotif(false)} />}
    </>
  );
}
