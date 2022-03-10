import React from 'react'
import './Card.css'
import { Link } from 'react-router-dom'
import Placeholder from './placeholder.jpg'

export default function Card(props) {

  const { title, body } = props;

  return (
    <Link
        to={`articles/${title.replace(/\s+/g, '-').trim()}`}
        state={{
          title: title,
          body: body
        }}
    >
      <div className="card">
          <img src={Placeholder} alt="" />
          <div className="description-card">
            <h2>{title.length > 40 ? title.substring(0, 40) + '...' : title}</h2>
            <p>Lire l'article	&#129122;</p>
          </div>
      </div>
    </Link>
  )
}
