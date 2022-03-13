import React from 'react'
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase-config';
import './LogOut.css'

export default function LogOut() {

    const navigate = useNavigate();

    const logOut = async () => {
        try {
            await signOut(auth);
            navigate("/tb-admin");
        } catch (err) {
            alert("Nous ne pouvons pas déconnecter. Vérifiez votre connexion internet et réessayez.");
        }
    }

    return (
        <button onClick={logOut} className='logout'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
        </button>
    )
}
