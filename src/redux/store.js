import { createStore, applyMiddleware, combineReducers } from 'redux' /* imports des fonctions de redux */
import articleReducer from './articles/articleReducer'
import thunk from 'redux-thunk' /* permet de faire des appels asynchrones avec Redux */

/* Ajout des reducers dans un 'rootReducer' */
const rootReducer = combineReducers({
    articleReducer
})

/* Création du store avec les reducers et le middleware thunk (appelé quand on passe une fonction à un dispatch pour faire un appel asynchrone) */
const store = createStore(rootReducer, applyMiddleware(thunk))

/* Export du store */
export default store;