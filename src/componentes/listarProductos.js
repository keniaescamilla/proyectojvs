import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListarProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Realiza una solicitud GET a la API para obtener la lista de productos.
    axios.get('http://localhost:3001/productos')
      .then(response => {
        setProductos(response.data);
      })
      .catch(error => {
        console.error('Error al obtener la lista de productos', error);
      });
  }, []);

  return (
    <div>
      <h2>Lista de Productos</h2>
      <ul>
        {productos.map(producto => (
          <li key={producto.id}>{producto.nombre} - {producto.precio}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListarProductos;
