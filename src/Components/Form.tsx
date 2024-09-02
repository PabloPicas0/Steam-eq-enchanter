import { useState } from "react";
import "../styles/Form.css";

import steam from "../assets/Steam.webp";
import { parseSteamId32, parseSteamId64 } from "../utils/parseSteamID";

import { EquipmentModel } from "../models/EquipmentModel";
import { UserModel } from "../models/UserModel";

function Form(props: {
  setItems: React.Dispatch<React.SetStateAction<(UserModel & EquipmentModel)[]>>;
  setPending: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { setItems, setPending, setError } = props;

  const [input, setInput] = useState("76561198199821373");

  async function handleSubmit(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();

    if (input === "") return;

    const steam64ID = /STEAM_/g.test(input) ? parseSteamId32(input) : parseSteamId64(input);

    setPending(true);
    setItems([]);

    const proxyResponse = await fetch(`https://steam-eq-ench-serv.glitch.me?id=${steam64ID}`);

    if (!proxyResponse.ok) {
      setPending(false);
      setError(true);

      return;
    }

    const prxyData = await proxyResponse.json();

    setItems(prxyData);
    setPending(false);
    setError(false);
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
