export default function Navbar({ backgroundColor, logo }) {
  return (
    <div
      style={{ background: `${backgroundColor}` }}
      className="flex justify-between items-center py-4 px-10 w-full "
    >
      <div className="flex items-center">
        <img src={logo} alt="logo" className="navbar-logo" />
      </div>
    </div>
  );
}
