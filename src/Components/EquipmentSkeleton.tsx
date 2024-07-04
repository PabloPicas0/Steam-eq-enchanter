function EquipmentSkeleton() {
  return (
    <section className="items-container">
      <h2
        className="skeleton-text"
        style={{ gridColumn: "1 / -1", placeSelf: "center", height: "30px", borderRadius: "1.5rem" }}></h2>
      <h2
        className="skeleton-text"
        style={{ gridColumn: "1 / -1", placeSelf: "center", height: "30px", borderRadius: "1.5rem", marginBottom: "0.1rem" }}></h2>
      <h2
        className="skeleton-text"
        style={{ gridColumn: "1 / -1", placeSelf: "center", height: "36px", width: "230px" }}></h2>

        {[...new Array(4)].map((_, idx) => {
          return <div className="skeleton-rect" style={{ placeSelf: "center", height: "273px", width: "429px" }}></div>
        })}
    </section>
  );
}

export default EquipmentSkeleton;
