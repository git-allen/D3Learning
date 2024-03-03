d3.csv('data/cities_and_population.csv')
  .then(data => {
  	console.log('Data loading complete. Work with dataset.');
    console.log(data);
    const filteredData = data.filter(city => city.eu == "true");
    d3.select("body").append("p").text("Number of cities: " + filteredData.length);
    filteredData.forEach( (city) => {
      city.population = +city.population;
      city.x = +city.x;
      city.y = +city.y;
    });
    const svg = d3.select('body').append('svg')
                .attr('width', 700)
                .attr('height', 550);
    svg.selectAll('circle')
      .data(filteredData)
      .enter()
      .append('circle')
      .attr('fill', (d) => 'green')
      .attr('stroke', "black")
      .attr('r', (d) => {
              if (d.population < 1000000)
                  return 4
              else
                  return 8
          }
          )
      .attr('cy', (d) => d.y)
      .attr('cx', (d) => d.x);
    //<text x="260" y="25" fill="red">SVG Text</text>
    svg.selectAll('text')
      .data(filteredData)
      .enter()
      .append('text')
      .attr('class', 'city-label')
      .attr('y', (d) => d.y)
      .attr('x', (d) => d.x)
      .attr('opacity', (d) => {
        if (d.population >= 1000000)
            return 1
        else
            return 0
    })
      .text((d) => d.city);
    console.log(filteredData);
  })
  .catch(error => {
    console.error('Error loading the data');
  });

console.log('Do something else, without the data');