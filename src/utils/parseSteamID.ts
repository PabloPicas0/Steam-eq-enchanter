export function parseSteamId64(id: string) {
  return id.replace(/\D/g, "");
}

// Parsing from steamID32 to steamID64 is optained via this formula W=Z*2+V+Y
// See: https://developer.valvesoftware.com/wiki/SteamID
// For more details
export function parseSteamId32(id: string) {
  const steamID32 = id.split(":");
  const z = BigInt(steamID32[2]);
  const y = BigInt(steamID32[1]);
  const v = 76561197960265728n; // Number converted from hex 0x0110000100000000, see link above for more info

  const w = z * 2n + v + y;

  return w;
}
