import React, { useState } from 'react';
import './App.css';

function CrudComponent() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Producto A', price: 10 },
    { id: 2, name: 'Producto B', price: 20 },
    { id: 3, name: 'Producto C', price: 15 },
    { id: 4, name: 'Producto C', price: 15 },
    { id: 5, name: 'Producto C', price: 15 },
    { id: 6, name: 'Producto C', price: 15 },
    // Otros productos...
  ]);

  const [newProduct, setNewProduct] = useState({ id: '', name: '', price: '' });
  const [isEditing, setIsEditing] = useState(false);

  const generateUniqueId = () => {
    // Genera un ID único basado en el número de productos existentes
    return products.length + 1;
  };

  const addProduct = () => {
    if (newProduct.name && newProduct.price) {
      if (isEditing) {
        // Modo de edición: Actualiza solo el producto editado
        const updatedProducts = products.map((product) =>
          product.id === newProduct.id ? newProduct : product
        );
        setProducts(updatedProducts);
      } else {
        // Modo de adición: Agrega un nuevo producto con un ID único
        const newId = generateUniqueId();
        setProducts([...products, { id: newId, ...newProduct }]);
      }
      setNewProduct({ id: '', name: '', price: '' });
      setIsEditing(false);
    }
  };

  const editProduct = (product) => {
    setIsEditing(true);
    setNewProduct(product);
  };

  const deleteProduct = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
    setNewProduct({ id: '', name: '', price: '' });
    setIsEditing(false);
  };

  return (
    <div className='Dashboard'>
      <h2>Tienda ONLINE</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>
                <button onClick={() => editProduct(product)}>Editar productito</button>
                <button onClick={() => deleteProduct(product.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>{isEditing ? 'Editar Producto' : 'Agregar Producto'}</h3>
        <input
          type="text"
          placeholder="Nombre"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Precio"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <button onClick={addProduct}>{isEditing ? 'Actualizar' : 'Agregar'}</button>
      </div>
    </div>
  );
}

export default CrudComponent;
