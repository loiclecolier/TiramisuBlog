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
            <p>Lire la recette	&#129122;</p>
          </div>
      </div>
    </Link>
  )
}
