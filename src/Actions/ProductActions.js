export const ProductListAction = () => {
    let Products = localStorage.getItem("products") || "[]"
    Products = JSON.parse(Products)
    return {
        type: "SUCCESS",
        products: Products
    }
}


export const ProductCreateAction = (product) => {
    let Products = localStorage.getItem("products") || "[]"
    Products = JSON.parse(Products)
    Products.push(product)
    localStorage.setItem("products", JSON.stringify(Products))
    return ProductListAction()
}
export const ProductUpdateAction = (product) => {
    let Products = localStorage.getItem("products") || "[]"
    Products = JSON.parse(Products)
    let ProductIndex = Products.findIndex((x) => x.alias === product.alias)
    Products[ProductIndex] = product
    localStorage.setItem("products", JSON.stringify(Products))
    return ProductListAction()
}

export const ProductDeleteAction = (alias) => {
    let Products = localStorage.getItem("products") || "[]"
    Products = JSON.parse(Products)
    let index = Products.findIndex((x) => x.alias === alias)
    Products.splice(index, 1)
    localStorage.setItem("products", JSON.stringify(Products))
    return ProductListAction()
}