import "./App.css";

import Form from "./Components/Form";
import Profile from "./Components/Profile";
import AsyncSuspense from "./Components/AsyncSuspense";
import Mode from "./Components/Mode";

// TODO: Better error handling when fetching price data
function App() {
  return (
    <>
      <Form />

      <AsyncSuspense>
        <Profile />
        <Mode />
      </AsyncSuspense>

      <footer>
        <p>This website is not a part of Valve official sites</p>
        <p>Created by Pablo</p>
      </footer>
    </>
  );
}

export default App;
