import React from 'react';
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import CategoryList from '../../components/categorylist/CategoryList';

function Categories() {
  return (
    <div className="App">
      <Header />
      <div className="flex">
        <Sidebar />
        <CategoryList />
      </div>
    </div>
  );
}

export default Categories;