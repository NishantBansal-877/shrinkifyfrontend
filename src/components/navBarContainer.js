export function NavbarContainer({ setView, user, logout, setLogout, setShowNotif, setNotifyMsg, setSelectedImages }) {
  return (
    <div className="navbar-container">
      <span
        className="logo"
        onClick={() => {
          setSelectedImages([]);
          setView("home");
        }}
      >
        ⚡ SHRINKIFY
      </span>
      {logout && (
        <span className="welcomeText">
          👋 Welcome back, <strong>{user.fullName}</strong>!
        </span>
      )}
      <div className="nav-links">
        <a
          href="#hero"
          onClick={() => {
            setSelectedImages([]);
            setView("home");
          }}
        >
          Home
        </a>
        {/* <a href="#hero" onClick={() => setView("pricing")}>
          Pricing
        </a> */}
        {logout && <a href="#contact">Contacts</a>}
        {!logout ? (
          <a href="#hero" onClick={() => setView("login")}>
            Login/SignUp
          </a>
        ) : (
          <a
            href="#hero"
            onClick={async () => {
              const result = await fetch("https://shrinkifybackend.vercel.app/logout", {
                method: "GET",
                credentials: "include",
              });
              const data = await result.text();
              setSelectedImages([]);
              setShowNotif(true);
              setNotifyMsg(data);
              setLogout(false);
              setView("loading");
              setTimeout(() => setView("login"), 2000);
            }}
          >
            Logout
          </a>
        )}
      </div>
    </div>
  );
}
