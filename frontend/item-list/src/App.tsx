import { useState, useEffect } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import './App.css'
import axios from 'axios'

type Item = {
    id: number
    name: string
}

function App() {

  const baseUrl = `${import.meta.env.VITE_REACT_APP_API_URL}`;

  const [name, setName] = useState('');
  const [editMode, setEditMode] = useState<Item>({id: 0, name: ''});
  const [items, setItems] = useState<Item []>([]);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    const URL = `${baseUrl}/view`;
    axios.get(URL)
    .then(response => {
      const items: Item[] = response.data;
      items.sort((a, b) => a.id - b.id);
      setItems(items);
    })
    .catch(error => setError(error));
  }

  const addItem = () => {
    if (!name.trim()) return;
    const URL = `${baseUrl}/add`;
    axios.post(URL, {
      name: name
    })
    .then(response => {
      const item = response.data;
      setItems([...items, item]);
    })
    .catch(error => setError(error))
    .finally(() => setName(''));
  }

  const updateItem = (id: number) => {
    
    if (editMode.id !== id) return;
    if (!editMode.name) return;
    const URL = `${baseUrl}/update/${id}`;
    axios.put(URL, {
      name: editMode.name
    })
    .then(response => {
      const updatedItem: Item = response.data;
      const updatedItems: Item[] = items.map((item) => {
        if (item.id !== id) return item;
        else return updatedItem;
      });
      updatedItems.sort((a, b) => a.id - b.id);
      setItems(updatedItems);
    })
    .catch(error => console.error(error))
    .finally(() => setEditMode({id: 0, name: ''}));
  }

  const deleteItem = (id: number) => {

    const URL = `${baseUrl}/delete/${id}`;
    axios.delete(URL)
    .then(response => {
      console.log(response.data);
      const remainingItems = items.filter(items => items.id !== id);
      setItems(remainingItems);
    })
    .catch(error => setError(error))
    .finally(() => setName(''));
  }

  return (
    <div className='container'>
        <h2>Item List</h2>
        <input className='item-input' 
              type="text" 
              placeholder='Item Name' 
              value={name} 
              onChange={(e) => setName(e.target.value)}/>
        <br />
        <button className='add-item-button' type='button' onClick={addItem}>Add Item</button>
        <div className='error-container'>
          {error && <p>{error.message}</p>}
        </div>
        <ul>
          {items.map(item => 
            <li key={item.id.toString()}>
              <div className='item-edit-container'>
                <input className='item-edit-input' value={editMode.id !== item.id ? item.name : editMode.name} disabled={item.id !== editMode.id} onChange={(e) => setEditMode({...editMode, name: e.target.value})}/>
                {item.id !== editMode.id && <button className='delete-button' onClick={() => deleteItem(item.id)}><MdDeleteForever /></button>}
                {item.id === editMode.id ?  <button className='update-button' onClick={() => updateItem(item.id)}>Update</button> : <button className='edit-button' onClick={() => setEditMode({id: item.id, name: item.name})}><FaRegEdit /></button>}
              </div>
            </li>
          )}
        </ul>
    </div>
  )
}

export default App
