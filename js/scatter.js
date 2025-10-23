// Scatter Plot: Energy vs Star Rating
d3.csv("data/Ex5_TV_energy.csv").then(data => {
    // Clean and convert numeric fields
    data.forEach(d => {
      d.energy_consumpt = +d.energy_consumpt;
      d.star2 = +d.star2;
    });
  
    const container = d3.select("#scatter").node();
    const width = container.getBoundingClientRect().width;
    const height = width * 0.6;
    const margin = { top: 40, right: 40, bottom: 60, left: 70 };
  
    const svg = d3.select("#scatter")
      .append("svg")
      .attr("viewBox", [0, 0, width, height]);
  
    // Scales
    const x = d3.scaleLinear()
      .domain(d3.extent(data, d => d.star2))
      .nice()
      .range([margin.left, width - margin.right]);
  
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.energy_consumpt)])
      .nice()
      .range([height - margin.bottom, margin.top]);
  
    // Axes
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));
  
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  
    // Tooltip
    const tooltip = d3.select("#scatter")
      .append("div")
      .attr("class", "tooltip");
  
    // Points
    svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.star2))
      .attr("cy", d => y(d.energy_consumpt))
      .attr("r", 3)
      .attr("fill", "#1a73e8")
      .attr("opacity", 0.7)
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(100).style("opacity", 1);
        tooltip.html(`⭐ ${d.star2} Stars<br>⚡ ${d.energy_consumpt} kWh`)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", () => tooltip.transition().duration(200).style("opacity", 0));
  
    // Labels
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height - 15)
      .attr("text-anchor", "middle")
      .text("Star Rating (Efficiency)");
  
    svg.append("text")
      .attr("x", -height / 2)
      .attr("y", 20)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .text("Energy Consumption (kWh/year)");
  });
  