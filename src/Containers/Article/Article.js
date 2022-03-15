import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './Article.css'

export default function Article() {

    const location = useLocation();

    const { title, content, srcImage } = location.state;

    useEffect(() => {
        window.scrollTo({ behavior: 'auto', top: '0px' });
    }, [])

    return (
        <div className="article-content">
            <h2>{title}</h2>
            <img src={srcImage} alt="" />
            {/* Use dangerouslySetInnerHTML for markdown content */}
            <p dangerouslySetInnerHTML={{ __html: content }}></p>
        </div>
    )
}
