import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
//import 'tailwindcss/tailwind.css'; // Importa los estilos de Tailwind CSS

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
    <div className="p-4"> {/* Aplica clases de Tailwind CSS para estilos */}
      <h2 className="text-lg font-semibold">Lista de Productos</h2>
      <ul>
        {products.map(product => (
          <li key={product.id} className="mt-2"> {/* Aplica clases de Tailwind CSS para estilos */}
            <strong>Nombre:</strong> {product.nombre}<br />
            <strong>Precio:</strong> ${product.precio}<br />
            <strong>Descripción:</strong> {product.descripcion}<br />
            <strong>Disponibilidad:</strong> {product.disponibilidad}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
