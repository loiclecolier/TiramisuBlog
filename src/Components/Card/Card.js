import React, { useEffect, useState } from 'react'
import './Card.css'
import { Link } from 'react-router-dom'
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase-config';

export default function Card(props) {

  const { title, content, urlImage, author, createdAt } = props.article;
  const [srcImage, setSrcImage] = useState('');

  useEffect(() => {
      let isMounted = true;

      // Create a reference to the file we want to download
      const imageRef = ref(storage, urlImage);

      // Get the download URL
      getDownloadURL(imageRef)
        .then((url) => {
          if (isMounted) { // call only if component is mounted
            setSrcImage(url);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      // When the component is unmounted
      return () => { isMounted = false }

  }, [urlImage])

  return (
    <Link
        to={`articles/${title.replace(/\s+/g, '-').trim()}`}
        state={{ title, content, srcImage, author, createdAt }}
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
