<div
id="graph"
className="graph"
  style={{
    display: "flex",
    flexDirection: "column",
  }}

>
<h2>Graph</h2>
<div
  className="graph-internal"
  style={{
    display: "flex",
    flexDirection: "column",
  }}
>
  <div className="graph-small-card" style={{
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridTemplateRows: "repeat(2, 1fr)",
  gap: "20px",
  width: "500px",
  height: "500px",
}}>
    {/* <img src={Graph} className="graph-img" alt="calories" /> */}
    {/* <canvas id="caloriesChart"></canvas> */}
    <canvas
      id="caloriesChart"
      className="chart-container"
      style={{
        height: "400px",
      }}
    ></canvas>
  </div>
  <div className="graph-small-card">
    {/* <img src={Graph} className="graph-img" alt="calories" /> */}
    <canvas
      id="heartRateChart"
      className="chart-container"
      style={{
        height: "400px",
      }}
    ></canvas>
  </div>
  <div className="graph-small-card">
    {/* <img src={Graph} className="graph-img" alt="calories" /> */}
    <canvas
      id="sleepDurationChart"
      className="chart-container"
      style={{
        height: "400px",
      }}
    ></canvas>
  </div>
  <div className="graph-small-card">
    {/* <img src={Graph} className="graph-img" alt="calories" /> */}
  </div>
</div>
</div>