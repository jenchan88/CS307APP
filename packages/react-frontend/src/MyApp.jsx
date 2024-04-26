// src/MyApp.jsx
import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]); 
  // function updateList(person) {
  //   setCharacters([...characters, person]);
  // }

  // function removeOneCharacter(index) {
  //   const updated = characters.filter((character, i) => {
  //     return i !== index;
  //   });
  //   setCharacters(updated);
  // }

  function removeOneCharacter(index) {
    const charID = characters[index]._id
    fetch(`http://localhost:8000/users/${charID}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.status === 204) {
        setCharacters(characters.filter(character => character._id !== charID));

      } else if (response.status === 404) {
        throw new Error('User not found');
      } else {
        throw new Error('Failed to delete user');
      }
    })
    .catch(error => {
      if (error instanceof SyntaxError) {
        console.log('User deleted successfully');
        setCharacters(characters.filter(character => character._id !== charID));
      } else {
        console.error('Error deleting user:', error);
      }
    });
  }

  

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  function updateList(person) { 
    postUser(person)
      .then((res) => res.json())
      .then((json) => 
        setCharacters([...characters, json]))
      .catch((error) => {
        console.log(error);
      });
  }




  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json))
      .catch((error) => { console.log(error); });
  }, [] );
  
  return (
    <div className="container">
      <Table 
        characterData={characters} 
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList}/>
    </div>
    
  );

}



export default MyApp;
