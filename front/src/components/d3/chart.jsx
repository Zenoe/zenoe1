import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import FlexBox from '@/components/FlexBox';
import List from '@material-ui/core/List';
import {makeStyles } from '@material-ui/core/styles';

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
} from 'd3';

const useStyles = makeStyles((theme)=>({
  root: {
    // fill: 'orange'
      "&>.bar":{
      fill: '#4f009e'
    },
    "&>.label":{
      fill: '#4f009e'
    }
  },
  List: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    '&>li':{
      border: '1px solid',
      borderRadius: '4px',
      marginBottom: '4px',
      padding: '4px',
    }
  },

}));

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


const margin = {top:40, right: 20, bottom: 50, left: 100}
const renderChartI = (data) => {
  const svg = select("svg")
  // const width = svg.attr('width')
  // const height = svg.attr('height')
  const yValue = d => d.word
  const xValue = d => d.count

  const width = +svg.style('width').replace("px", "")
  const height = +svg.style('height').replace("px", "")
  const innerHeight = height - margin.bottom - margin.top
  const innerWidth = width - margin.left - margin.right
  console.log('w,h', width, height, innerWidth, innerHeight);

  const g = svg.append('g')
               .attr('transform', `translate(${margin.left}, ${margin.top})`)
  const xScale = scaleLinear()
        .domain([0, max(data, xValue)])
        .range([0, innerWidth])

  const yScale = scaleBand()
        .domain(data.map(yValue))
        .range([0, innerHeight])
        .padding(0.1)

  const yAxis = axisLeft(yScale);
  // yAxis(g.append('g'))
  g.append('g').call(yAxis)
   .selectAll('.domain, tick line')
   .remove()

  const xAxis = axisBottom(xScale)
        .tickSize(-innerHeight)

  const xAxisG = g.append('g').call(xAxis)
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

  const bars = g.selectAll('rect').data(data)
  bars
   .enter()
   .append('rect')
   .attr('y', d => yScale(yValue(d)))
   .attr('width', d => xScale(xValue(d)))
   .attr('height', yScale.bandwidth())

  g.append('text')
   .text('Top x')
}
const renderChartII = (data) => {
  const svg = select("svg")
  // const width = svg.attr('width')
  // const height = svg.attr('height')
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

  const yAxis = axisLeft(yScale);
  const xAxis = axisBottom(xScale).tickSize(-innerHeight)
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


var DUMMY_DATA = [
    {id: 'd1' , region: 'usa', value: 40},
    {id: 'd2' , region: 'india', value: 30},
    {id: 'd3' , region: 'china', value: 50},
    {id: 'd4' , region: 'germany', value: 60},
  ];

let selectedData = DUMMY_DATA
let unselectedIds = []
const renderDataItem = (containerid, chartContainerid,  data, width, height )=>{
  const listItems = d3.select(containerid)
                      .selectAll('li')
                      .data(data)
                      .enter()
                      .append('li')
  listItems.append('span').text(d=>d.region)
  listItems.append('input').attr('type', 'checkbox').attr('checked', true)
           .on('change', ( e, d )=>{
             if(unselectedIds.indexOf(d.id) === -1){
               unselectedIds.push(d.id)
             }else{
               unselectedIds = unselectedIds.filter(id=>id !== d.id)
             }
             selectedData = DUMMY_DATA.filter(dd=>unselectedIds.indexOf(dd.id) === -1)
             renderChart(chartContainerid, selectedData, width, height)
           })
}

const BasicChart=(props)=>{
  const d3ContainRef = useRef(null)
  const {width, height, data} = props
  // console.log('basicchart:', width, height);

  const cs = useStyles();

  useEffect(()=>{
    renderChartII(data)
    // render(d3ContainRef.current, DUMMY_DATA, ( width-40 ) / 2, height)
  }, [data])

  // useEffect(()=>{
  //   renderDataItem(d3ContainRef1.current, d3ContainRef.current, DUMMY_DATA, width, height)
  // }, [width, height])


  return(
    <svg className={styles.svgContainer} >
        <g ref={d3ContainRef} className={cs.root} />
      </svg>
    // <FlexBox>
    //   <div width='50%' height='100%'>
    //     <List ref={d3ContainRef1} className={cs.List} />
    //   </div>
    // </FlexBox>
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
