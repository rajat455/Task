import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductCreateAction, ProductListAction, ProductUpdateAction } from "../Actions/ProductActions";
import { useNavigate, useParams } from "react-router-dom";

let isSubmited = false

export default function FormScreen() {
    const navigate = useNavigate()
    const params = useParams().alias


    const [Product, setProduct] = useState({
        title: "",
        name: "",
        alias: "",
        ragulerPrice: "",
        sellingPrice: "",
        content: "",
        headerScript: "",
        bodyScript: "",
    })


    const dispatch = useDispatch()
    const [error, seterror] = useState(false)
    let Products = useSelector((state) => {
        return state.Product.products
    })


    useEffect(() => {
        dispatch(ProductListAction())
        // eslint-disable-next-line
    }, [])

    useEffect(() => {



        if (params !== "add") {
            const product = Products.find((x) => x.alias === params)
            setProduct({ ...Product, ...product })
        } else {
            setProduct({
                title: "",
                name: "",
                alias: "",
                ragulerPrice: "",
                sellingPrice: "",
                content: "",
                headerScript: "",
                bodyScript: "",
            })
        }
        // eslint-disable-next-line
    }, [Products, params])

    const Validator = (data) => {
        const errors = {};

        if (data.title.length < 5) {
            errors["title"] = "Title must be at least 5 characters long.";
        }

        if (data.name.length < 3) {
            errors["name"] = "Name must be at least 3 characters long.";
        }

        if (data.alias.length < 3) {
            errors["alias"] = "Alias must be at least 3 characters long.";
        }


        if (!Number(data.ragulerPrice) || !data.ragulerPrice) {
            errors["ragulerPrice"] = "Regular Price must be a valid number.";
        }

        if (!Number(data.sellingPrice) || !data.sellingPrice) {
            errors["sellingPrice"] = "Selling Price must be a valid number.";
        }

        return errors;
    };


    const HandelChange = (e) => {
        setProduct((state) => {
            return { ...state, [e.target.id]: e.target.value }
        })
    }

    useEffect(() => {
        if (isSubmited) {
            seterror(() => Validator(Product))
        }
    }, [Product])

    const Inserthandeler = () => {
        const validation = Validator(Product)
        seterror(validation)
        isSubmited = true
        if (!Object.keys(error).length) {
            const isExist = Products.find((x) => x.alias === Product.alias)
            if (isExist) return seterror({ alias: "Product Alias" + Product.alias + "is Already Exist !" })
            dispatch(ProductCreateAction(Product))
            navigate("/")
        }
    }
    const UpdateHandeler = () => {
        const validation = Validator(Product)
        seterror(validation)
        isSubmited = true
        if (!Object.keys(error).length) {
            dispatch(ProductUpdateAction(Product))
            navigate("/")
        }
    }

    return <>
        <div className="d-flex justify-content-between flex-row align-items-center">
            <h2>Insert Product</h2>
            <Button onClick={params !== "add" ? UpdateHandeler : Inserthandeler} variant="contained" color="primary">Publish</Button>
        </div>
        <hr />
        <div className="row">
            <div className="col-12 col-md-4 mb-3">
                <div className="row">
                    <div className="col-12 mb-3">
                        <TextField
                            required
                            value={Product.title}
                            id="title"
                            helperText={error["title"]}
                            label="Title"
                            fullWidth
                            onChange={HandelChange}
                            error={error["title"]}
                        />
                    </div>
                    <div className="col-12 mb-3">
                        <TextField
                            value={Product.name}
                            required
                            id="name"
                            helperText={error["name"]}
                            error={error["name"]}
                            label="Name"
                            fullWidth
                            onChange={HandelChange}
                        />
                    </div>
                    <div className="col-12 mb-3">
                        <TextField
                            value={Product.alias}
                            helperText={error["alias"]}
                            error={error["alias"]}
                            required
                            id="alias"
                            disabled={params !== "add"}
                            label="Alias"
                            fullWidth
                            onChange={HandelChange}
                        />
                    </div>
                    <div className="col-12 mb-3">
                        <TextField
                            value={Number(Product.ragulerPrice) || ""}
                            helperText={error["ragulerPrice"]}
                            error={error["ragulerPrice"]}
                            required
                            id="ragulerPrice"
                            label="Reguler Price(₹)"
                            fullWidth
                            onChange={HandelChange}
                        />
                    </div>
                    <div className="col-12">
                        <TextField
                            value={Number(Product.sellingPrice) || ""}
                            required
                            helperText={error["sellingPrice"]}
                            error={error["sellingPrice"]}
                            id="sellingPrice"
                            label="Selling Price(₹)"
                            fullWidth
                            onChange={HandelChange}
                        />
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-8 mb-3">
                <TextField fullWidth minRows={14} id="content" multiline label="Content"
                    value={Product.content}
                    onChange={HandelChange}

                />
            </div>
            <div className="col-12 col-md-6 mb-3">
                <TextField fullWidth minRows={5} id="headerScript" multiline label={"Header Script"} value={Product.headerScript} onChange={HandelChange} />
            </div>
            <div className="col-12 col-md-6 mb-3">
                <TextField fullWidth onChange={HandelChange} minRows={5} id="bodyScript" value={Product.bodyScript} multiline label={"Body Script"} />
            </div>
        </div>
    </>
}