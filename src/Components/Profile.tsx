import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector ";
import { isEquipmentMode } from "../Store/Slices/itemsFromMarketSlice";

function Profile() {
  const profile = useAppSelector((state) => state.profile.items[0]);

  const { avatarfull, personaname, personastate, profileurl, timecreated, communityvisibilitystate } =
    profile.response.players[0];

  const accountCreated = new Date(timecreated * 1000).toLocaleDateString();
  const dispatch = useAppDispatch();

  return (
    <section className="hero">
      <div>
        <a href={profileurl} className="steam-avatar-link" target="_blank">
          <img
            src={avatarfull}
            alt="Steam avatar"
            className="steam-avatar"
            style={{ border: `2px solid ${personastate > 0 ? "rgb(87, 203, 222)" : "gray"}` }}
          />
        </a>
      </div>

      <h1 className="person-name">{personaname}</h1>

      <p className="account-crated">
        Account Created: <span className="bold-font">{accountCreated}</span>
      </p>

      <p className="account-crated">
        Account status:{" "}
        <span className="bold-font" style={{ color: communityvisibilitystate === 1 ? "red" : "green" }}>
          {communityvisibilitystate === 1 ? "Private" : "Public"}
        </span>
      </p>

      <p className="account-crated">Search from</p>

      <div style={{ display: "flex", gap: 15, justifyContent: "center" }}>
        <button style={{ borderRadius: 0 }} onClick={() => dispatch(isEquipmentMode(true))}>
          Equipment
        </button>

        <button style={{ borderRadius: 0 }} onClick={() => dispatch(isEquipmentMode(false))}>
          Market
        </button>
      </div>
    </section>
  );
}

export default Profile;
