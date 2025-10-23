d3.csv("data/Ex5_ARE_Spot_Prices.csv").then(data => {
    data.forEach(d => {
      d.Year = +d.Year;
      d.Average = +d.Average;
    });
  
    const width = 800, height = 400, margin = { top: 30, right: 30, bottom: 40, left: 60 };
  
    const svg = d3.select("#line")
      .append("svg")
      .attr("viewBox", [0, 0, width, height]);
  
    const x = d3.scaleLinear()
      .domain(d3.extent(data, d => d.Year))
      .range([margin.left, width - margin.right]);
  
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.Average)])
      .nice()
      .range([height - margin.bottom, margin.top]);
  
    const line = d3.line()
      .x(d => x(d.Year))
      .y(d => y(d.Average));
  
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(d3.format("d")));
  
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#e91e63")
      .attr("stroke-width", 2)
      .attr("d", line);
  });
  