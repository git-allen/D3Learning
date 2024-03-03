/**
 * Load data from CSV file asynchronously and visualize it
 */
d3.csv('data/experiment_data.csv')
  .then(data => {
    
    data.forEach(d => {
      d.trial = parseFloat(d.trial);
      d.accuracy = parseFloat(d.accuracy);
      d.category = 1;
    });

    console.log(data);
    const scatterplot = new Scatterplot({ parentElement: '#vis'}, data);
    scatterplot.updateVis();
  })
  .catch(error => console.error(error));