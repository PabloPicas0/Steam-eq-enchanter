function EquipmentSkeleton() {
  return (
    <section className="items-container">
      <h2 className="skeleton-text" style={{ gridColumn: "1 / -1", placeSelf: "center" }}></h2>
      <div className="skeleton-rect" style={{ placeSelf: "center" }}></div>
      <div className="skeleton-rect" style={{ placeSelf: "center" }}></div>
      <div className="skeleton-rect" style={{ placeSelf: "center" }}></div>
      <div className="skeleton-rect" style={{ placeSelf: "center" }}></div>
    </section>
  );
}

export default EquipmentSkeleton;
