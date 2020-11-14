import React, { FormEvent, useContext, useState } from 'react';
import { useHistory } from "react-router";
import GlobalContext from '../../../context/GlobalContext';
import Axios from 'axios';
import '../index.css';
const LoginModal = () => {
    const { setActiveModal, handleUser } = useContext(GlobalContext);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const history = useHistory();


    const loginUser = (e: FormEvent) => {
        e.preventDefault();
        const userPayload = { email: email, password: password }
        Axios.post('/login', JSON.stringify(userPayload)).then((res) => {
            console.log("Profile Created.", res.status);
            handleUser({ email: res.data.email, name: res.data.userName, photo: res.data.photoBinary, dates: res.data.dates });
            setActiveModal('');
            history.push('/dashboard');
        }).catch(err => {
            if (err.response.status === 409) {
                alert('Email already is signed up.')
            }
            console.error({ err })
        })
    }

    return (
        <div className="modal">
            <div onClick={() => setActiveModal('')} className="modal-backdrop" />
            <div className="modal-body">
                <div className="container-child modal-form">
                    <form onSubmit={e => loginUser(e)}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input className="form-control" onChange={e => setEmail(e.target.value)} type="email" name="email" id="email" placeholder={email} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input className="form-control" onChange={e => setPassword(e.target.value)} type="password" name="password" id="password" placeholder={password} required />
                        </div>

                        <div>
                            <ul className="list-inline">
                                <li>
                                    <input className="btn btn-form" type="submit" value="Login" />
                                </li>
                                <li>
                                    <span onClick={() => { setActiveModal('login'); setActiveModal('signup') }} className="modal-link" >Sign Up</span>
                                </li>
                            </ul>
                        </div>
                    </form>

                </div>
            </div>
        </div >
    )
}
export default LoginModal
