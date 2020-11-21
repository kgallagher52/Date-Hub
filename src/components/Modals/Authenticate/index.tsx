import React, { useContext } from 'react';
import GlobalContext from '../../../context/GlobalContext';
import '../index.css';
import Auth from '../../../firebase/auth';
const Authenticate = () => {
    const { setActiveModal } = useContext(GlobalContext);
    return (
        <div className="modal">
            <div onClick={() => setActiveModal('')} className="modal-backdrop" />
            <div className="modal-body">
                <div className="container-child modal-form">
                    <Auth />
                </div>
            </div>
        </div >
    )
}
export default Authenticate
