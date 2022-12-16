import { db } from './fireBaseConnection';
//
import { doc, setDoc, collection, addDoc, getDoc } from 'firebase/firestore';

import './App.css';

import { useState } from 'react';
import { async } from '@firebase/util';

function App() {

  const [title, setTitle] = useState("");

  const [autor, setAutor] = useState("");


  //Anexando users
  //deixando uma funcao async, usando os import do firebase/ banco/ campos e o que cadastrar
  async function handleAdd() {

    //ID manual
    //   await setDoc(doc(db, "users", "12345", ""), {
    //     titulo: title,
    //     autor: autor,
    //   })

    //     // caso dê sucesso
    //     .then(() => {
    //     alert("Sucesso");
    //     setAutor('');
    //     setTile('');
    //     })
    //     // caso dê erro
    //     .catch((error) => {
    //       alert("Gerou Erro" + error);
    //     })
    // }


    //ID Automatica
    await addDoc(collection(db, "users"), {
      tituto: title,
      autor: autor,
    })
      //     // caso dê sucesso
      .then(() => {
        alert("Sucesso");
        setAutor('');
        setTitle('');
      })
      // caso dê erro
      .catch((error) => {
        alert("Gerou Erro" + error);
      })
  }


  //buscando users
  async function buscarUsers() {
    const userRef = doc(db, "users", "12345")

    await getDoc(userRef)
      .then((snapshot) => {
        setAutor(snapshot.data().autor)
        setTitle(snapshot.data().titulo)
        alert("Solicitacão feita com sucesso")
      })
      .catch((error) => {
        alert("não foi possivel" + error)
      })
  }

  return (
    <div>
      <h1>React + Fire </h1>

      <div className='container'>
        <label>Titulo:</label>
        <textarea
          type="text"
          placeholder='Digite o seu texto'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Autor:</label>
        <textarea
          type="text"
          placeholder='Autor do post'
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        />

        <button onClick={handleAdd}> cadastrar </button>

        <button onClick={buscarUsers}> Buscar Users </button>

      </div>
    </div>
  );
}

export default App; 
