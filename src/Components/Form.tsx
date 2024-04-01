import { useState } from "react";

import steam from "../assets/Steam.webp";

function Form(props: { setSteam64ID: React.Dispatch<React.SetStateAction<string>> }) {
  const { setSteam64ID } = props;

  const [input, setInput] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();
    setSteam64ID(input.replace(/\D/g, ""));
  }

  return (
    <form className="primary-form">
      <div className="form-image-wrapper">
        <a href="/">
          <img className="form-image" src={steam} />
        </a>
      </div>

      <input
        className="input-steamID"
        type="text"
        placeholder="Enter profile URL/SteamID"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <input type="submit" value={"Search"} className="submit-btn" onClick={handleSubmit} />
    </form>
  );
}

export default Form;
