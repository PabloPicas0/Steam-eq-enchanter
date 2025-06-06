import { UserInfoType } from "../models/UserInfoModel.js";

async function getUserInfo(key: string, id: string) {
  const user = await fetch(
    `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${key}&steamids=${id}`
  );

  if (!user.ok) throw new Error(`Unable to fetch user. Reason: ${user.statusText}, Code: ${user.status}`);

  const userData: UserInfoType = await user.json();

  return userData;
}

export default getUserInfo;
