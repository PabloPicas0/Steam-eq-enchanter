type PropTypes = {
  profile: {
    response: {
      players: {
        steamid: string;
        communityvisibilitystate: number;
        profilestate: number;
        personaname: string;
        commentpermission: number;
        profileurl: string;
        avatar: string;
        avatarmedium: string;
        avatarfull: string;
        avatarhash: string;
        lastlogoff: number;
        personastate: number;
        realname: string;
        primaryclanid: string;
        timecreated: number;
        personastateflags: number;
        loccountrycode: string;
        locstatecode: string;
      }[];
    };
  };
};

function Profile(props: PropTypes) {
  const { profile } = props;
  const { avatarfull, personaname, personastate, profileurl, timecreated } = profile.response.players[0];

  const accountCreated = new Date(timecreated * 1000).toLocaleDateString();

  return (
    <main className="hero">
      <div>
        <a href={profileurl} className="steam-avatar-link">
          <img
            src={avatarfull}
            alt="Steam avatar"
            className="steam-avatar"
            style={{ border: `2px solid ${personastate > 0 ? "rgb(87, 203, 222)" : "gray"}` }}
          />
        </a>
      </div>
      <h1 className="person-name">{personaname}</h1>
      <p className="account-crated">Account Created: {accountCreated}</p>
    </main>
  );
}

export default Profile;
