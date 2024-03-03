const svg = d3.select('body').append('svg')
.attr('width', 500)
.attr('height', 500);

const sandwiches = [
    { name: "Thesis", price: 7.95, size: "large" },
    { name: "Dissertation", price: 8.95, size: "large" },
    { name: "Highlander", price: 6.50, size: "small" },
    { name: "Just Tuna", price: 6.50, size: "small" },
    { name: "So-La", price: 7.95, size: "large" },
    { name: "Special", price: 12.50, size: "small" }
];

//<circle cx="85" cy="25" r="25" fill="green" />
svg.selectAll('circle')
.data(sandwiches)
.enter()
.append('circle')
.attr('fill', (d) => {
    if (d.price < 7)
        return 'green'
    else
        return 'red'
})
.attr('stroke', "black")
.attr('r', (d) => {
        if (d.size == "large")
            return 25
        else
            return 15
    }
    )
.attr('cy', 50)
.attr('cx', (d, index) => (index+1) * 60);

d3.csv('data/sandwiches.csv')
  .then(data => {
  	console.log('Data loading complete. Work with dataset.');
    console.log(data);
  })
  .catch(error => {
    console.error('Error loading the data');
  });

console.log('Do something else, without the data');