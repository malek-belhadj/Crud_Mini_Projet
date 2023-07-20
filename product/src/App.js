import './App.css';
import Axios from 'axios';
import {useState} from 'react';
import updateButton from './updButton.png';
import deleteButton from './del.png';


function App() {
const [Name,setName]=useState("");
const [Price,setPrice]=useState(0);
const [Quantity,setQuantity]=useState(0);
const [Products,setProducts]=useState([]);

const[searchWords,setSearchWords]=useState('');

const [newName,setNewName]=useState('')
const [newPrice,setNewPrice]=useState(0)
const [newQuantity,setNewQuantity]=useState(0)


const addProduct=()=>{
  Axios.post('http://localhost:3001/create',{name:Name,price:Price,quantity:Quantity}).then(()=>{
    getProducts();
  });
};

const getProducts=()=>{
  Axios.get('http://localhost:3001/products').then((response)=>{
    setProducts(response.data);
  });
};

const updateProduct=(id)=>{
  Axios.put('http://localhost:3001/update',{name:newName,id:id,price:newPrice,quantite:newQuantity}).then((response)=>{
    getProducts();
  })
};

const searchProduct=()=>{
  Axios.post('http://localhost:3001/search',{keywords:searchWords}).then((response)=>{
    setProducts(response.data);
  })
}

const deleteProduct=(id)=>{
  Axios.delete(`http://localhost:3001/delete/${id}`).then((response)=>{
    getProducts();
  })
}

  return (
    <div className="App">
      <div className="search">
        <input type="text" placeholder="mot(s) clé(s)..." onChange={(event)=>{
          setSearchWords(event.target.value);
        }}/>
        <button onClick={searchProduct}>Chercher</button>
      </div>
      <div className="add">
      <h1>Ajouter un nouveau produit</h1>
      <label>Nom</label>
      <input type="text" onChange={(event)=> {
        setName(event.target.value);
      }}/>
      <label>Prix Unitaire</label>
      <input type="number" onChange={(event)=> {
        setPrice(event.target.value);
      }}/>
      <label>Quantité</label>
      <input type="number" onChange={(event)=> {
        setQuantity(event.target.value);
      }}/>
      <button onClick={addProduct}> Creer nouveau produit</button>
      <button className='Affiche' onClick={getProducts}> Afficher tous les produits</button>
      </div>
      <table border="1" cellPadding="5" cellSpacing="0">
  <thead>
    <tr>
      <th>id</th>
      <th>Nom</th>
      <th>Prix Unitaire</th>
      <th>Quantité</th>
      <th colSpan="2">Actions</th>
    </tr>
  </thead>
  <tbody>
    {Products.map((product, key) => (
      <tr>
        <td>{product.id}</td>
        <td>{product.nom}</td>
        <td>{product.prixUnitaire}</td>
        <td>{product.quantite}</td>
        <td className='update'>
          <input type='text' placeholder='Nom' onChange={(event)=> {
        setNewName(event.target.value);
      }}/>
          <input type='number' placeholder='Prix Unitaire'
          onChange={(event)=> {
            setNewPrice(event.target.value);
          }}/>
          <input type='number' placeholder='Quantite'onChange={(event)=> {
        setNewQuantity(event.target.value);
      }}/>
          <button className='updel' onClick={()=>{updateProduct(product.id);
          }}> <img src={updateButton} alt='update'/></button>
        </td>
        <td><button className='updel' onClick={()=>{deleteProduct(product.id);

        }}><img src={deleteButton}alt='delete'/></button></td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
}
export default App;
