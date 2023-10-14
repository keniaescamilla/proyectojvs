import React, { useState } from 'react';
import axios from 'axios';

function ProductForm({ onAddProduct, onUpdateProduct, onDeleteProduct }) {
  const [newProduct, setNewProduct] = useState({ nombre: '', precio: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Realiza una solicitud PUT para actualizar el producto existente
      axios.put(`http://localhost:3001/productos/${editProductId}`, newProduct)
        .then(response => {
          // Producto actualizado exitosamente
          onUpdateProduct(response.data); // Llama a una función para actualizar el listado
        })
        .catch(error => {
          console.error('Error al actualizar el producto', error);
        });

      setIsEditing(false);
    } else {
      // Realiza una solicitud POST para agregar un nuevo producto
      axios.post('http://localhost:3001/productos', newProduct)
        .then(response => {
          // Producto agregado exitosamente, puedes actualizar la lista de productos
          onAddProduct(response.data); // Llama a una función para actualizar el listado
        })
        .catch(error => {
          console.error('Error al agregar el producto', error);
        });
    }

    // Limpia los campos del formulario después de agregar/actualizar el producto
    setNewProduct({ nombre: '', precio: 0 });
  };

  const handleEdit = (product) => {
    setNewProduct({ nombre: product.nombre, precio: product.precio });
    setIsEditing(true);
    setEditProductId(product.id);
  };

  const handleDelete = (productId) => {
    // Realiza una solicitud DELETE para eliminar el producto
    axios.delete(`http://localhost:3001/productos/${productId}`)
      .then(() => {
        // Producto eliminado exitosamente
        onDeleteProduct(productId); // Llama a una función para actualizar el listado
      })
      .catch(error => {
        console.error('Error al eliminar el producto', error);
      });

    // Limpia los campos del formulario después de eliminar el producto
    setNewProduct({ nombre: '', precio: 0 });
    setIsEditing(false);
  };

  return (
    <div>
      <h2>{isEditing ? 'Editar Producto' : 'Agregar Producto'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre del Producto:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={newProduct.nombre}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="precio">Precio del Producto:</label>
          <input
            type="number"
            id="precio"
            name="precio"
            value={newProduct.precio}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">
          {isEditing ? 'Actualizar Producto' : 'Agregar Producto'}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
