import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import "./index.css";

const Footer = () => {
  const { setActiveModal, user } = useContext(GlobalContext);
  const [selectedLink, setSelectedLink] = useState<string>("/");

  useEffect(() => {
    setSelectedLink(
      window.location.href.slice(window.location.href.lastIndexOf("/"))
    );
  }, []);
  return (
    <footer data-test="footer">
      <div className="body">
        <h1>Dateerary</h1>
        <ul>
          {[
            { title: "Sign Up", isPrivate: false },
            { title: "Log In", isPrivate: false },
            { title: "Dashboard", href: "/dashboard", isPrivate: true },
            { title: "Profile", href: "/profile", isPrivate: true },
          ]
            .filter((f) => {
              if (user.email) {
                return f.isPrivate === true;
              } else {
                return f.isPrivate === false;
              }
            })
            .map((l, i) => (
              <li
                className={`link ${selectedLink === l.href && "selected"}`}
                key={i}
              >
                {l.href ? (
                  <a href={l.href}>{l.title}</a>
                ) : (
                  <span
                    onClick={() =>
                      setActiveModal(l.title === "Sign Up" ? "signup" : "login")
                    }
                  >
                    {l.title}
                  </span>
                )}
              </li>
            ))}
        </ul>
      </div>
      <hr />
      <div className="copyright">
        &copy; {new Date().getFullYear()} DATE HUB
      </div>
    </footer>
  );
};

export default Footer;
