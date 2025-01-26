import "./App.css";

import Form from "./Components/Form";
import Profile from "./Components/Profile";
import AsyncSuspense from "./Components/AsyncSuspense";
import Mode from "./Components/Mode";
import ScrollToTop from "./Components/ScrollToTop";

// TODO: Better error handling when fetching price data
// TODO: Functionality to reset saved price or crop ammount of prices to be saved in localstorage
function App() {
  const currentYear = new Date().getFullYear();
  
  return (
    <>
      <Form />

      <AsyncSuspense>
        <Profile />
        <Mode />
      </AsyncSuspense>

      <ScrollToTop />

      <footer>
        <p>Created by Pablo 2024-{currentYear}</p>
      </footer>
    </>
  );
}

export default App;
