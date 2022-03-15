import React, { useState, useEffect } from 'react'
import './ArticlesList.css'
import Search from '../Search/Search';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase-config';


export default function ArticlesList() {

    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const articlesCollectionRef = collection(db, "articles");

    useEffect(() => {
        getArticles();
    }, [])

    const getArticles = async () => {
        try {
            const response = await getDocs(articlesCollectionRef);
            const data = response.docs.map((doc) => ({...doc.data(), id: doc.id}));
            setArticles(data);
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
        }
    }
  
  return (
      <div className="container-articles">
        <Search isLoading={isLoading} data={articles} />
    </div>
  )
}