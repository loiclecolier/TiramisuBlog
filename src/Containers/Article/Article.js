import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './Article.css'

export default function Article() {

    const location = useLocation();

    useEffect(() => {
        window.scrollTo({ behavior: 'auto', top: '0px' });
    }, [])

    return (
        <div className="article-content">
            <h2>{location.state.title}</h2>
            <p>{location.state.body}</p>
        </div>
    )
}
