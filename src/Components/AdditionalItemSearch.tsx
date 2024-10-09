import { useState } from "react";

function AdditionalItemSearch() {
  const [input, setInput] = useState("");

  function addAdditionalItem() {
    const inp = input.split("/");
    const itemName = inp[inp.length - 1];
    console.log(itemName);
  }

  return (
    <div style={{ display: "grid", maxWidth: "50%", margin: "0 auto", color: "white" }}>
      <label htmlFor="additional-item">Search additional item</label>
      <input
        type="text"
        className="input-steamID"
        id="additional-item"
        placeholder="Search item"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button style={{marginTop: "0.5rem", borderRadius: "0"}} onClick={addAdditionalItem}>Search</button>
    </div>
  );
}

export default AdditionalItemSearch;
