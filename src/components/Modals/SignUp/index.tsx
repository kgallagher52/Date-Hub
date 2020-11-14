import React, { FormEvent, useState } from 'react'
import './index.css'
const SignUpModal = ({ toggleModal }: SignUpModalProps) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');

    const submitForm = (e: FormEvent) => {
        e.preventDefault()
        console.log("object");
    }

    return (
        <div className="sign-up-modal">
            <div onClick={() => toggleModal('signup')} className="modal-backdrop" />
            <div className="modal-body">
                <div className="container__child signup__form">
                    <form onSubmit={e => submitForm(e)}>
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
                            <label htmlFor="passwordRepeat">Repeat Password</label>
                            <input className="form-control" onChange={e => setPasswordCheck(e.target.value)} type="password" name="passwordRepeat" id="passwordRepeat" placeholder={passwordCheck} required />
                        </div>
                        <div>
                            <ul className="list-inline">
                                <li>
                                    <input disabled={password === passwordCheck ? false : true} className="btn btn--form" type="submit" value="Sign Up" />
                                </li>
                                <li>
                                    <a className="signup__link" href="#">I am already a member</a>
                                </li>
                            </ul>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default SignUpModal
