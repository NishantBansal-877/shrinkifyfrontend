import { NavbarContainer } from "./navBarContainer";

export function Navbar({ setView, user, logout, setLogout }) {
  return (
    <nav className="navbar" id="navbar">
      <NavbarContainer setView={setView} user={user} logout={logout} setLogout={setLogout} />
    </nav>
  );
}
