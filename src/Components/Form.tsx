import { useState } from "react";
import "../styles/Form.css";

import steam from "../assets/Steam.webp";
import { parseSteamId32, parseSteamId64 } from "../utils/parseSteamID";

import { EquipmentModel } from "../models/EquipmentModel";
import { UserModel } from "../models/UserModel";
import { CurrencyTableModel } from "../models/CurrencyModel";

function Form(props: {
  setItems: React.Dispatch<React.SetStateAction<(UserModel & EquipmentModel)[]>>;
  setPending: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrencies: React.Dispatch<React.SetStateAction<CurrencyTableModel>>;
}) {
  const { setItems, setPending, setError, setCurrencies } = props;

  const [input, setInput] = useState("76561198199821373");

  async function handleSubmit(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();

    if (input === "") return;

    const steam64ID = /STEAM_/g.test(input) ? parseSteamId32(input) : parseSteamId64(input);
    const url = "https://api.nbp.pl/api/exchangerates/tables/a/";
    const headers = {
      headers: { Accept: "application/json" },
    };

    setPending(true);
    setItems([]);
    setCurrencies([])

    const [proxyResponse, currenciesResponse] = await Promise.all([
      fetch(`/api?id=${steam64ID}`),
      fetch(url, headers),
    ]);

    if (!proxyResponse.ok || !currenciesResponse.ok) {
      setPending(false);
      setError(true);

      return;
    }

    const [proxyData, currenciesData]: [(UserModel & EquipmentModel)[], CurrencyTableModel] =
      await Promise.all([proxyResponse.json(), currenciesResponse.json()]);

    setItems(proxyData);
    setCurrencies(currenciesData);
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
