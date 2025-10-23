// Line Chart: Electricity Spot Prices over Time
d3.csv("data/Ex5_ARE_Spot_Prices.csv").then(data => {
  data.forEach(d => {
    d.Year = +d.Year;
    d["Average Price (notTas-Snowy)"] = +d["Average Price (notTas-Snowy)"];
  });

  const container = d3.select("#line").node();
  const width = container.getBoundingClientRect().width;
  const height = width * 0.5;
  const margin = { top: 40, right: 60, bottom: 50, left: 70 };

  const svg = d3.select("#line")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

  // Scales
  const x = d3.scaleLinear()
    .domain(d3.extent(data, d => d.Year))
    .range([margin.left, width - margin.right]);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d["Average Price (notTas-Snowy)"])])
    .nice()
    .range([height - margin.bottom, margin.top]);

  // Line generator
  const line = d3.line()
    .x(d => x(d.Year))
    .y(d => y(d["Average Price (notTas-Snowy)"]))
    .curve(d3.curveMonotoneX);

  // Draw line
  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#e91e63")
    .attr("stroke-width", 2)
    .attr("d", line);

  // Axes
  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickFormat(d3.format("d")));

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  // Labels
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - 10)
    .attr("text-anchor", "middle")
    .text("Year");

  svg.append("text")
    .attr("x", -height / 2)
    .attr("y", 20)
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .text("Price ($/MWh)");
});

  