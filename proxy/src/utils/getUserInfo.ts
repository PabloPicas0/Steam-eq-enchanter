async function getUserInfo(userToFetch: string) {
    const user = await fetch(userToFetch);
    const userData = await user.json()

    return userData;
}

export default getUserInfo