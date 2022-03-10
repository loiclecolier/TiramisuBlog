/* L'état initial du state : tableau vide qui va contenir les articles */
const INITIAL_STATE = {
    articles: []
}

/* Reducer :  fonction qui détermine les changements d'état d'une application */
function articleReducer(state = INITIAL_STATE, action) {
    
    /* En fonction de l'action à réaliser */
    switch(action.type) {

        /* Dans le cas d'ajout d'articles */
        case "ADDARTICLE": {
            const newArr = [...state.articles]; /* on récupère le state actuel des articles qu'on place dans un nouveau tableau */
            newArr.unshift(action.payload); /* Ajoute le payload (le nouvel article) au début du tableau */
            return {
                ...state, /* on récupère le state actuel qui sera écrasé par le nouveau (pas obligatoire car une seule propriété dans le state) */
                articles: newArr /* nouveau tableau avec le nouvel article */
            }
        }

        /* Dans le cas du chargement des articles */
        case "LOADARTICLES": {
           return {
               ...state, /* on récupère le state actuel qui sera écrasé par le nouveau (pas obligatoire car une seule propriété dans le state) */
               articles: action.payload /* = data de l'appel à l'API */
           } 
        }

        /* Si l'action est inexistante */
        default: {
            return state;
        }
    }

}

/* Export du reducer */
export default articleReducer;

/* Fonction qui permet de faire l'appel à une API */
    /* fonction qui retourne une fonction et donne accès à dispatch */
    /* dispatch permet d'envoyer une action pour déclencher un changement d'état */
export const getArticles = () => dispatch => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
        dispatch({
            type: 'LOADARTICLES', // type de l'action
            payload: data // données à envoyer (payload)
        })
    })
}