import React, { FormEvent, useContext, useState } from 'react';
import { useHistory } from "react-router";
import GlobalContext from '../../../context/GlobalContext';
import Axios from 'axios';
import '../index.css';

const SignUpModal = () => {
    const { setActiveModal, setUser } = useContext(GlobalContext);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordCheck, setPasswordCheck] = useState<string>('');
    const history = useHistory();


    const submitUser = (e: FormEvent) => {
        e.preventDefault();
        const userPayload = { email: email, name: name, password: password, photo: "" }
        Axios.post('/signup', JSON.stringify(userPayload)).then((res) => {
            console.log("Profile Created.", res.status);
            console.log({ res });
            setUser({});
            history.push('/dashboard')
        }).catch(err => {
            if (err.response.status === 409) {
                alert('Email already is signed up.')
            }
            console.error({ err })
        })
        history.push("/dashboard");
        setActiveModal('signup');
    }

    return (
        <div className="modal">
            <div onClick={() => setActiveModal('')} className="modal-backdrop" />
            <div className="modal-body">
                <div className="container-child modal-form">
                    <form onSubmit={e => submitUser(e)}>
                        <div className="form-group">
                            <label htmlFor="username">Name</label>
                            <input className="form-control" onChange={e => setName(e.target.value)} type="text" name="name" id="name" placeholder={name} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input className="form-control" onChange={e => setEmail(e.target.value)} type="email" name="email" id="email" placeholder={email} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input className="form-control" onChange={e => setPassword(e.target.value)} type="password" name="password" id="password" placeholder={password} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="passwordRepeat">Repeat Password </label>
                            <input className="form-control" onChange={e => setPasswordCheck(e.target.value)} type="password" name="passwordRepeat" id="passwordRepeat" placeholder={passwordCheck} required />
                            <span className={`password-match ${(password !== passwordCheck && password.length === passwordCheck.length) ? 'show' : 'hide'}`}>Passwords do not match!</span>

                        </div>
                        <div>
                            <ul className="list-inline">
                                <li>
                                    <input disabled={password === passwordCheck ? false : true} className="btn btn-form" type="submit" value="Sign Up" />
                                </li>
                                <li>
                                    <span onClick={() => setActiveModal('login')} className="modal-link" >I am already a member</span>
                                </li>
                            </ul>
                        </div>
                    </form>

                </div>
            </div>
        </div >
    )
}
export default SignUpModal
