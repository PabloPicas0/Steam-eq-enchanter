import { useEffect, useState } from "react";
import "./App.css";

import Form from "./Components/Form";
import Profile from "./Components/Profile";
import ProfileSkeleton from "./Components/ProfileSkeleton";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <>
      <Form setItems={setItems} />
      {items.length ? <Profile profile={items[0]} /> : <ProfileSkeleton />}
    </>
  );
}

export default App;
