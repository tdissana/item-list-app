import axios from 'axios';
import './App.css'
import { useState } from 'react';

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
    .catch(error => console.error(error))
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
    .catch(error => console.error(error))
    .finally(() => setName(''));
  }

  return (
    <div>

    </div>
  )
}

export default App
