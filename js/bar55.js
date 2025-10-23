// ===================================================================
// BAR55.JS
// Visualises average annual energy use (kWh) by screen technology
// for 55-inch televisions.
// Data source: Ex5_TV_energy_55inchtv_byScreenType.csv
// ===================================================================

d3.csv("data/Ex5_TV_energy_55inchtv_byScreenType.csv").then(data => {
    // Convert numeric field
    data.forEach(d => {
      d["Mean(Labelled energy consumption (kWh/year))"] =
        +d["Mean(Labelled energy consumption (kWh/year))"];
    });
  
    // --- Responsive sizing ---
    const container = d3.select("#bar").node();
    const width = container.getBoundingClientRect().width;
    const height = width * 0.5;
    const margin = { top: 40, right: 30, bottom: 70, left: 70 };
  
    const svg = d3
      .select("#bar")
      .append("svg")
      .attr("viewBox", [0, 0, width, height]);
  
    // --- Scales ---
    const x = d3
      .scaleBand()
      .domain(data.map(d => d.Screen_Tech))
      .range([margin.left, width - margin.right])
      .padding(0.3);
  
    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, d => d["Mean(Labelled energy consumption (kWh/year))"]),
      ])
      .nice()
      .range([height - margin.bottom, margin.top]);
  
    const color = d3
      .scaleOrdinal()
      .domain(data.map(d => d.Screen_Tech))
      .range(["#1a73e8", "#fbbc04", "#34a853"]);
  
    // --- Tooltip ---
    const tooltip = d3.select("#bar").append("div").attr("class", "tooltip");
  
    // --- Bars ---
    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => x(d.Screen_Tech))
      .attr("y", d => y(d["Mean(Labelled energy consumption (kWh/year))"]))
      .attr("height", d => y(0) - y(d["Mean(Labelled energy consumption (kWh/year))"]))
      .attr("width", x.bandwidth())
      .attr("fill", d => color(d.Screen_Tech))
      .attr("opacity", 0.85)
      // Tooltip behaviour
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(100).style("opacity", 1);
        tooltip
          .html(
            `<b>${d.Screen_Tech}</b><br>${d["Mean(Labelled energy consumption (kWh/year))"].toFixed(
              1
            )} kWh/yr`
          )
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", () => tooltip.transition().duration(200).style("opacity", 0));
  
    // --- Axes ---
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));
  
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  
    // --- Axis labels ---
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - 15)
      .attr("text-anchor", "middle")
      .text("Screen Technology");
  
    svg
      .append("text")
      .attr("x", -height / 2)
      .attr("y", 20)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .text("Mean Energy Consumption (kWh/year)");
  });
  