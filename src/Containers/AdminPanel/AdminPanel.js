import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { UserContext } from '../../context/userContext';
import { Navigate } from "react-router-dom";
import './AdminPanel.css'
import NavbarAdmin from '../../Components/NavbarAdmin/NavbarAdmin';

export default function AdminPanel() {

    const { currentUser } = useContext(UserContext);

    useEffect(() => {
      window.scrollTo({ behavior: 'auto', top: '0px' });
    }, [])

    if (!currentUser) {
      return <Navigate to="/tb-admin" />
    }

    return <div className="admin-panel">
        <NavbarAdmin />
        <div className="content-admin">
          <h1 className='admin-panel-title'>Tableau de bord</h1>
          <Outlet />
        </div>
    </div>
}
