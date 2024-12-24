import { combineReducers, createStore } from "redux";
import { ProductReducer } from "./Reducers/ProductReducer";


const initState = {}

const reducer = combineReducers({
    Product:ProductReducer
})

const store = createStore(reducer, initState)
export default store