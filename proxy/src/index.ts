import express from "express";
import cors from "cors"
import { AddressInfo } from "net";

const port = 3001;

const app = express();

app.use(cors())

app.get("/", async (req, res) => {
  const steamRequest = await fetch(
    "http://steamcommunity.com/inventory/76561198196802546/730/2?l=english&count=5000"
  );
  const steamData = await steamRequest.json()

  res.send(steamData);
});

const listener = app.listen(port, () => {
  const { port } = listener.address() as AddressInfo;
  console.log(`Your app is listening to localhost:${port}`);
  console.log("Press ctrl + c to exit");
});
