class BarChart {

    constructor(_config, _data) {
        this.config = {
            parentElement: _config.parentElement,
            containerWidth: _config.containerWidth || 500,
            containerHeight: _config.containerHeight || 140,
            margin: _config.margin || {top: 5, right: 5, bottom: 20, left: 50}
      }
      this.data = _config;
  
      // Call a class function
      this.initVis();
    }
  
    initVis() {
        let vis = this;
        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

        vis.xScale = d3.scaleLinear()
		    .domain([0, d3.max(data, d => d.sales)])
            .range([0, vis.width]);

        vis.yScale = d3.scaleBand()
		    .domain(data.map(d => d.month))
            .range([0, vis.height])
            .paddingInner(0.15);

        vis.xAxis = d3.axisBottom(vis.xScale)
            .ticks(6)
            .tickSizeOuter(0);
    
        vis.yAxis = d3.axisLeft(vis.yScale)
            .tickSizeOuter(0);

        vis.svg = d3.select(vis.config.parentElement)
            .attr('width', vis.config.containerWidth)
            .attr('height', vis.config.containerHeight);

        vis.chart = vis.svg.append('g')
            .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);

        vis.xAxisG = vis.chart.append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', `translate(0,${vis.height})`)
            .call(xAxis);

        vis.yAxisG = vis.chart.append('g')
            .attr('class', 'axis y-axis')
            .call(yAxis);
    }
  
    renderVis() {
        let vis = this;

        vis.xValue = d => d.sales;
        vis.yValue = d => d.month;

        // Set the scale input domains
        vis.xScale.domain([0, d3.max(vis.data, vis.xValue)]);
        vis.yScale.domain(vis.data.map(vis.yValue));

        vis.renderVis();
    }

    updateVis() {
        let vis = this;

        // Add rectangles
        vis.chart.selectAll('.bar')
            .data(vis.data)
            .enter()
          .append('rect')
            .attr('class', 'bar')
            .attr('width', d => vis.xScale(vis.xValue(d.sales)))
            .attr('height', vis.yScale.bandwidth())
            .attr('y', d => vis.yScale(vis.yValue(d.month)))
            .attr('x', 0);
        
        // Update the axes because the underlying scales might have changed
        vis.xAxisG.call(vis.xAxis);
        vis.yAxisG.call(vis.yAxis);
    }
  }