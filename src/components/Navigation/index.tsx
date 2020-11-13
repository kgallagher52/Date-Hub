import React, { useEffect, useState, createRef } from 'react';
import { MdClose, MdMenu } from 'react-icons/md';
import './index.css';

const Navigation = ({ profile }: NavBarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLink, setSelectedLink] = useState("/");
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
                        { title: profile?.name, href: '/Profile', isPrivate: true }
                    ]
                        .filter(f => f.isPrivate === !!profile)
                        .map((l, i) =>
                            <li className={selectedLink === l.href ? "selected" : undefined} key={i}>
                                <a href={l.href}>{l.isPrivate && l.href === "/Profile" && <span>{profile?.name.match(/\b(\w)/g)?.join('')} </span>}{l.title}</a>
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
