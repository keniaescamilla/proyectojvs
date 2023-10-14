import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Realiza una solicitud GET para obtener la lista de productos
    axios.get('http://localhost:3001/productos')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error al obtener productos', error);
      });
  }, []);

  return (
    <div>
      <h2>Lista de Productos</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.nombre} - ${product.precio}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
