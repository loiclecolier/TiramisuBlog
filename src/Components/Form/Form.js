import React from "react";
import "./Form.css";

export default function Form() {

    return (
        <>
            <h1 className="title-form">Ecrivez un article</h1>

            <form className="container-form">
                <label htmlFor="title">Titre</label>
                <input
                    type="text"
                    id="title"
                    placeholder="Entrez votre nom"
                    className="inp-title"
                />

                <label htmlFor="article">Votre article</label>
                <textarea
                    id="article"
                    placeholder="Votre article"
                    className="inp-body"
                ></textarea>

                <button>Envoyez l'article</button>
            </form>
        </>
    );
}