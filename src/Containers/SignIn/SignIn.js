import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import Chef from './chef.png'
import './SignIn.css'

function SignIn() {

    const { signIn } = useContext(UserContext);

    const navigate = useNavigate();

    const [validation, setValidation] = useState("");
    const [isTogglePassword, setIsTogglePassword]= useState(false);

    const inputs = useRef([]);
    const addInputs = (el) => {
        if (el && !inputs.current.includes(el)) {
            inputs.current.push(el);
        }
    };

    const handleForm = async (e) => {
        e.preventDefault();

        try {
            await signIn(inputs.current[0].value, inputs.current[1].value);
            navigate("/tb-admin/home");
        } catch (err) {
            if (err.code === "auth/user-not-found" ||
                err.code === "auth/wrong-password") {
                setValidation("Email et/ou mot de passe incorrect");
            } else {
                setValidation("Erreur serveur, veuillez réessayer");
            }
            console.log(err);
        }
    };

    const togglePassword = () => {
        setIsTogglePassword(!isTogglePassword);
    }

    return (
        <div className="container-signin">
            <img src={Chef} alt="Chef Cuisinier Admin" className="logo-signin"/>
            <form onSubmit={handleForm} className="form-signin">
                <div>
                    <label htmlFor="signInEmail" className="form-label">
                        Adresse mail
                    </label>
                    <input
                        ref={addInputs}
                        name="email"
                        required
                        type="email"
                        autoComplete="email"
                        placeholder="fan-de-tiramisu@gmail.com"
                        className="form-control"
                        id="signInEmail"
                    />
                </div>
                <div>
                    <label htmlFor="signInPwd" className="form-label">
                        Mot de passe
                    </label>
                    <div className="input-password">
                        <input
                            ref={addInputs}
                            name="pwd"
                            required
                            type={isTogglePassword ? "text" : "password"}
                            autoComplete="current-password
                            "
                            className="form-control"
                            id="signInPwd"
                        />
                        {isTogglePassword ? 
                            <svg onClick={togglePassword} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                        :
                            <svg onClick={togglePassword} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        }
                    </div>
                    {validation && (
                        <p className="form-validation">{validation}</p>
                    )}
                </div>
                <button>Se connecter</button>
            </form>
        </div>
    );
}

export default SignIn;
