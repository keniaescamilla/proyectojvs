import React from 'react';
import ProductList from './productList';
import ProductForm from './ProductForm';

function Dashboard() {
  return (
    <div >
      <h1>TIENDA ONLINE</h1>
      <ProductList />
      <ProductForm />
    </div>
  );
}

export default Dashboard;
