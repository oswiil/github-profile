export const Navbar = () => {
  return (
    <nav
      className="navbar is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="#home">
          OscarSG
        </a>

        <div
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </div>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item" href="#studies">
            Background
          </a>

          <a className="navbar-item" href="#projects">
            Projects
          </a>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="navbar-item has-dropdown is-hoverable">
              <div className="navbar-link">More</div>

              <div className="navbar-dropdown">
                <a className="navbar-item" href="#studies">
                  About
                </a>
                <a className="navbar-item" href="#studies">
                  Jobs
                </a>
                <a className="navbar-item" href="#studies">
                  Contact
                </a>
                <hr className="navbar-divider" />
                <a className="navbar-item" href="#studies">
                  Report an issue
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
