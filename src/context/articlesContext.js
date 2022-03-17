import React, { createContext, useState, useEffect } from 'react'
import { getDocs, collection, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebase-config';
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from 'react-router-dom';

export const ArticlesContext = createContext();

const ArticlesContextProvider = props => {

    const navigate = useNavigate();

    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const articlesCollectionRef = collection(db, "articles");

    useEffect(() => {
        getArticles();
    }, [])

    /**
     * Get articles and related images from Firebase
     */
    const getArticles = async () => {
        
        try {
            // Loading beginned
            setIsLoading(true);

            // Get data from data base
            const response = await getDocs(articlesCollectionRef);
            const data = response.docs.map((doc) => ({...doc.data(), id: doc.id}));

            // Get image from storage and add in data
            for (const el of data) {
                // Create a reference to the file we want to download
                const imageRef = ref(storage, el.urlImage);

                // Get the download URL
                await getDownloadURL(imageRef)
                .then((url) => {
                    // Add property 'srcImage' in data
                    el.srcImage = url;
                })
                .catch((err) => {
                    setIsLoading(false);
                });
            }

            // Change state with new value
            setArticles(data);

            // Loading finished
            setIsLoading(false);

        } catch (err) {
            setIsLoading(false);
        }
    }

    /**
     * Delete article and related image
     */
    const deleteArticle = async (articleID, articleUrlImage) => {
        try {
            // Delete document (database)
            await deleteDoc(doc(db, "articles", articleID));

            // Delete image (storage)
            const imageRef = ref(storage, articleUrlImage);
            await deleteObject(imageRef).catch((err) => console.log(err));

            // Change state of articles
            const newArticles = articles.filter(article => {
                return article.id !== articleID
            })
            setArticles(newArticles);

        } catch (err) {
            console.log(err);
        }

    }

    return (
        <ArticlesContext.Provider 
            value={{
                articles,
                isLoading,
                getArticles,
                deleteArticle
            }}>
            {props.children}
        </ArticlesContext.Provider>
    )

}

export default ArticlesContextProvider;