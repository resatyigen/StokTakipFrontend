import React from 'react';
import './products.css';
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import ProductList from '../../components/productlist/ProductList';

function Products() {
  return (
    <div className="App">
      <Header />
      <div className="flex">
        <Sidebar />
        <ProductList />
      </div>
    </div>
  );
}

export default Products;