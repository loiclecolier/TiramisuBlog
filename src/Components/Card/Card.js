import React from 'react'
import './Card.css'
import { Link } from 'react-router-dom'

export default function Card(props) {

  const { srcImage, title } = props.article;

  return (
    <Link
        to={`articles/${title.replace(/\s+/g, '-').trim()}`}
        state={props.article}
    >
      <div className="card">
          {srcImage &&
            <img src={srcImage} alt="" />
          }
          <div className="description-card">
            <h2>{title.length > 40 ? title.substring(0, 40) + '...' : title}</h2>
            <p>
              Lire la recette
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </p>
          </div>
      </div>
    </Link>
  )
}
