function EquipmentSkeleton() {
  return (
    <section className="items-skeleton-container">
      <h2
        className="skeleton-text"
        style={{ gridColumn: "1 / -1", placeSelf: "center", height: "30px", borderRadius: "1.5rem" }}></h2>
      <h2
        className="skeleton-text"
        style={{
          gridColumn: "1 / -1",
          placeSelf: "center",
          height: "30px",
          borderRadius: "1.5rem",
          marginBottom: "0.1rem",
        }}></h2>
      <h2
        className="skeleton-text"
        style={{ gridColumn: "1 / -1", placeSelf: "center", height: "36px", width: "230px" }}></h2>

      {[...new Array(5)].map((_, idx) => {
        return (
          <div
            key={idx * 429 * Math.random()}
            className="skeleton-rect"
            style={{ placeSelf: "center", height: "273px", width: "100%", maxWidth: "430px" }}></div>
        );
      })}
    </section>
  );
}

export default EquipmentSkeleton;
