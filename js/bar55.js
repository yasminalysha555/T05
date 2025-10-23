d3.csv("data/Ex5_TV_energy_55inchtv_byScreenType.csv").then(data => {
    data.forEach(d => d.energy = +d.energy);
  
    const width = 800, height = 400, margin = { top: 30, right: 30, bottom: 70, left: 60 };
  
    const svg = d3.select("#bar")
      .append("svg")
      .attr("viewBox", [0, 0, width, height]);
  
    const x = d3.scaleBand()
      .domain(data.map(d => d.ScreenType))
      .range([margin.left, width - margin.right])
      .padding(0.2);
  
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.energy)])
      .nice()
      .range([height - margin.bottom, margin.top]);
  
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));
  
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  
    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => x(d.ScreenType))
      .attr("y", d => y(d.energy))
      .attr("height", d => y(0) - y(d.energy))
      .attr("width", x.bandwidth())
      .attr("fill", "#1a73e8");
  });
  