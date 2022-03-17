import React, { useContext, useState } from 'react'
import './CardAdmin.css'
import { Link } from 'react-router-dom'
import { ArticlesContext } from '../../context/articlesContext';

export default function CardAdmin(props) {
    
  const { id, title, urlImage } = props.article;

  const { deleteArticle } = useContext(ArticlesContext);

  const [toggleModal, setToggleModal] = useState(false);

  const toggleModalDelete = () => {
    setToggleModal(!toggleModal);
  }

  return (<>
      {toggleModal && <>
        <div className="modal-delete">
          <div className="close-modal" onClick={toggleModalDelete}> &#10006;</div>
          <h2>Supprimer l'article</h2>
          <p>Êtes-vous sûr de vouloir supprimer l'article : {title} ?</p>
          <div className="btn-modal">
            <button className="cancel-btn" onClick={toggleModalDelete}>Annuler</button>
            <button className="delete-btn" onClick={() => deleteArticle(id, urlImage)}>Supprimer</button>
          </div>
        </div>
        <div className="overlay-modal"></div>
      </>}
      <div className="card-admin">
          <div className="description-card-admin">
            <Link
                to={`../../articles/${title.replace(/\s+/g, '-').trim()}`}
                state={props.article}
            >
                {title.length > 100 ? title.substring(0, 100) + '...' : title}
            </Link>
            <div className='actions-articles-icons'>
                <Link
                    to={`../edit-article/${title.replace(/\s+/g, '-').trim()}`}
                    state={props.article}
                >
                  <svg
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                </Link>
                <svg onClick={toggleModalDelete}
                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </div>
          </div>
      </div>
      </>
  )
}
