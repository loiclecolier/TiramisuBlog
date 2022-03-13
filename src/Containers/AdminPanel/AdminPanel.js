import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { UserContext } from '../../context/userContext';
import { Navigate } from "react-router-dom";
import './AdminPanel.css'

export default function AdminPanel() {

    const { currentUser } = useContext(UserContext);

    if (!currentUser) {
      return <Navigate to="/tb-admin" />
    }

    return <>
        <div style={{marginTop: "70px"}}>AdminPanel</div>
        <Outlet />
    </>
}
