import React, { useEffect, useRef, useState } from "react";
import './Grocerylist.css';
import pencil from './pencilhd.png'
import strikeout from './strikeout.png';
import vegbg from './vegbg.png';
import capsicum from './capsicum.png';
import onion from './onion.png';
import carrot from './carrot.png';
import garlic from './garlic.png';
import chicken from './chicken.png';
import ghee from './ghee.png';
import ginger from './ginger.png';
import milk from './milk.png';
import salt from './salt.png';

function GroceryList() {
  const [inputText, setInputText] = useState('');
  const [groceryList, setGroceryList] = useState([]);
  const [isAutoscroll, setIsAutoscroll] = useState(true);
  const ref = useRef(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('groceryList');
    if (saved) {
      setGroceryList(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever groceryList changes
  useEffect(() => {
    localStorage.setItem('groceryList', JSON.stringify(groceryList));
  }, [groceryList]);

  useEffect(() => {
    if (ref.current && isAutoscroll) {
      const listRef = ref.current;
      listRef.scrollTop = listRef.scrollHeight;
    }
  }, [groceryList]);

  const handleInput = (event) => {
    setInputText(event.target.value);
  }

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  }

  const handleSubmit = () => {
    if (inputText.trim()) {
      setIsAutoscroll(true);
      const newItem = {
        name: inputText.charAt(0).toUpperCase() + inputText.slice(1).toLowerCase(),
        status: 'notDone'
      }
      setGroceryList([...groceryList, newItem]);
      setInputText('');
    }
  }

  const handleEdit = (name, id, status) => {
    setIsAutoscroll(false);
    const updateValue = prompt('Enter the value', name);
    if (updateValue !== null) {
      setGroceryList(groceryList.map(item => 
        item.id === id 
          ? { ...item, name: updateValue.trim() || name }
          : item
      ));
    }
  }

  const handleDelete = (id) => {
    setIsAutoscroll(false);
    setGroceryList(groceryList.filter(item => item.id !== id));
  }

  const handleCheck = (name, id) => {
    setIsAutoscroll(false);
    setGroceryList(groceryList.map(item => 
      item.id === id 
        ? { ...item, status: 'done' }
        : item
    ));
  }

  return (
    <>
      <img className="pencil-image" src={pencil} />
      <img className="veggies-image" src={vegbg} />
      <img className="capsicum-image" src={capsicum} />
      <img className="carrot-image" src={carrot} />
      <img className="onion-image" src={onion} />
      <img className="garlic-image" src={garlic} />
      <img className="chicken-image" src={chicken} />
      <img className="ghee-image" src={ghee} />
      <img className="ginger-image" src={ginger} />
      <img className="milk-image" src={milk} />
      <img className="salt-image" src={salt} />
      
      <div className='background-image'>
        <input className="enter-grocery"
          placeholder="Enter Grocery"
          value={inputText}
          autoFocus
          onChange={handleInput}
          onKeyDown={handleEnter} />
        <a className="submit-button" onClick={handleSubmit} />

        <div ref={ref} className="listed-item">
          {groceryList.map((value, index) => (
            <div key={value.id} className="item-container"> {/* Use value.id as key */}
              <img className={`strikeout-line ${value.status === 'notDone' ? '' : 'strikeout-active'}`} src={strikeout} />
              <img className={`strikeout-line2 ${value.status === 'notDone' ? '' : 'strikeout-active'}`} src={strikeout} />
              <div className={`list-div ${value.status === 'notDone' ? '' : 'checked'}`}>
                <p style={{ display: 'inline-block', marginLeft: '20px', marginTop: '-5px' }}>
                  {`${index + 1}. ${value.name}`}
                </p>
              </div>
              <div className="update">
                <a className={`edit-button ${value.status === 'notDone' ? '' : 'checked'}`} 
                   onClick={() => value.status === 'notDone' && handleEdit(value.name, value.id, value.status)}></a>
                <a className="delete-button" onClick={() => handleDelete(value.id)}></a>
                <a className={`check-button ${value.status === 'notDone' ? '' : 'checked'}`} 
                   onClick={() => value.status === 'notDone' && handleCheck(value.name, value.id)}></a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default GroceryList;
