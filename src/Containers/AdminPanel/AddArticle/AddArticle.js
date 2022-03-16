import React, { useState, useRef, useContext } from 'react'
import './AddArticle.css'
import { addDoc, collection } from "firebase/firestore"
import { ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../../firebase-config';
import { UserContext } from '../../../context/userContext';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function AddArticle() {

    const navigate = useNavigate();

    const { currentUser } = useContext(UserContext);

    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const [loading, setLoading] = useState(false);

    const [validation, setValidation] = useState("");
    const [validationFile, setValidationFile] = useState("");

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const [dataEditor, setDataEditor] = useState("");

    const inputs = useRef([]);
    const addInputs = (el) => {
        if (el && !inputs.current.includes(el)) {
            inputs.current.push(el);
        }
    };

    const validationImage = (image) => {
        if (image.size >= 1000000) {
            setValidationFile("La taille de l'image ne doit pas dépasser 1 Mo");
            return false;
        }
        else if (image.type !== 'image/png'
                && image.type !== 'image/jpg'
                && image.type !== 'image/jpeg'
                && image.type !== 'image/gif') {
            setValidationFile("Le format de l'image n'est pas autorisé");
            return false;
        }
        else {
            setValidationFile('');
            return true;
        }
    }

    const changePreviewImage = (e) => {
        const image = inputs.current[1].files[0];
        if (image !== null) {
            if (validationImage(image)) {
                setPreviewImage(URL.createObjectURL(image));
                setImage(image);
            }
            else {
                setPreviewImage(null);
                setImage(null);
            }
        }
    }

    // manage editor component state
    const updateTextDescription = (state) => {
        setEditorState(state);
        const data = convertToRaw(state.getCurrentContent());
        setDataEditor(draftToHtml(data));
    };

    const articlesCollectionRef = collection(db, "articles");

    const handleForm = async (e) => {
      e.preventDefault();

      setLoading(true);

      try {
        if (image === null) {
            setValidationFile("Veuillez ajouter une image à l'article.");
            throw new Error();
        }
        // create URL image
        const urlImage = '/images/' + image.name.substring(0, image.name.length - 4) + '-' + uuidv4();
        // create a reference to the image to be uploaded
        const imageRef = ref(storage, urlImage);
        // upload the image
        await uploadBytes(imageRef, image);

        // create pseudo user from email
        const pseudoUser = currentUser.email.split('@')[0];

        // add article in the db
        await addDoc(articlesCollectionRef, { 
            title: inputs.current[0].value,
            content: dataEditor,
            urlImage: urlImage,
            author: { name: pseudoUser, id: currentUser.uid },
            createdAt: Date.now()
        }).then(() => setLoading(false));

        navigate('/');

      } catch (err) {
          setValidation("Une erreur est survenue.");
          setLoading(false);
      }
    }

    return (
        <>
            {loading && 
                <div className='loading-overlay'>
                    <div className="loading-icon"><div></div><div></div><div></div><div></div></div>
                </div>
            }

          <h2>Écrire un article</h2>

          <form onSubmit={handleForm} className="form-add-article">
              <label htmlFor="title">Titre</label>
              <input
                  ref={addInputs}
                  type="text"
                  required
                  id="title"
                  placeholder="Titre de votre article"
                  className="inp-title"
              />

                <label className="button-add-image" htmlFor="image">
                    <div>Ajouter une image</div>
                </label>
                <p className="formats-add-image">
                    Formats autorisés : jpg, jpeg, png, gif<br/>
                    Taille maximale : 1 Mo</p>
                {validationFile && (
                    <p className="form-validation form-validation-file">{validationFile}</p>
                )}
                {previewImage &&
                    <img className="preview-image" src={previewImage} alt="Prévisualisation"/>
                }
                <input
                    ref={addInputs}
                    onChange={changePreviewImage}
                    type="file"
                    id="image"
                    className="inp-image"
                    accept="image/png, image/jpeg, image/gif"
                />

                <label htmlFor="article">Votre article</label>
                <Editor
                    editorState={editorState}
                    wrapperClassName="wrapper-editor-article"
                    editorClassName="editor-article"
                    toolbarClassName="toolbar-editor-article"
                    onEditorStateChange={updateTextDescription}
                    toolbar={{
                        options: ['inline', 'blockType', 'list', 'link', 'emoji', 'image', 'history'],
                        inline: {
                            options: ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript']
                        },
                        blockType: {
                            options: ['Normal', 'H2', 'H3', 'H4', 'H5', 'H6']
                        },
                        list: {
                            options: ['unordered', 'ordered']
                        }
                    }}
                />
                <textarea
                    ref={addInputs}
                    disabled
                    value={dataEditor}
                    id="article"
                    className="inp-content"
                ></textarea>

              {validation && (
                  <p className="form-validation">{validation}</p>
              )}
                <button>Publier l'article</button>
          </form>
      </>
    )
}