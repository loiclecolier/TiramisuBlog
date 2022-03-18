import React, { useEffect, useState } from 'react'
import './Contact.css'

export default function Contact() {

  useEffect(() => {
    window.scrollTo({ behavior: 'auto', top: '0px' });
  }, [])

  const [validation, setValidation] = useState("");

  const submitMessage = (event) => {
    event.preventDefault();
    setValidation("Tiramisu est un projet fictif. Le formulaire de contact est désactivé pour cette raison. Si vous souhaitez me contacter pour le développement d'un site web, contactez-moi à cette adresse : loic.lecolier@outlook.be. Merci !");
  }

  return (
    <div className="container-contact">
      <div className="banner-contact"></div>
      <form className="form-contact">
        <h1>Contactez-nous</h1>
        <p className="form-suggest">Une question ? Une remarque ?<br/>N'hésitez pas et écrivez-nous un message !</p>
          <div className="informations-contact">
            <div className="name-contact">
              <label htmlFor="contactName" className="form-label">
                Nom
              </label>
              <input
                  name="name"
                  required
                  type="text"
                  autoComplete="name"
                  className="form-control"
                  id="contactName"
              />
            </div>
            <div className="email-contact">
              <label htmlFor="contactEmail" className="form-label">
                Adresse mail
              </label>
              <input
                  name="email"
                  required
                  type="email"
                  autoComplete="email"
                  className="form-control"
                  id="contactEmail"
              />
            </div>
          </div>
          <div className="message-contact">
            <label htmlFor="contactMessage" className="form-label">
              Message
            </label>
            <textarea
              name="message"
              required
              id="contactMessage"
              className="form-control"
            ></textarea>
          </div>
          <div className="submit-contact">
            {validation && (
                <p className="form-validation">{validation}</p>
            )}
            <button onClick={submitMessage}>Envoyer</button>
          </div>
        </form>
    </div>
  )
}
