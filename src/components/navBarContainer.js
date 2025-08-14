export function NavbarContainer({ setView, user, logout, setLogout }) {
  return (
    <div className="navbar-container">
      <span className="logo">⚡ SHRINKER</span>
      {logout && (
        <span className="welcomeText">
          👋 Welcome back, <strong>{user.fullName}</strong>!
        </span>
      )}
      <div className="nav-links">
        <a href="#hero" onClick={() => setView("home")}>
          Home
        </a>
        <a href="#hero" onClick={() => setView("pricing")}>
          Pricing
        </a>
        <a href="#contact">Contacts</a>
        {!logout ? (
          <a href="#hero" onClick={() => setView("auth")}>
            Login/SignUp
          </a>
        ) : (
          <a
            href="#hero"
            onClick={async () => {
              const result = await fetch("http://127.0.0.1:8000/logout", {
                method: "GET",
                credentials: "include",
              });

              // const data = await result.text();
              // alert(data);
              setLogout(false);
              setView("loading");
              setTimeout(() => setView("auth"), 2000);
            }}
          >
            Logout
          </a>
        )}
      </div>
    </div>
  );
}
