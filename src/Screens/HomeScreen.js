import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ProductDeleteAction, ProductListAction } from "../Actions/ProductActions"
import { Button, IconButton } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { Delete, Edit } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

const paginationModel = { page: 0, pageSize: 5 }

export default function HomeScreen() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let Products = useSelector((state) => {
        return state.Product.products
    })



    useEffect(() => {
        dispatch(ProductListAction())
        // eslint-disable-next-line
    }, [dispatch])


    const columns = [

        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'title', headerName: 'Title', width: 130 },
        { field: 'alias', headerName: 'Alias', width: 130 },
        { field: 'content', headerName: 'Content', flex: 1 },
        { field: 'headerScript', headerName: 'Header Script', flex: 1 },
        { field: 'bodyScript', headerName: 'Body Script', flex: 1 },
        {
            field: 'Actions', headerName: 'Actions', width: 130, renderCell: (cell) => {
                return <>
                    <IconButton onClick={() => navigate("/form/" + cell.row.alias)} color="primary">
                        <Edit />
                    </IconButton>
                    <IconButton color="primary" onClick={() => {
                        if (!window.confirm("Are sure to remove this Products ? ")) return
                        dispatch(ProductDeleteAction(cell.row.alias))
                    }}>
                        <Delete />
                    </IconButton>
                </>
            }
        },
    ]


    return <>
        <div className="d-flex mb-3 justify-content-between flex-row align-items-center">
            <h2>List Your Product</h2>
            <Button onClick={() => navigate("/form/add")} variant="contained" color="primary">Add New </Button>
        </div>
        <div className="row">
            <div className="col-12 table">
                <DataGrid
                    rows={Products || []}
                    columns={columns}
                    getRowId={(e) => e.alias}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    autoHeight
                // sx={{ border: 0 }}
                />
            </div>
        </div>
    </>
}