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
import { deleteProduct, getProductFilterList, setProductDeleted } from '../../redux/slices/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RxQuestionMarkCircled } from "react-icons/rx";
import { MdModeEdit, MdDelete, MdCancel } from "react-icons/md";
import DeleteProductModal from '../../components/Modal/DeleteProductModal';
import Toast from "react-hot-toast";
import { useParams, useNavigate } from 'react-router-dom';
import { getCategory } from '../../redux/slices/categorySlice';
import classNames from 'classnames';
import CategoryItem from '../../components/CategoryItem/CategoryItem';

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { categoryId } = useParams();

  const {
    getProductFilterListState: { loading, error, success, productList, listSize },
    deleteProductState
  } = useSelector(state => state.productSlice);

  const { getCategoryState: { category, loading: categoryLoading } } = useSelector(state => state.categorySlice);

  const [filter, setFilter] = useState({
    productName: "",
    rowsPerPage: 10,
    page: 0,
    order: "desc"
  });

  const [deletedProduct, setDeletedProduct] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    dispatch(getProductFilterList(filter));
  }, [dispatch])

  useEffect(() => {
    if (categoryId) {
      dispatch(getCategory({ id: categoryId }));
      setFilter((preFilter) => {
        return {
          ...preFilter,
          categoryId: categoryId
        }
      });
    } else {
      setFilter((preFilter) => {
        const { categoryId: removadCategoryId, ...filterProps } = preFilter;
        return filterProps;
      });
    }
  }, [categoryId])


  useEffect(() => {
    dispatch(getProductFilterList(filter));
  }, [filter])

  useEffect(() => {
    if (!deleteProductState.loading && deleteProductState.success) {
      dispatch(getProductFilterList(filter));
      Toast.success("Ürün Silindi");
    }
  }, [deleteProductState.loading])

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

  const handleChangeProductName = (event) => {
    const productName = event.target.value;

    if (productName.length >= 3) {
      setFilter((prevFilter) => {
        return {
          ...prevFilter,
          productName: event.target.value
        }
      });
    } else {
      setFilter((prevFilter) => {
        return {
          ...prevFilter,
          productName: ""
        }
      });
    }

    console.log("product name changed :", filter);
  }

  const handleDeleteProduct = (productName, productId) => {
    setDeletedProduct({
      id: productId,
      productName
    });

    setOpenDeleteModal(true);
  }

  const modalClose = () => {
    setDeletedProduct(null);
    setOpenDeleteModal(false);
  }

  const handleDeleteModalClose = () => {
    modalClose();
  }

  const handleDeleteModalYes = () => {
    modalClose();
    dispatch(deleteProduct({ id: deletedProduct?.id }));
    dispatch(getProductFilterList(filter));
  }

  const handleRemoveSelectedCategory = () => {
    navigate("/dashboard/products");
  }

  return (
    <Panel title="Ürün Listesi">
      <DeleteProductModal
        productName={deletedProduct?.productName}
        isOpen={openDeleteModal}
        onClose={handleDeleteModalClose}
        onYes={handleDeleteModalYes}
        onCancel={handleDeleteModalClose}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={8}>
                <div className={classNames({
                  'flex flex-row items-center justify-end': true,
                  "justify-between": categoryId
                })} >
                  {
                    categoryId && (
                      <CategoryItem
                        category={category}
                        handleRemoveSelectedCategory={handleRemoveSelectedCategory}
                      />
                    )
                  }

                  <TextField label="Ürün Ara" size='small' className='ml-auto' onChange={handleChangeProductName} />
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Ürün Resmi</TableCell>
              <TableCell align="left">Kategori Adı</TableCell>
              <TableCell align="left">Ürün Adı</TableCell>
              <TableCell align="left">Açıklama</TableCell>
              <TableCell align="left">Adet</TableCell>
              <TableCell align="left">Ürün Linki</TableCell>
              <TableCell align="left">İşlem</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              (success && listSize != 0) && (
                productList.map((product) => {
                  return (
                    <TableRow key={product.id}>
                      <TableCell>{product.id}</TableCell>
                      <TableCell align="left">
                        {

                          (product.imagePath === null || product.imagePath === "")
                            ? <RxQuestionMarkCircled size={31} color='#757575' />
                            : <img src={`https://stokapi.rakunsoft.xyz/app-images/${product.imagePath}`} className='w-12' />

                        }
                      </TableCell>
                      <TableCell align="left">{product.category.categoryName}</TableCell>
                      <TableCell align="left">{product.productName}</TableCell>
                      <TableCell align="left">{product.description?.substring(0, 100)}</TableCell>
                      <TableCell align="left">{product.quantity}</TableCell>
                      <TableCell align="left">{product.productUrl}</TableCell>
                      <TableCell align="left">
                        <div className='flex flex-row gap-x-2'>
                          <IconButton href={`/dashboard/edit-product/${product.id}`}>
                            <MdModeEdit color='blue' />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteProduct(product.productName, product.id)}>
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
              <TablePagination
                rowsPerPageOptions={[10, 20, 40, 50, { label: 'All', value: -1 }]}
                colSpan={8}
                count={listSize}
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

export default Products;