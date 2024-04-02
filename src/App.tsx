import { useEffect, useState } from "react";
import "./App.css";

import Form from "./Components/Form";
import Profile from "./Components/Profile";
import ProfileSkeleton from "./Components/ProfileSkeleton";

function App() {
  const [items, setItems] = useState([]);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <>
      <Form setItems={setItems} setPending={setPending} />
      {pending ? <ProfileSkeleton /> : null}
      {items.length ? <Profile profile={items[0]} /> : null}
    </>
  );
}

export default App;
