import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import "./Form.css";

export default function Form() {

    /* Pour utiliser la méthode dispatch */
    const dispatch = useDispatch();

    /* A chaque envoi du formulaire */
    const handleForm = e => {
        /* On prévient le comportement par défaut (évite que la page ne recharge) */
        e.preventDefault();

        /* Création d'un nouvel article avec la valeur des inputs */
        const newArticle = {
            title: inputsRef.current[0].value,
            body: inputsRef.current[1].value
        }

        /* dispatch permet d'envoyer une action pour déclencher un changement d'état */
        dispatch({
            type: 'ADDARTICLE', /* action */
            payload: newArticle /* data à passer (payload) */
        })

        /* Réinitialisation du formulaire */
        e.target.reset();
    };

    const inputsRef = useRef([])

    const addRefs = el => {
        if (el && !inputsRef.current.includes(el)) {
            inputsRef.current.push(el)
        }
    }

    return (
        <>
            <h1 className="title-form">Ecrivez un article</h1>

            <form onSubmit={handleForm} className="container-form">
                <label htmlFor="title">Titre</label>
                <input
                    ref={addRefs}
                    type="text"
                    id="title"
                    placeholder="Entrez votre nom"
                    className="inp-title"
                />

                <label htmlFor="article">Votre article</label>
                <textarea
                    ref={addRefs}
                    id="article"
                    placeholder="Votre article"
                    className="inp-body"
                ></textarea>

                <button>Envoyez l'article</button>
            </form>
        </>
    );
}