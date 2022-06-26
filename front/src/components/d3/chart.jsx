import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import FlexBox from '@/components/FlexBox';
import styles from './svg.css';
import './chart-style.css'

import {
  select,
  csv,
  scaleLinear,
  max,
  scaleBand,
  axisLeft,
  axisBottom,
  format,
  selectAll,
} from 'd3';

const MARGINS = { top: 20, bottom: 40 }
let x
let y

const renderChart = (containerid, data, width, height)=>{
  const chart = d3.select(containerid)
  chart .selectAll('.bar')
        .data(data, d=>d.id)
        .enter()
        .append('rect')
        .classed('bar', true)
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d.value))
        .attr('x', d=>x(d.region))
        .attr('y', d=>y(d.value)-MARGINS.bottom)

  chart.selectAll('.label')
       .data(data, d=>d.id).enter().append('text').text(d=>d.value)
    .attr('x', d=>x(d.region) + x.bandwidth() / 2)
    .attr('y', d=>y(d.value) - MARGINS.bottom)
    .attr('text-anchor', 'middle')
    .classed('label', true)

  // chart.exit().remove()
  chart.selectAll('.bar').data(data, d=>d.id).exit().remove()
  chart.selectAll('.label').data(data, d=>d.id).exit().remove()
}


let g = null
let xAxisG = null
let yAxisG = null
const margin = {top:40, right: 20, bottom: 50, left: 100}
const renderChartI = (data) => {
  const svg = select("svg")
  // if xAxisG and yAxisG are appeneded every time, we need to remove it before updating
  // need to separate one-time logic (draw axes, append container elements, set height/width/etc)
  // from logic you want to run each time.
  // selectAll('.axis').remove();
  // selectAll('.bars').remove();
  const yValue = d => d.word
  const xValue = d => d.count

  const width = +svg.style('width').replace("px", "")
  const height = +svg.style('height').replace("px", "")
  const innerHeight = height - margin.bottom - margin.top
  const innerWidth = width - margin.left - margin.right
  console.log('w,h', width, height, innerWidth, innerHeight);
  const xScale = scaleLinear()
        .domain([0, max(data, xValue)])
        .range([0, innerWidth])

  const yScale = scaleBand()
        .domain(data.map(yValue))
        .range([0, innerHeight])
        .padding(0.1)

  if(g === null){
    g = svg.append('g')
                 .attr('transform', `translate(${margin.left}, ${margin.top})`)
  }

  const yAxis = axisLeft(yScale);

  if (yAxisG === null){
    yAxisG = g.append('g')
  }

  yAxisG.call(yAxis)
   .attr('class', 'axis')
   .selectAll('.domain, tick line')
   .remove()

  const xAxis = axisBottom(xScale)
        .tickSize(-innerHeight)

  if(xAxisG === null){
     xAxisG = g.append('g')
  }

  xAxisG.call(xAxis)
        .attr('class', 'axis')
        .attr('transform', `translate(0, ${innerHeight})`)
  xAxisG
    .select('.domain')
    .remove()

  // append text to xAxis
  xAxisG.append('text')
        .text('count')
        .attr('y', 60)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .attr('class', '.axis-label')

  // svg.selectAll('rect').data(data)

  console.log('datachanged');

  const bars = g.selectAll('rect').data(data, d=>d.word)
  const barsEnter = bars.enter()
  barsEnter
   .append('rect')
   .merge(bars)
   .attr('class', 'bars')
   .attr('y', d => yScale(yValue(d)))
   .attr('width', d => xScale(xValue(d)))
   .attr('height', yScale.bandwidth())

  bars.exit().remove()

  g.selectAll('.toptext').data([null]).enter().append('g').attr('class', 'toptext')
   .append('text')
   .text('Top x')
}

const renderChartII = (data) => {
  const svg = select("svg")
  const yValue = d => d.word
  const xValue = d => d.count

  const width = +svg.style('width').replace("px", "")
  const height = +svg.style('height').replace("px", "")
  const innerHeight = height - margin.bottom - margin.top
  const innerWidth = width - margin.left - margin.right

  const xScale = scaleLinear()
        .domain([0, max(data, xValue)])
        .range([0, innerWidth])

  const yScale = scaleBand()
        .domain(data.map(yValue))
        .range([0, innerHeight])
        .padding(0.1)

  const yAxis = axisLeft(yScale);
  const xAxis = axisBottom(xScale).tickSize(-innerHeight)

  const g = svg.selectAll('.container').data([null]);
  const gEnter = g
        .enter()
        .append('g')
        .attr('class', 'container');
  gEnter
    .merge(g)
    .attr(
      'transform',
      `translate(${margin.left},${margin.top})`
    );

  // const g = svg.append('g')
  //              .attr('transform', `translate(${margin.left}, ${margin.top})`)

  const yAxisG = g.select('.y-axis');
  const yAxisEnterG = gEnter.append('g').attr('class', 'y-axis')
  yAxisEnterG.merge(yAxisG).call(yAxis);

  // g.append('g').call(yAxis)
  //  .selectAll('.domain, tick line')
  //  .remove()
  yAxisG.selectAll('.domain, tick line').remove();

  const xAxisG = g.select('.x-axis');
  const xAxisEnter = gEnter
        .append('g')
  		.attr('class', 'x-axis')
  xAxisEnter.merge(xAxisG).call(xAxis)
    .attr('transform', `translate(0,${innerHeight})`);

  xAxisG.select('.domain').remove();

  // const xAxisG = g.append('g').call(xAxis)
  //                 .attr('transform', `translate(0, ${innerHeight})`)


  // append text to xAxis
  xAxisG.append('text')
        .text('count')
        .attr('y', 60)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .attr('class', 'axis-label')

  // svg.selectAll('rect').data(data)

  const xLabelG = xAxisG.select('.axis-label')
  const xLabelEnter = xAxisEnter
     .append('text')
    .attr('class', 'axis-label')
    .attr('y', 40)
    .attr('x', innerWidth / 2)
    .attr('fill', 'black')
  	.merge(xLabelG)
    .text('出现频次');

  // const bars = g.selectAll('rect').data(data)
  const bars = g.merge(gEnter).selectAll('rect').data(data)
  const barsEnter = bars.enter()
  barsEnter
   .append('rect')
   .merge(bars)
   .attr('y', d => yScale(yValue(d)))
   .attr('width', d => xScale(xValue(d)))
   .attr('height', yScale.bandwidth())

  // important!!
  // not barsEnter.exit().remove()
  bars.exit().remove()

  gEnter.append('text').text('Top x')
  // below cause 'text' being added after each rendering
  // g.append('text').text('Top x')
}

const BasicChart=(props)=>{
  const d3ContainRef = useRef(null)
  const {width, height, data} = props
  // console.log('basicchart:', width, height);

  // const cs = useStyles();

  useEffect(()=>{
    renderChartI(data)
  }, [data])

  return(
    <svg className={styles.svgContainer} >
      {/* <g ref={d3ContainRef} className={cs.root} /> */}
      <g ref={d3ContainRef} />
    </svg>
  )
}

BasicChart.propTypes={
  width: PropTypes.number,
  height: PropTypes.number,
}

// BasicChart.defaultProps = {
//   width: 600,
//   height: 400,
// }

export default BasicChart;
