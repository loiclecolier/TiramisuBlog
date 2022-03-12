import React, { useState, useEffect } from 'react'
import './ArticlesList.css'
import Search from '../Search/Search';

export default function ArticlesList() {

    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getArticles();
    }, [])

    const getArticles = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await response.json();
            setArticles(data);
        } catch {
            setIsLoading(false);
        }
    }
  
  return (
      <div className="container-articles">
        <Search isLoading={isLoading} data={articles} />
    </div>
  )
}