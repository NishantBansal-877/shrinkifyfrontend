import { NavbarContainer } from "./navBarContainer";

export function Navbar({ setView, user, logout, setLogout, setShowNotif, setNotifyMsg, setSelectedImages }) {
  return (
    <nav className="navbar" id="navbar" style={{ zIndex: "5", position: "sticky", width: "100%", top: "0" }}>
      <NavbarContainer
        setView={setView}
        user={user}
        logout={logout}
        setLogout={setLogout}
        setShowNotif={setShowNotif}
        setNotifyMsg={setNotifyMsg}
        setSelectedImages={setSelectedImages}
      />
    </nav>
  );
}
