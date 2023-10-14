import React, { useState } from 'react';
import axios from 'axios';

const CrearProducto = () => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');

  const handleSubmit = () => {
    // Realiza una solicitud POST a la API para agregar un nuevo producto.
    axios.post('http://localhost:3001/productos', { nombre, precio })
      .then(response => {
        // Producto agregado exitosamente
      })
      .catch(error => {
        console.error('Error al agregar el producto', error);
      });
  };

  return (
    <div>
      <h2>Agregar Producto</h2>
      <input type="text" placeholder="Nombre del producto" value={nombre} onChange={e => setNombre(e.target.value)} />
      <input type="number" placeholder="Precio" value={precio} onChange={e => setPrecio(e.target.value)} />
      <button onClick={handleSubmit}>Agregar Producto</button>
    </div>
  );
};
export default CrearProducto;
