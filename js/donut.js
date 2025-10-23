// Donut Chart: Energy Share by Screen Type (All Sizes)
d3.csv("data/Ex5_TV_energy_Allsizes_byScreenType.csv").then(data => {
    data.forEach(d => d["Mean(Labelled energy consumption (kWh/year))"] = +d["Mean(Labelled energy consumption (kWh/year))"]);
  
    const container = d3.select("#donut").node();
    const width = container.getBoundingClientRect().width;
    const height = width * 0.6;
    const radius = Math.min(width, height) / 2 - 20;
  
    const svg = d3.select("#donut")
      .append("svg")
      .attr("viewBox", [0, 0, width, height])
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);
  
    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.Screen_Tech))
      .range(["#1a73e8", "#fbbc04", "#34a853"]);
  
    const pie = d3.pie()
      .value(d => d["Mean(Labelled energy consumption (kWh/year))"]);
  
    const arc = d3.arc().innerRadius(radius * 0.6).outerRadius(radius);
  
    const tooltip = d3.select("#donut").append("div").attr("class", "tooltip");
  
    svg.selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data.Screen_Tech))
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(100).style("opacity", 1);
        tooltip.html(`${d.data.Screen_Tech}<br>${d.data["Mean(Labelled energy consumption (kWh/year))"].toFixed(1)} kWh`)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", () => tooltip.transition().duration(200).style("opacity", 0));
  
    svg.selectAll("text")
      .data(pie(data))
      .enter()
      .append("text")
      .text(d => d.data.Screen_Tech)
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .style("text-anchor", "middle")
      .style("font-size", "12px");
  });
  