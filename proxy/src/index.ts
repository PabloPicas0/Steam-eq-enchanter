import express from "express";
import cors from "cors";

import { AddressInfo } from "net";
import { LoginSession, EAuthTokenPlatformType } from "steam-session";

import { router as rootRouter } from "./Routers/root.js";
import { router as itemRouter } from "./Routers/item.js";

const app = express();

app.use(cors());
app.use(express.json());

const session = new LoginSession(EAuthTokenPlatformType.WebBrowser);
session.refreshToken = process.env.REFRESH_TOKEN;

export const webCookies = await session.getWebCookies();
// const ONE_DOLLAR_IN_POLISH_CURRENCY = await getCurrency("usd");

const steamCommunityCookie = webCookies.filter((cookie) => cookie.includes("Domain=steamcommunity.com"))[1];

// get steam cookie value needed for price history
const start = steamCommunityCookie.indexOf("=") + 1;
const end = steamCommunityCookie.indexOf(";");
export const cookieValue = steamCommunityCookie.slice(start, end);

app.use("/", rootRouter);
app.use("/market/item/:name", itemRouter);

const listener = app.listen(process.env.PORT || 3001, () => {
  const { port } = listener.address() as AddressInfo;
  console.log(`Your app is listening to http://localhost:${port}?id=76561198323329181`);
  console.log("Press ctrl + c to exit");
});
