import { useState } from "react";
import "./App.css";

import Form from "./Components/Form";
import Profile from "./Components/Profile";
import Equipment from "./Components/Equipment";
import AsyncSuspense from "./Components/AsyncSuspense";

import { UserModel } from "./models/UserModel";
import { EquipmentModel } from "./models/EquipmentModel";

function App() {
  const [items, setItems] = useState<(UserModel & EquipmentModel)[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const [profile, userItems] = items;

  return (
    <>
      <Form setItems={setItems} setPending={setPending} setError={setError} />

      <AsyncSuspense pending={pending} error={error} items={items.length}>
        <Profile profile={profile} />
        <Equipment items={userItems} />
      </AsyncSuspense>

      <footer>
        <p>This website is not a part of Valve official sites</p>
        <p>Created by Pablo</p>
      </footer>
    </>
  );
}

export default App;
