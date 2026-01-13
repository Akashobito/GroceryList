import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
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
  const [groceryList, setGroceryList] = useState([
    { "id": "21ddd3e7-ea52-4756-9a71-03d5a028df8b",
      "name": "Chicken 5kg",
      "status": "notDone"},
    { "id": "21ddd3e7-ea52-4756-9a71-03d5a028df8b",
      "name": "Chicken 5kg2",
      "status": "notDone"}]);

  const [isAutoscroll, setIsAutoscroll] = useState(true);   //to controll the autoscroll because when submit and checkout, both are scrolling
  // const [listRef,setListRef] = useState({});

  const ref = useRef(null);


  // async function getGroceryList() {
  //   const response = await axios.get('http://localhost:3000/groceryList');
  //   setGroceryList(response.data);
  // }

  // useEffect(() => {
  //   getGroceryList();
  // }, [])

  useEffect(() => {
    if (ref.current && isAutoscroll) {
      // console.log(ref.current);
      const listRef = ref.current;
      // console.log(listRef.scrollHeight);
      listRef.scrollTop = listRef.scrollHeight;
    }
  }, [groceryList]);


  const handleInput = (event) => {
    // console.log(event.target.value.charAt(0).toUpperCase())
    setInputText(event.target.value);
  }

  const handleEnter = (event) => {
    // console.log(event.key)
    if (event.key === 'Enter') {
      handleSubmit();
    }
  }

  const handleSubmit = async () => {
    if (inputText) {
      setIsAutoscroll(true);
      // console.log(inputText);
      const body = {
        id: crypto.randomUUID(),
        name: inputText.charAt(0).toUpperCase() + inputText.slice(1).toLowerCase(),
        status: 'notDone'
      }

      setGroceryList([...groceryList,body]);

      localStorage.setItem('groceryList',JSON.stringify(body));
      // await axios.post('http://localhost:3000/groceryList', body);
      // console.log(groceryList);
      setInputText('');
      // getGroceryList();
    }
  }

  const handleEdit = async (name, id, status) => {
    setIsAutoscroll(false)
    // console.log('edit');
    const updateValue = prompt('Enter the value', name);
    // console.log(updateValue);
    const body = {
      // name: updateValue
      status: status,
      name: updateValue === null ? name : updateValue //this is for validation if we write name: updatevalue , if the value is null it still runs 
    }
    // await axios.put(`http://localhost:3000/groceryList/${id}`, body);
    // getGroceryList();
  }

  const handleDelete = async (index) => {
    console.log(index)
    // console.log(groceryList[index]);
    groceryList.splice(index,1);
    setIsAutoscroll(false);
    // console.log('delete');
    // await axios.delete(`http://localhost:3000/groceryList/${id}`);
    // getGroceryList()
  }

  const handleCheck = async (name, id) => {
    setIsAutoscroll(false);
    // console.log('checked');
    const body = {
      name: name,
      status: 'done'
    }
    await axios.put(`http://localhost:3000/groceryList/${id}`, body);
    getGroceryList();
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
        <a className="submit-button"
          onClick={handleSubmit} />

        <div ref={ref} className="listed-item">
          {groceryList.map((value, index) => {
            return (
              <div key={index} className={`item-container `}>
                <img className={`strikeout-line ${value.status === 'notDone' ? '' : 'strikeout-active'}`} src={strikeout} />
                <img className={`strikeout-line2 ${value.status === 'notDone' ? '' : 'strikeout-active'}`} src={strikeout} />
                <div className={`list-div ${value.status === 'notDone' ? '' : 'checked'}`}>
                  {/* {console.log(value.id)} */}
                  <p style={{ display: 'inline-block', marginLeft: '20px', marginTop: '-5px' }}>{`${index + 1}. ${value.name}`}</p>
                </div>
                <div className="update">
                  <a className={`edit-button ${value.status === 'notDone' ? '' : 'checked'}`} onClick={() => { if (value.status === 'notDone') { handleEdit(value.name, value.id, value.status) } }}></a>
                  <a className="delete-button" onClick={() => { handleDelete(index) }}></a>
                  <a className={`check-button ${value.status === 'notDone' ? '' : 'checked'}`} onClick={() => { if (value.status === 'notDone') { handleCheck(value.name, value.id) } }}></a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default GroceryList