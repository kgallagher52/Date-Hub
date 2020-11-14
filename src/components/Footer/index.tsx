import React, { useContext } from 'react'
import GlobalContext from '../../context/GlobalContext'
import "./index.css";

const Footer = () => {
    const { setActiveModal } = useContext(GlobalContext);
    return (
        <footer data-test="footer">
            <div className="body">
                <h1>DATE HUB</h1>
                <ul>
                    {[
                        { title: 'Sign Up' },
                        { title: 'Log In' },
                    ].map((l, i) =>
                        <li className="link" key={i}>
                            <span onClick={() => setActiveModal(l.title === "Sign Up" ? 'signup' : 'login')}>{l.title}</span>
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
