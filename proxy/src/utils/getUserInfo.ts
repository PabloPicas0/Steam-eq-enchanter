import { UserInfoType } from "../models/UserInfoModel.js";

async function getUserInfo(userToFetch: string) {
    const user = await fetch(userToFetch);

    const userData: UserInfoType = await user.json()

    return userData;
}

export default getUserInfo