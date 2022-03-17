import React, { useState, useRef, useContext, useEffect } from 'react'
import './EditArticle.css'
import { doc, updateDoc } from "firebase/firestore"
import { ref, uploadBytes, deleteObject } from 'firebase/storage';
import { db, storage } from '../../../firebase-config';
import { useNavigate, useLocation } from 'react-router-dom';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { v4 as uuidv4 } from "uuid";
import { ArticlesContext } from '../../../context/articlesContext';

export default function EditArticle() {

    const location = useLocation();
    
    const navigate = useNavigate();

    const { getArticles } = useContext(ArticlesContext);

    const { id, title, content, urlImage, srcImage } = location.state;

    const [image, setImage] = useState(urlImage);
    const [previewImage, setPreviewImage] = useState(srcImage);

    const [loading, setLoading] = useState(false);

    const [validation, setValidation] = useState("");
    const [validationFile, setValidationFile] = useState("");

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const [dataEditor, setDataEditor] = useState(content);

    // Get values
    useEffect(() => {
        inputs.current[0].value = title;

        // parse HTML to draft
        const contentBlock = htmlToDraft(content);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            setEditorState(editorState);
        }
    }, [])

    // Select inputs
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

    const changePreviewImage = () => {
        const newImage = inputs.current[1].files[0];
        if (newImage !== null) {
            if (validationImage(newImage)) {
                setPreviewImage(URL.createObjectURL(newImage));
                setImage(newImage);
            }
        }
    }

    // manage editor component state
    const updateTextDescription = (state) => {
        setEditorState(state);
        const data = convertToRaw(state.getCurrentContent());
        setDataEditor(draftToHtml(data));
    };

    // Update
    const handleForm = async (e) => {
      e.preventDefault();

      setLoading(true);

      try {
        // delete old image
        const oldImageRef = ref(storage, urlImage);
        await deleteObject(oldImageRef).catch((err) => console.log(err));
        // create URL new image
        const urlNewImage = '/images/' + image.name.substring(0, image.name.length - 4) + '-' + uuidv4();
        // create a reference to the image to be uploaded
        const newImageRef = ref(storage, urlNewImage);
        // upload the image
        await uploadBytes(newImageRef, image);

        // update article in the db
        const articleRef = doc(db, "articles", id)
        await updateDoc(articleRef, { 
            title: inputs.current[0].value,
            content: dataEditor,
            urlImage: urlNewImage
        }).then(() => setLoading(false));

        // Refresh list articles
        getArticles();

        navigate('/tb-admin/articles');

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

          <h2>Modifier un article</h2>

          <form onSubmit={handleForm} className="form-edit-article">
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
                    <div>Modifier l'image</div>
                </label>
                <p className="formats-add-image">
                    Formats autorisés : jpg, jpeg, png, gif<br/>
                    Taille maximale : 1 Mo</p>
                {validationFile &&
                    <p className="form-validation form-validation-file">{validationFile}</p>
                }
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
                <button>Modifier l'article</button>
          </form>
      </>
    )
}