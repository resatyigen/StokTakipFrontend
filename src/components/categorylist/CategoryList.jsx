import React from 'react'
import './categorieslist.css'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import falanfilanImage from '../../assets/img/falanfilan.png';


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 60 },
    {
      field: 'imagePath',
      headerName: 'Image',
      width: 175,
      renderCell: (params) => {
        return <img src={params.value} alt="Product" style={{ width: '100%', height: 'auto' }} />;
      },
    },
    { field: 'categoryName', headerName: 'Category Name', width: 150 },
    { field: 'color', headerName: 'Color', width: 100 },
    { field: 'quantity', headerName: 'Quantity', type: 'number', width: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => {
        const handleEdit = () => {
          // Handle edit action for the row with params.row.id
        };
  
        const handleDelete = () => {
          // Handle delete action for the row with params.row.id
        };
  
        return (
          <div>
            <DeleteIcon onClick={handleDelete} style={{ cursor: 'pointer' }} />
            <EditIcon onClick={handleEdit} style={{ cursor: 'pointer', marginLeft: '1rem' }} />
          </div>
        );
      },
    },
  ];
  
  const rows = [
    { id: 1, imagePath: falanfilanImage, categoryName: 'Category 1', color: 'Black', quantity: 35 },
    { id: 2, imagePath: falanfilanImage, categoryName: 'Category 2', color: 'Black', quantity: 25 },
    { id: 3, imagePath: falanfilanImage, categoryName: 'Category 3', color: 'Black', quantity: 15 },
    { id: 4, imagePath: falanfilanImage, categoryName: 'Category 4', color: 'Black', quantity: 55 },
    { id: 5, imagePath: falanfilanImage, categoryName: 'Category 5', color: 'Black', quantity: 45 },
  ];

const CategoryList = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 m-10">
          <div className="datagrid-container">
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { pquantity: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </div>
        </div>
  );
};

export default CategoryList;