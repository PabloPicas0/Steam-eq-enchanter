import { useAppSelector } from "../hooks/useAppSelector ";

function Profile() {
  const profile = useAppSelector((state) => state.profile.items[0]);

  const { avatarfull, personaname, personastate, profileurl, timecreated, communityvisibilitystate } =
    profile.response.players[0];

  const accountCreated = new Date(timecreated * 1000).toLocaleDateString();

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
    </section>
  );
}

export default Profile;
