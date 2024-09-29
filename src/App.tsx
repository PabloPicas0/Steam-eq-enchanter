import "./App.css";

import Form from "./Components/Form";
import Profile from "./Components/Profile";
import Equipment from "./Components/Equipment";
import AsyncSuspense from "./Components/AsyncSuspense";

// TODO: Add correct sufix on other prices
function App() {
  return (
    <>
      <Form />

      <AsyncSuspense>
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
