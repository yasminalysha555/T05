d3.csv("data/Ex5_TV_energy_Allsizes_byScreenType.csv").then(data => {
    data.forEach(d => d.energy = +d.energy);
  
    const width = 400, height = 400, radius = Math.min(width, height) / 2;
  
    const svg = d3.select("#donut")
      .append("svg")
      .attr("viewBox", [0, 0, width, height])
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);
  
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const pie = d3.pie().value(d => d.energy);
    const arc = d3.arc().innerRadius(100).outerRadius(radius);
  
    svg.selectAll("path")
      .data(pie(data))
      .enter().append("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data.ScreenType))
      .attr("stroke", "white")
      .style("stroke-width", "2px");
  });
  
