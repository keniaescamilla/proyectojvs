import React, { useState } from 'react';
import axios from 'axios';
import'./App.css';

function CrearProducto({ onProductoCreado, products, setProducts }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
  };

  const agregarProducto = () => {
    if (nombre && descripcion) {
      const nuevoProducto = {
        nombre: nombre,
        descripcion: descripcion,
      };

      // Realiza una solicitud POST para guardar el nuevo producto en el servidor
      axios.post('http://localhost:3001/productos', nuevoProducto)
        .then(response => {
          console.log('Producto guardado con éxito en el servidor', response.data);

          // Agrega el nuevo producto al estado local
          const newId = products.length + 1; // Genera un ID basado en el número de productos
          products.push({ id: newId, ...nuevoProducto });
          setProducts([...products]);

          // Llama a la función proporcionada por el componente padre
          // para notificar que se ha creado un nuevo producto
          onProductoCreado(response.data);

          // Limpia los campos de entrada después de agregar el producto
          setNombre('');
          setDescripcion('');
        })
        .catch(error => {
          console.error('Error al guardar el producto en el servidor', error);
        });
    }
  };

  return (
    <div>
      <h2>Crear Nuevo Producto</h2>
      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={handleNombreChange}
        />
      </div>
      <div>
        <label htmlFor="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={handleDescripcionChange}
        />
      </div>
      <button onClick={agregarProducto}>Agregar Producto</button>
    </div>
  );
}

export default CrearProducto;
