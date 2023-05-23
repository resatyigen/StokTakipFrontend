import React from 'react';
import './dashboard.css';
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import ProductList from '../../components/productlist/ProductList';
import '../../App.css';
import '../../assets/css/index.css';

function App() {
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

export default App;