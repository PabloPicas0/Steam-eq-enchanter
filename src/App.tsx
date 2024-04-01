import { useEffect, useState } from "react";
import "./App.css";

import Form from "./Components/Form";
import Profile from "./Components/Profile";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <>
      <Form setItems={setItems} />
      <Profile profile={items[0]}/>
    </>
  );
}

export default App;
