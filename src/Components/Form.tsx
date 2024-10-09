import { useState } from "react";
import "../styles/Form.css";

import steam from "../assets/Steam.webp";

import { loadProfile } from "../Store/Thunks/loadProfileThunk";
import { useAppDispatch } from "../hooks/useAppDispatch";

function Form() {
  const [input, setInput] = useState("76561198199821373");

  const dispatch = useAppDispatch();

  function handleSubmit(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();

    if (input === "") return;

    dispatch(loadProfile(input));
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
        placeholder="SteamID64 / SteamID32"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <input type="submit" value={"Search"} className="submit-btn" onClick={handleSubmit} />
    </form>
  );
}

export default Form;
