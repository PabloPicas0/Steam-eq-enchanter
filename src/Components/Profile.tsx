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

  console.log(props);

  return (
    <main className="hero">
      <div>
        <a href="/steamProfile">
          <img alt="Steam avatar" />
        </a>
      </div>
      <h1>Profile Name</h1>
      <p>country</p>
      <p>account created</p>
      <p>last online</p>
      <p>isOnline</p>
    </main>
  );
}

export default Profile;
