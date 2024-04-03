function ProfileSkeleton() {
  return (
    <section className="hero" style={{ display: "grid", placeItems: "center" }}>
      <div className="skeleton-rounded"></div>
      <h1 className="skeleton-rectangle"></h1>
      <p className="skeleton-rectangle"></p>
      <p className="skeleton-rectangle"></p>
    </section>
  );
}

export default ProfileSkeleton;
