import { useEffect, useState } from "react";
import "./App.css";
import Form from "./Components/Form";

function App() {
  const [steam64ID, setSteam64ID] = useState("");
  const [items, setItems] = useState([]);


  return (
    <>
      <Form setSteam64ID={setSteam64ID} />
    </>
  );
}

export default App;
