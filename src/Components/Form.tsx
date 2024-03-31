import { useState } from "react";

function Form() {
  const [input, setInput] = useState("");

  return (
    <form className="primary-form">
      <input
        className="input-steamID"
        type="text"
        name="steamID"
        placeholder="Enter profile URL/SteamID"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <input type="submit" value={"Search"} className="submit-btn" />
    </form>
  );
}

export default Form;
