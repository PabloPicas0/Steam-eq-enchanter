import { UserInfoType } from "../models/UserInfoModel.js";

async function getUserInfo(key: string, id: string) {
    const user = await fetch(
      `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${key}&steamids=${id}`
    );

    const userData: UserInfoType = await user.json()

    return userData;
}

export default getUserInfo