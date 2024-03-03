

//Adding a DOM Element with D3
//d3.select("body").append("p").text("Hello World!");

//The alternative code of the example above without method chaining:
/*
const body = d3.select('body');
const p1 = body.append('p');
p1.text('Hello World!');
*/


/*
The `select()` method uses CSS selectors as input to grab page elements. It will return a reference to the first element in the DOM that matches the selector.

In our example we have used `d3.select('body')` to select the first DOM element that matches our CSS selector, `body`. Once an element is selected - and handed off to the next method in the chain - you can apply **operators**. These D3 operators allow you to get and set **properties**, **styles**, and **content** (and will again return the current selection).

Alternatively, if you need to select more than one element, use `selectAll()`. We will try it later in an example.

d3.select('body')
	.append('p')
	.text('Hello World!');
    */

//#4 Binding Data to Visual Elements
/*
const provinces = ['AB', 'BC', 'MB', 'NB', 'NL', 'NT', 'NS', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'];

const pSellectAll = d3.select('body').selectAll('p')
	.data(provinces)
	.enter()
	.append('p')
	.text('Array Element');
    */

//Dynamic Properties
/*
// Our preferred option: ES6 arrow function syntax
.text(d => d);

// Alternative: Traditional function syntax
.text( function(d) { return d; } );
const pDynamicProperties = d3.select('body').selectAll('p')
    .data(provinces)
    .enter()
    .append('p')
    .text(d => d);

*/

    //Example (1) - Add paragraphs and set properties*

const provinces = ['AB', 'BC', 'MB', 'NB', 'NL', 'NT', 'NS', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'];

// Append paragraphs and highlight one element
let p = d3.select('body').selectAll('p')
    .data(provinces)
    .enter()
  .append('p')
    .text(d => d)
    .attr('class', 'custom-paragraph')
    .style('font-weight', 'bold')
    .style('color', d => {
      if(d == 'BC')
        return 'blue';
      else
        return 'red';
    });

    //Example (2) - Add SVG rectangles and set properties*

    const numericData = [1, 2, 4, 8, 16];

    // Add <svg> element (drawing space)
    const svg = d3.select('body').append('svg')
        .attr('width', 300)
        .attr('height', 50);
    
    // Add rectangle
    svg.selectAll('rect')
        .data(numericData)
        .enter()
      .append('rect')
        .attr('fill', 'red')
        .attr('width', 50)
        .attr('height', 50)
        .attr('y', 0)
        .attr('x', (d, index) => index * 60);