class Scatterplot {

    /**
     * Class constructor with basic chart configuration
     * @param {Object}
     * @param {Array}
     */
    constructor(_config, _data) {
      this.config = {
        parentElement: _config.parentElement,
        containerWidth: 600,
        containerHeight: 400,
        margin: {top: 5, right: 5, bottom: 50, left: 50},
        tooltipPadding: 15,
        radius: 2,
        showBrush: _config.showBrush ? true : false,
        showToolTip: _config.showToolTip ? true : false
      }
      this.data = _data;
      this.initVis();
    }
    
    /**
     * We initialize scales/axes and append static elements, such as axis titles.
     */
    initVis() {
      let vis = this;
  
      // Calculate inner chart size. Margin specifies the space around the actual chart.
      vis.config.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
      vis.config.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;
  
      // Parent div container
      vis.container = d3.select(vis.config.parentElement);
  
      // Add Canvas layer
      /*
      vis.canvas = vis.container.append('canvas')
          .attr('class', 'vis-layer')
          .attr('width', vis.config.width)
          .attr('height', vis.config.height)
          .style('transform', `translate(${vis.config.margin.left}px,${vis.config.margin.top}px)`);
  
      vis.canvasContext = vis.canvas.node().getContext('2d');
      */
  
      // Add SVG layer
      vis.svg = vis.container.append('svg')
          .attr('class', 'vis-layer')
          .attr('width', vis.config.containerWidth + vis.config.margin.left + vis.config.margin.right)
          .attr('height', vis.config.containerHeight + vis.config.margin.top + vis.config.margin.bottom);
  
      // Append group element that will contain our actual chart 
      // and position it according to the given margin config
      vis.chart = vis.svg.append('g')
          .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);
  
      // Append empty x-axis group and move it to the bottom of the chart
      vis.xAxisG = vis.chart.append('g')
          .attr('class', 'axis x-axis')
          .attr('transform', `translate(0,${vis.config.height})`);
      
      // Append y-axis group
      vis.yAxisG = vis.chart.append('g')
          .attr('class', 'axis y-axis');
  
      // Initialize scales
      vis.colorScale = d3.scaleOrdinal(d3.schemeCategory10);
  
      vis.xScale = d3.scaleLinear()
          .range([0, vis.config.width]);
  
      vis.yScale = d3.scaleLinear()
          .range([vis.config.height, 0]);
      
      // Initialize axes
      vis.xAxis = d3.axisBottom(vis.xScale)
          .tickPadding(10);
  
      vis.yAxis = d3.axisLeft(vis.yScale)
          .tickPadding(10);
      
      vis.updateVis();

      if (this.config.showBrush) {
        let brush = d3.brush()
          .extent([[0, 0], [vis.config.width, vis.config.height]])
          .on("brush end", ev => this.brush_update(ev, vis));
        
        vis.chart.append("g")
          .attr('class', 'brush')
          .call(brush);
      }
    }
  
    /**
     * Prepare the data and scales before we render it.
     */
    updateVis() {
      let vis = this;
      
      // Set the scale input domains
      vis.xScale.domain(d3.extent(vis.data, d => d.x));
      vis.yScale.domain(d3.extent(vis.data, d => d.y));
      vis.colorScale.domain(d3.extent(vis.data, d => d.category));
  
      vis.renderVis();
    }
  
    /**
     * Bind data to visual elements.
     */
    renderVis() {
      let vis = this;
  
      // Clear canvas and draw points
      //vis.canvasContext.clearRect(0, 0, vis.config.width, vis.config.height);
      //vis.data.forEach(d => vis.renderPoint(d));


      this.circles = vis.chart
          .selectAll('.point')
          .data(vis.data, d => d)
        .join('circle')
          .attr('class', 'point')
          .attr('r', 4)
          .attr('cy', d => vis.yScale(d.y))
          .attr('cx', d => vis.xScale(d.x))
          .attr('fill', d => vis.colorScale(d.category))
          .attr('opacity', 0.05);

      if (this.config.showBrush) {
        this.selectedContainer = d3.select('.selected-container')
                  /*
          .style('width', `${this.config.containerWidth}px`)
          .style('height', `${this.config.containerHeight}px`);
          */

          .style('width', `${this.config.containerWidth + this.config.margin.left + this.config.margin.right}px`)
          .style('height', `${this.config.containerHeight + this.config.margin.top + this.config.margin.bottom}px`);
          
      }

      if (this.config.showToolTip) {
        this.circles.on('mouseover', (event,d) => {
          d3.select('#tooltip')
            .style('display', 'block')
            .style('left', (event.pageX + vis.config.tooltipPadding) + 'px')   
            .style('top', (event.pageY + vis.config.tooltipPadding) + 'px')
            .html(`
              <div class="tooltip-title">Point Summary</div>
              <div><i>${d.category}</i></div>
              <ul>
                <li>${d.x}</li>
                <li>${d.y}</li>
                <li>${d.category}</li>
              </ul>
            `);
        })
        .on('mouseleave', () => {
          d3.select('#tooltip').style('display', 'none');
        });
      }
      
      // Update the axes
      vis.xAxisG.call(vis.xAxis);
      vis.yAxisG.call(vis.yAxis);
    }

    brush_update(ev, vis) {
      if (ev.selection)
      {
        // relate pixel with original data coordinates
        let [[x0, y0], [x1, y1]] = ev.selection;
        x0 = vis.xScale.invert(x0);
        y0 = vis.yScale.invert(y0);
        x1 = vis.xScale.invert(x1);
        y1 = vis.yScale.invert(y1);
      
        console.log(`x0: ${x0}, y0: ${y0} - x1: ${x1}, y1: ${y1}`);
        // check what belongs within the scatterplot range
        let points = [];
        for (let i = 0; i < vis.data.length; i++) {
          let di = vis.data[i]
          if (di.x > x0 && di.y < y0 && di.x < x1 && di.y > y1) {
            points.push(di)
          }
        }
        vis.updateSelected(points)
      }
      else {
        vis.updateSelected([])
      }
    }

    updateSelected(points)
    {
      d3.selectAll('.selected-element').remove();

      d3.select('.selected-body')
        .selectAll('.selected-element')
        .data(points, d => d.id)
        .join(
          
          enter => enter
            .append('p')
            .attr('class', 'selected-element')
            .html(
              d => `<span class="selected-title">${d.x}/${d.y}</span>, ${d.category} }` 
            )
        ,
        
          update => update,
              
          exit => exit.remove()
      );
    }
  }