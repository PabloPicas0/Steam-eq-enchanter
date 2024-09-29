import "./App.css";

import Form from "./Components/Form";
import Profile from "./Components/Profile";
import Equipment from "./Components/Equipment";
import AsyncSuspense from "./Components/AsyncSuspense";

import { useAppSelector } from "./hooks/useAppSelector ";

// TODO: Add correct sufix on other prices
function App() {
  const { items, error, pending } = useAppSelector((state) => state.profile);

  return (
    <>
      <Form />

      <AsyncSuspense pending={pending} error={error} items={items.length}>
        <Profile />
        <Equipment />
      </AsyncSuspense>

      <footer>
        <p>This website is not a part of Valve official sites</p>
        <p>Created by Pablo</p>
      </footer>
    </>
  );
}

export default App;
