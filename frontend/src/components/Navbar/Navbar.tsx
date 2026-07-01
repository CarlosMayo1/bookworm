const Navbar = () => {
  return (
    <nav className="flex justify-between items-center pt-4">
      <div>
        <a className="font-bold text-lg" href="#">{`Bookworm{API}`}</a>
      </div>
      <div>
        <ul className="flex">
          <li className="p-4">Guide</li>
          <li className="p-4">About</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
