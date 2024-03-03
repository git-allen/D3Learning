
// Global objects
let data, scatterplot, barchart;
let difficultyFilter = [];


/**
 * Load data from CSV file asynchronously and render charts
 */
d3.csv('data/vancouver_trails.csv')
  .then(_data => {
    data = _data;
    data.forEach(d => {
      d.time = +d.time;
      d.distance = +d.distance;
    });

    // Initialize scales
    const colorScale = d3.scaleOrdinal()
        .range(['#d3eecd', '#7bc77e', '#2a8d46']) // light green to dark green
        .domain(['Easy','Intermediate','Difficult']);
    
    scatterplot = new Scatterplot({ 
      parentElement: '#scatterplot',
      colorScale: colorScale
    }, data);
    scatterplot.updateVis();

    barchart = new Barchart({
      parentElement: '#barchart',
      colorScale: colorScale
    }, data);
    barchart.updateVis();
  })
  .catch(error => console.error(error));


/**
 * Use bar chart as filter and update scatter plot accordingly
 */
function filterData() {
  if (difficultyFilter.length == 0) {
    scatterplot.data = data;
  } else {
    scatterplot.data = data.filter(d => difficultyFilter.includes(d.difficulty));
  }
  scatterplot.updateVis();
}