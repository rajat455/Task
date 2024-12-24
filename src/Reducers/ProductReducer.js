export const ProductReducer = (state = { products: [] }, action) => {
    if (action.type === "SUCCESS") {
       return state = {products:action.products}
    }else{
        state = {products:[]}

        return state
    }
}
