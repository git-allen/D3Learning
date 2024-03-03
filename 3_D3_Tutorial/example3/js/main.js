const svg = d3.select('svg');

const circle = svg.append('circle')
    .attr('cx', 100)
    .attr('cy', 100) 
    .attr('fill', 'none')   
    .attr('stroke', 'green') 
    .attr('r', 60);

function updateCircle(radius) {
  circle.attr('r', radius);
}

// Event slider for input slider
d3.select('#radius-slider').on('input', function() {
  // Update visualization
  updateCircle(parseInt(this.value));

  // Update label
  d3.select('#radius-value').text(this.value);
});