import React, { useEffect, useState, createRef, useContext } from 'react';
import { MdClose, MdMenu } from 'react-icons/md';
import GlobalContext from '../../context/GlobalContext';
import './index.css';

const Navigation = () => {
    const { setActiveModal, user } = useContext(GlobalContext);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedLink, setSelectedLink] = useState<string>("/");
    const drawer = createRef<HTMLUListElement>();

    useEffect(() => {
        setSelectedLink(window.location.href.slice(window.location.href.lastIndexOf("/")))
    }, [])

    useEffect(
        () => {
            if (!isOpen) return;
            const handleOffClick = (e: MouseEvent) => {
                const clickedInDrawer = e.target === drawer.current || drawer.current!.contains(e.target as Node);
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
                <a href="/">
                    <h1>DATE HUB</h1>
                </a>
                <ul ref={drawer} className={`drawer ${isOpen && 'open'}`}>
                    <li>
                        <MdClose onClick={() => document.body.click()} />
                    </li>
                    {[
                        { title: 'Sign Up', href: '', isPrivate: false },
                        { title: 'Log In', href: '', isPrivate: false },
                        { title: user.email, href: '/Profile', isPrivate: true }
                    ]
                        .filter(f => f.title)
                        .map((l, i) =>
                            <li className={selectedLink === l.href ? "selected" : undefined} key={i}>
                                {
                                    l.title === "Sign Up" || l.title === "Log In"
                                        ? <span onClick={() => l.title === "Sign Up" ? setActiveModal('signup') : setActiveModal('login')}>{l.title}</span>
                                        : <a href={l.href}>{l.isPrivate && l.href === "/Profile" && <span>{user?.email} </span>}{l.title}</a>
                                }
                            </li>
                        )
                    }
                </ul>
            </div>
            <MdMenu onClick={() => setIsOpen(true)} />
        </nav>
    )
}

export default Navigation
