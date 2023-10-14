import React, { useState } from 'react';
import './App.css';
//import 'tailwindcss/tailwind.css'; // Importa los estilos de Tailwind CSS
import axios from 'axios';

function ProductForm({ onAddProduct, onUpdateProduct, onDeleteProduct }) {
  const [newProduct, setNewProduct] = useState({
    nombre: '',
    precio: 0,
    descripcion: '',
    disponibilidad: 0,
  });
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
      axios
        .put(`http://localhost:3001/productos/${editProductId}`, newProduct)
        .then((response) => {
          // Producto actualizado exitosamente
          onUpdateProduct(response.data); // Llama a una función para actualizar el listado
        })
        .catch((error) => {
          console.error('Error al actualizar el producto', error);
        });

      setIsEditing(false);
    } else {
      // Realiza una solicitud POST para agregar un nuevo producto
      axios
        .post('http://localhost:3001/productos', newProduct)
        .then((response) => {
          // Producto agregado exitosamente, puedes actualizar la lista de productos
          onAddProduct(response.data); // Llama a una función para actualizar el listado
        })
        .catch((error) => {
          console.error('Error al agregar el producto', error);
        });
    }

    // Limpia los campos del formulario después de agregar/actualizar el producto
    setNewProduct({ nombre: '', precio: 0, descripcion: '', disponibilidad: 0 });
  };

  const handleEdit = (product) => {
    setNewProduct({
      nombre: product.nombre,
      precio: product.precio,
      descripcion: product.descripcion,
      disponibilidad: product.disponibilidad,
    });
    setIsEditing(true);
    setEditProductId(product.id);
  };

  const handleDelete = (productId) => {
    // Realiza una solicitud DELETE para eliminar el producto
    axios
      .delete(`http://localhost:3001/productos/${productId}`)
      .then(() => {
        // Producto eliminado exitosamente
        onDeleteProduct(productId); // Llama a una función para actualizar el listado
      })
      .catch((error) => {
        console.error('Error al eliminar el producto', error);
      });

    // Limpia los campos del formulario después de eliminar el producto
    setNewProduct({ nombre: '', precio: 0, descripcion: '', disponibilidad: 0 });
    setIsEditing(false);
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-8 mx-auto max-w-2xl">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Agregar un nuevo producto</h2>
      <div className="bg-pink-200 p-4 rounded-lg mb-4"> {/* Contenedor con fondo rosa */}
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre del Producto:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={newProduct.nombre}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Escribe el nombre del producto"
                required
              />
            </div>
            <div className="w-full">
              <label htmlFor="precio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio del Producto:</label>
              <input
                type="number"
                id="precio"
                name="precio"
                value={newProduct.precio}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="$2999"
                required
              />
            </div>
            <div>
              <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción del Producto:</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={newProduct.descripcion}
                onChange={handleInputChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Tu descripción aquí"
              />
            </div>
            <div>
              <label htmlFor="disponibilidad" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Disponibilidad del Producto:</label>
              <input
                type="number"
                id="disponibilidad"
                name="disponibilidad"
                value={newProduct.disponibilidad}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="12"
                required
              />
            </div>
          </div>
          <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
            {isEditing ? 'Actualizar Producto' : 'Agregar Producto'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
