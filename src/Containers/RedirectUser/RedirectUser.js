import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext';
import SignIn from '../SignIn/SignIn';
import AdminPanel from '../AdminPanel/AdminPanel';

export default function RedirectUser() {

    const { currentUser } = useContext(UserContext);

    return <>
        {!currentUser ? (
            <SignIn/>
        )
        : (
            <AdminPanel/>
        )}
    </>
}