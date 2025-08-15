import { Navbar } from "./components/navbar";
import { Hero } from "./components/hero";
import { Features } from "./components/features";
import { Footer } from "./components/footer";
import { useState, useEffect } from "react";
import { Contacts } from "./components/contacts";
import { refreshAccess } from "./utils/refreshAccess";
export default function App() {
  const [view, setView] = useState("home");
  const [logout, setLogout] = useState(false);
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    (async function () {
      try {
        const result = await refreshAccess();
console.log(result);
        if (result.message === "Invalid refresh token") {
          setView("home");
          return;
        }
        
        setUser(result);
        setUser(result);
        setLogout(true);
      } catch (err) {
        console.error("Error in refreshAccess:", err);
      }
    })();
  }, []);

  setInterval(async () => {
    try {
      const result = await refreshAccess();

      if (result.message === "Invalid refresh token") {
        setView("home");
        return;
      }

      setUser(result);
      setLogout(true);
    } catch (err) {
      console.error("Error in refreshAccess:", err);
    }
  }, 9 * 60 * 1000);
  return (
    <>
      <Navbar setView={setView} user={user} logout={logout} setLogout={setLogout} />
      <Hero view={view} setView={setView} setLogout={setLogout} setUser={setUser} email={email} setEmail={setEmail} />
      <Features />
      {logout && <Contacts user={user} />}
      <Footer />
    </>
  );
}
