import { useState } from "react";

import steam from "../assets/Steam.webp";

function Form(props: {
  setItems: React.Dispatch<React.SetStateAction<never[]>>;
  setPending: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { setItems, setPending, setError } = props;

  const [input, setInput] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();

    if (input === "") return;

    const steam64ID = input.replace(/\D/g, "");

    setPending(true);
    setItems([]);

    const proxyResponse = await fetch(`/api?id=${steam64ID}`);

    if (!proxyResponse.ok) {
      setPending(false);
      setError(true);

      return
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
        placeholder="Enter profile URL/SteamID64"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <input type="submit" value={"Search"} className="submit-btn" onClick={handleSubmit} />
    </form>
  );
}

export default Form;
