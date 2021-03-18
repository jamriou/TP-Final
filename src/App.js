import { React, useState } from "react";
import "./App.css";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyClbsFSteY6vzftKMcKbssgvYjpc0IMP8w",
  authDomain: "w5-tpfinal-611b1.firebaseapp.com",
  projectId: "w5-tpfinal-611b1",
  storageBucket: "w5-tpfinal-611b1.appspot.com",
  messagingSenderId: "628664114527",
  appId: "1:628664114527:web:d6021d89b32b9c9c126aea",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

const login = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
};

const logout = () => {
  auth.signOut();
};

const ChatBox = () => {
  const inventaireCollection = firestore.collection("inventaire");
  const inventaireQuery = inventaireCollection;
  const [inventaire] = useCollection(inventaireQuery);

  const [name, setTextName] = useState("");
  const [price, setTextPrice] = useState("");
  const [stock, setTextStock] = useState("");
  const [nameSupprimer, setTextSupprimer] = useState("");
  const addItem = (e) => {
    e.preventDefault();

    if (name !== "" && price !== "" && stock !== "") {
      inventaireCollection.add({
        name: name,
        price: price,
        stock: stock,
      });
    }
    setTextName("");
    setTextPrice("");
    setTextStock("");
  };
  const supprimerItem = (e) => {
    e.preventDefault();

    if (nameSupprimer !== "") {
      inventaireCollection.doc(nameSupprimer).delete();
    }
    setTextSupprimer("");
  };

  return (
    <div>
      <main>
        {inventaire &&
          inventaire.docs.map((msg) => {
            return (
              <div class="border" key={msg.id}>
                <p>
                  <b>Item : </b>
                  {msg.get("name")}
                </p>
                <p>
                  <b>Prix : </b>
                  {msg.get("price")}
                </p>
                <p>
                  <b>Quantité : </b>
                  {msg.get("stock")}
                </p>
                <p>
                  <b>Id : </b>
                  {msg.id}
                </p>
              </div>
            );
          })}
      </main>
      <form class="border-form">
        <p>Nom de l'item :</p>
        <input
          value={name}
          onChange={(eventName) => setTextName(eventName.target.value)}
        />
        <p>Prix de l'item :</p>
        <input
          value={price}
          onChange={(eventPrice) => setTextPrice(eventPrice.target.value)}
        />
        <p>Quantité de l'item :</p>
        <input
          value={stock}
          onChange={(eventStock) => setTextStock(eventStock.target.value)}
        />
        <br></br>
        <br></br>
        <button
          class="button button2"
          onClick={(eventAdd) => addItem(eventAdd)}
        >
          Ajouter item!
        </button>
      </form>
      <form class="border-form">
        <p>Id de l'item à supprimer :</p>
        <input
          value={nameSupprimer}
          onChange={(eventName) => setTextSupprimer(eventName.target.value)}
        />
        <br></br>
        <br></br>
        <button
          class="button button2"
          onClick={(eventDelete) => supprimerItem(eventDelete)}
        >
          Supprimer l'item!
        </button>
      </form>
    </div>
  );
};

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <section>
        {user ? (
          <ChatBox />
        ) : (
          <button class="button button2" onClick={login}>
            Login
          </button>
        )}
        <button class="button button2" onClick={logout}>
          Logout
        </button>
      </section>
    </div>
  );
}

export default App;
