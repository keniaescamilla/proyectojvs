import React, { useState } from 'react';
//import 'tailwindcss/tailwind.css';
import'./App.css';

function CrudComponent() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Pikachu', price: 10, description: 'blablalvlb', disponibilidad: 5 },
    { id: 2, name: 'Producto B', price: 20, description: 'blaldj', disponibilidad: 10 },
    { id: 3, name: 'Producto C', price: 15, description: 'Descripción de ccc', disponibilidad: 3 },
    // Otros productos...
  ]);

  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    price: '',
    description: '',
    disponibilidad: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const generateUniqueId = () => {
    return products.length + 1;
  };

  const addProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.description && newProduct.disponibilidad) {
      if (isEditing) {
        const updatedProducts = products.map((product) =>
          product.id === newProduct.id ? newProduct : product
        );
        setProducts(updatedProducts);
      } else {
        const newId = generateUniqueId();
        setProducts([...products, { id: newId, ...newProduct }]);
      }
      setNewProduct({
        id: '',
        name: '',
        price: '',
        description: '',
        disponibilidad: '',
      });
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
    setNewProduct({
      id: '',
      name: '',
      price: '',
      description: '',
      disponibilidad: '',
    });
    setIsEditing(false);
  };

  return (
    <div className='Dashboard'>
     <h1>Tienda onlinee</h1>
      <br></br>
      <table className='Dashboard'>
        <thead>
          <tr>
            <th>ID </th>
            <th> Nombre  </th>
            <th> Precio </th>
            <th> Descripción     </th>
            <th> Disponibilidad </th>
            <th> Acciones </th>
          </tr>
        </thead>
        
        <tbody>
          
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.description}</td>
              <td>{product.disponibilidad}</td>
              <td>
                <button onClick={() => editProduct(product)}> Editar</button>
                <button onClick={() => deleteProduct(product.id)}>Eliminar </button>
               
              </td>
            </tr>
          ))}
        
        </tbody>
        
      </table>
      <div>
        <br></br>
        <h3>{isEditing ? 'Editar Un Producto' : 'Agregar Un Producto'}</h3>
        <br></br>
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
        <input
          type="text"
          placeholder="Descripción"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Disponibilidad"
          value={newProduct.disponibilidad}
          onChange={(e) => setNewProduct({ ...newProduct, disponibilidad: e.target.value })}
        />
        <br></br>
        <br></br>
        <button onClick={addProduct}>{isEditing ? 'Actualizar ^^' : 'Agregar^^'}</button>
      </div>
      <img src='https://pngimg.es/d/cat_PNG50512.png'></img>
    </div>
  );
}

export default CrudComponent;
