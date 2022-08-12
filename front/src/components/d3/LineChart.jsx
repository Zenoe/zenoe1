import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const d3=require('d3');

const margin = {top:40, right: 20, bottom: 50, left: 100}

const renderLine = (data)=>{
  console.log('render data', data);
  if(data.length <=0) return
  const svg = d3.select('#linechart')
  const width = +svg.style('width').replace("px", "")
  const height = +svg.style('height').replace("px", "")
  const innerHeight = height - margin.bottom - margin.top
  const innerWidth = width - margin.left - margin.right

  const xScale = d3.scaleLinear().domain([0,data.length]).range([0,width])
  // const yScale = d3.scaleLinear().domain([0,d3.max(data, d=>d.value)]).range([height,0])
  const minV = d3.min(data, d=>d.value)
  const yScale = d3.scaleLinear().domain([0,d3.max(data, d=>d.value) - d3.min(data, d=>d.value)]).range([height,0])
  const lineGenerator = d3.line()
                          .x(function(d,i){return xScale(i)})
                          .y(function(d){return yScale(d.value-minV)})

  const  line = lineGenerator(data)
  const g = svg.append('g').attr("transform", "translate(20,20)")
    g.append('path')
    .attr('fill', 'none')
    .attr('stroke', '#999')
    .attr('d', line);

  const circles = g.selectAll('.circle').data(data)
  circles.enter()
   .append('circle')
   .attr('cx', (d,i)=>xScale(i))
   .attr('cy', d=>yScale(d.value-minV))
   .attr('r', 3)
   .attr('fill', 'none')
   .attr('stroke', '#999')
   .on('mouseover', d => {console.log(d.target.__data__)})

  // g.selectAll('.label').data(data).enter().append('text').text(d=>d.value)
  //  .attr('x', (d,i)=>xScale(i))
  //  .attr('y', d=>yScale(d.value-minV))

}

const LineChart=(props)=>{
  const testdata = [
    {value: 10},
    {value: 50},
    {value: 30},
    {value: 40},
    {value: 40},
    {value: 20},
    {value: 70},
    {value: 20},
    {value: 50}
  ]

  const {data} = props
  useEffect(()=>{
    renderLine(data)
  }, [data])

  return(
    <svg id='linechart' width='100%' height='100%'>
    </svg>
  )
}

LineChart.propTypes={
  width: PropTypes.number,
  height: PropTypes.number,
}

// LineChart.defaultProps = {
//   width: 1200,
//   height: 800,
// }

export default LineChart;
