import React, { useEffect, useState } from 'react';
import Panel from '../../components/Panel/Panel';
import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableFooter,
  TablePagination,
  TextField,
  IconButton
} from '@mui/material';
import { getCategoryFilterList, deleteCategory } from '../../redux/slices/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { RxQuestionMarkCircled } from "react-icons/rx";
import { MdModeEdit, MdDelete } from "react-icons/md";
import DeleteCategoryModal from '../../components/Modal/DeleteCategoryModal';

function Categories() {
  const dispatch = useDispatch();
  const { loading, categoryDeleted, deleteCategoryState, getCategoryFilterListState } = useSelector(state => state.categorySlice);

  const [filter, setFilter] = useState({
    categoryName: "",
    rowsPerPage: 10,
    page: 0,
    order: "desc"
  });

  const [deletedCategory, setDeletedCategory] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);


  useEffect(() => {
    dispatch(getCategoryFilterList(filter));
  }, [dispatch])


  useEffect(() => {
    dispatch(getCategoryFilterList(filter));
  }, [filter])

  useEffect(() => {
    if (!deleteCategoryState.loading && deleteCategoryState.success) {
      dispatch(getCategoryFilterList(filter));
    }
  }, [deleteCategoryState.loading])



  const handleChangePage = (event, page) => {
    setFilter((preFilter) => {
      return {
        ...preFilter,
        page: page
      }
    });
  }

  const handleChangeRowsPerPage = (event) => {
    setFilter((prevFilter) => {
      return {
        ...prevFilter,
        rowsPerPage: event.target.value
      }
    });
  }

  const handleChangeCategoryName = (event) => {
    const categoryName = event.target.value;

    if (categoryName.length >= 3) {
      setFilter((prevFilter) => {
        return {
          ...prevFilter,
          categoryName: event.target.value
        }
      });
    } else {
      setFilter((prevFilter) => {
        return {
          ...prevFilter,
          categoryName: ""
        }
      });
    }

    console.log("category name changed :", filter);
  }

  const handleDeleteCategory = (categoryName, categoryId) => {
    setDeletedCategory({
      id: categoryId,
      categoryName
    });

    setOpenDeleteModal(true);
  }

  const modalClose = () => {
    setDeletedCategory(null);
    setOpenDeleteModal(false);
  }

  const handleDeleteModalClose = () => {
    modalClose();
  }

  const handleDeleteModalYes = () => {
    modalClose();
    dispatch(deleteCategory({ id: deletedCategory?.id }));
    //dispatch(getCategoryFilterList(filter));
  }

  return (
    <Panel title="Kategori Listesi">
      <DeleteCategoryModal
        categoryName={deletedCategory?.categoryName}
        isOpen={openDeleteModal}
        onClose={handleDeleteModalClose}
        onYes={handleDeleteModalYes}
        onCancel={handleDeleteModalClose}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={6} align='right'>
                <TextField label="Kategori Ara" size='small' className='ml-auto' onChange={handleChangeCategoryName} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Kategori Resmi</TableCell>
              <TableCell align="left">Kategori Adı</TableCell>
              <TableCell align="left">Açıklama</TableCell>
              <TableCell align="left">İşlem</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              (getCategoryFilterListState.success && getCategoryFilterListState.categoryList.length != 0) && (
                getCategoryFilterListState.categoryList.map((category) => {
                  return (
                    <TableRow key={category.id}>
                      <TableCell>{category.id}</TableCell>
                      <TableCell align="left">
                        {

                          (category.imagePath === null || category.imagePath === "")
                            ? <RxQuestionMarkCircled size={31} color='#757575' />
                            : <img src={`https://stokapi.rakunsoft.xyz/app-images/${category.imagePath}`} className='w-12' />

                        }
                      </TableCell>
                      <TableCell align="left">{category.categoryName}</TableCell>
                      <TableCell align="left">{category.description?.substring(0, 100)}</TableCell>
                      <TableCell align="left">
                        <div className='flex flex-row gap-x-2'>
                          <IconButton href={`/dashboard/edit-category/${category.id}`}>
                            <MdModeEdit color='blue' />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteCategory(category.categoryName, category.id)}>
                            <MdDelete color='red' />
                          </IconButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })
              )
            }
          </TableBody>
          <TableFooter>
            <TableRow>
              <image />
              <TablePagination
                rowsPerPageOptions={[10, 20, 40, 50, { label: 'All', value: -1 }]}
                colSpan={5}
                count={getCategoryFilterListState.listSize}
                rowsPerPage={filter.rowsPerPage}
                page={filter.page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              // ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Panel>
  );
}

export default Categories;