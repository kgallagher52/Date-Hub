import React from 'react'
import "./index.css";

const Footer = () => {
    return (
        <footer data-test="footer">
            <div className="body">
                <h1>DATE HUB</h1>
                <ul>
                    {[
                        { title: 'Sign Up', href: '', isPrivate: false },
                        { title: 'Log In', href: '', isPrivate: false },
                    ].map((l, i) =>
                        <li className="link" key={i}>
                            <a href={l.href}>{l.title}</a>
                        </li>
                    )
                    }
                </ul>

            </div>
            <hr />
            <div className="copyright">
                &copy; {new Date().getFullYear()} DATE HUB
            </div>
        </footer>
    )
}

export default Footer
