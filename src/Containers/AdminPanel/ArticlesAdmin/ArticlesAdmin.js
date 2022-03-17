import React, { useContext, useEffect } from 'react'
import './ArticlesAdmin.css'
import CardAdmin from '../../../Components/CardAdmin/CardAdmin';
import { ArticlesContext } from '../../../context/articlesContext';
import { UserContext } from '../../../context/userContext';

export default function ArticlesAdmin() {

    const { articles, isLoading } = useContext(ArticlesContext);
    const { currentUser } = useContext(UserContext);

    return (
      <>
        <h2>Mes articles</h2>
        <div className="container-cards-admin">
                {isLoading ?
                    <div className="loading-icon"></div>
                    :
                    articles.length > 0 ?
                      articles.map(article => {
                          return (
                              <CardAdmin
                                  article={article}
                                  key={article.id}>
                              </CardAdmin>
                          )
                      })
                    :
                    <p>Vous n'avez écrit aucun article.</p>
                }
            </div>
      </>
    )
}
