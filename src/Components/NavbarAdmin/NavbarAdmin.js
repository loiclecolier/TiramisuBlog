import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavbarAdmin.css'

export default function NavbarAdmin() {
    return (
        <nav className="navbar-admin">
            <ul className="navbar-admin-menu">
                <li className="navbar-admin-item">
                    <NavLink to="/tb-admin/home" className={({isActive}) => {
                        return isActive ? "active-link" : ""
                    }}>
                        Accueil
                    </NavLink>
                </li>
                <li className="navbar-admin-item">
                    <NavLink to="/tb-admin/ecrire" className={({isActive}) => {
                        return isActive ? "active-link" : ""
                    }}>
                        Écrire un article
                    </NavLink>
                </li>
                <li className="navbar-admin-item">
                    <NavLink to="/tb-admin/articles" className={({isActive}) => {
                        return isActive ? "active-link" : ""
                    }}>
                        Mes articles
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
