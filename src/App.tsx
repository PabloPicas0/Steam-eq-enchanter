import { useEffect, useState } from "react";
import "./App.css";

import Form from "./Components/Form";
import Profile from "./Components/Profile";
import Equipment from "./Components/Equipment";
import AsyncSuspense from "./Components/AsyncSuspense";

// TODO: add some form of data validation on server
// TODO: add parsing different steam urls
function App() {
  const [items, setItems] = useState([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <>
      <Form setItems={setItems} setPending={setPending} setError={setError} />

      <AsyncSuspense pending={pending} error={error} items={items.length}>
        <Profile profile={items[0]} />
        <Equipment items={items[1]} />
      </AsyncSuspense>
    </>
  );
}

export default App;
