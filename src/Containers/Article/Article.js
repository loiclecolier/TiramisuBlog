import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './Article.css'

export default function Article() {

    const location = useLocation();

    const { title, content, srcImage, author, createdAt } = location.state;

    useEffect(() => {
        window.scrollTo({ behavior: 'auto', top: '0px' });
    }, [])

    const getDateArticle = (date) => {
        let newDate = new Date(date);
        newDate = newDate.toLocaleDateString("fr-FR");
        return newDate;
    }

    return (
        <div className="article-content">
            <h1>{title}</h1>
            <p className="meta-infos">Écrit par <span>{author.name}</span><br/><span>{getDateArticle(createdAt)}</span></p>
            <div className="main-image">
                <img className="main-image" src={srcImage} alt="" />
            </div>
            <div className="content" dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
    )
}
