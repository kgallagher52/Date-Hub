import React, { useEffect, useState, createRef, useContext } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import GlobalContext from "../../context/GlobalContext";
import "./index.css";

const Navigation = () => {
  const { setActiveModal, user, handleSignOut } = useContext(GlobalContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedLink, setSelectedLink] = useState<string>("/");
  const drawer = createRef<HTMLUListElement>();

  useEffect(() => {
    setSelectedLink(
      window.location.href.slice(window.location.href.lastIndexOf("/"))
    );
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleOffClick = (e: MouseEvent) => {
      const clickedInDrawer =
        e.target === drawer.current ||
        drawer.current!.contains(e.target as Node);
      if (clickedInDrawer) return;

                e.preventDefault();
                setIsOpen(false);
                document.body.addEventListener('click', handleOffClick);
            };
            document.body.addEventListener('click', handleOffClick);
            return () => document.body.removeEventListener('click', handleOffClick);
        },
        [isOpen, drawer]
    );
    return (
        <nav className="navigation">
            <div className="header">
                <a href={user?.email ? '/dashboard' : '/'}>
                    <h1>DATE HUB</h1>
                </a>
                <ul ref={drawer} className={`drawer ${isOpen && 'open'}`}>
                    <li>
                        <MdClose onClick={() => document.body.click()} />
                    </li>
                    {[
                        { title: 'Sign Up / Sign In', href: '', isPrivate: false },
                        { title: 'Dashboard', href: '/dashboard', isPrivate: true },
                        { title: user?.displayName, href: '/profile', isPrivate: true },
                        { title: 'Sign Out', isPrivate: true }
                    ]
                        .filter(f => { if (user?.email) { return f.isPrivate === true } else { return f.isPrivate === false } })
                        .map((l, i) =>
                            <li className={selectedLink === l.href ? "selected" : undefined} key={i}>
                                {
                                    l.title === "Sign Up/Sign In"
                                        ? <span onClick={() => setActiveModal('Authenticate')}>{l.title}</span>
                                        : l.href ? <a href={l.href}>{l.title}</a> : <span onClick={() => handleSignOut()}>{l.title}</span>
                                }
                            </li>
                        )
                    }
                </ul>
            </div>
            <MdMenu onClick={() => setIsOpen(true)} />
        </nav >
    )
}

export default Navigation;
