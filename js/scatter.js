d3.csv("data/Ex5_TV_energy.csv").then(data => {
    data.forEach(d => {
      d.energy = +d.energy;
      d.star_rating = +d.star_rating;
    });
  
    const width = 800, height = 400, margin = 50;
  
    const svg = d3.select("#scatter")
      .append("svg")
      .attr("viewBox", [0, 0, width, height]);
  
    const x = d3.scaleLinear()
      .domain(d3.extent(data, d => d.star_rating))
      .range([margin, width - margin]);
  
    const y = d3.scaleLinear()
      .domain(d3.extent(data, d => d.energy))
      .range([height - margin, margin]);
  
    svg.append("g")
      .attr("transform", `translate(0,${height - margin})`)
      .call(d3.axisBottom(x));
  
    svg.append("g")
      .attr("transform", `translate(${margin},0)`)
      .call(d3.axisLeft(y));
  
    svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.star_rating))
      .attr("cy", d => y(d.energy))
      .attr("r", 4)
      .attr("fill", "#1a73e8")
      .attr("opacity", 0.7);
  });
  