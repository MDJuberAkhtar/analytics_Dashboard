import { defineComponent,ref, PropType, watch, computed, onMounted} from 'vue';
import {Graphdatatype, SelectMtype} from '../types/types';
import '../styles/areagraph.scss';

import Dropdown from './DropDown';

const d3 = require("d3");



const Areagraph = defineComponent({

    props:{
        graphData: {
            type: Array as PropType<Graphdatatype[]>,
            required: true,
        }
       
    },

    components:{
      Dropdown
  },

    
    setup(props){

        let responseHeaderData = ref<Graphdatatype[]>([]);
        responseHeaderData.value = props.graphData;
        
        return {responseHeaderData}

    },
    
    emits:[ 'itemSelected', 'dropdownGraphData'],

    data () {
        return {
          newGraphData: [] as Graphdatatype[],
          radioVal: [] as any,
          dataSet:[],
          mDropdownProperty: {} 
          // as SelectMtype
        }
    },

    watch: {
        graphData () {
            this.newGraphData = [...this.graphData]
            let newVal = JSON.parse(JSON.stringify(this.newGraphData))
            this.newGraphData = [...newVal]
            this.HeaderCall(this.newGraphData)
            this.radioVal = []
            console.log('new:', this.newGraphData)
            if (this.newGraphData[0]['radioData']) {
              for (let i in this.newGraphData[0]['radioData']) {
                this.radioVal.push(this.newGraphData[0]['radioData'][i]['value'])
              }
            }
        }
    },

    created () {
        this.newGraphData = [...this.graphData]
        let newVal = JSON.parse(JSON.stringify(this.newGraphData))
        this.newGraphData = [...newVal]
        this.HeaderCall(this.newGraphData)
       
        if (this.newGraphData[0]['radioData']) {
            for(const [key, value] of Object.entries(this.newGraphData[0]['radioData'])){
                this.radioVal.push(this.newGraphData[0]['radioData'][key]['value'])
            }
        }


        this.mDropdownProperty = {
            defaultProperty: {
              width: '120px'
            },
            inputProperty: {
              width: '120px',
              height: '28px'
            },
           listProperty: {
              width: '120px',
              textAlign: 'left',
              margin: '0'
            }
        }
        
    },

    computed: {
        getRadioData () {
          return this.newGraphData[0]['radioData']
        },
        getDropdownData () {
          return this.newGraphData[0]['dropDownData']
          
        },
        graphVal () {
            return this.graphData[0].graphdata[0]
         },
         anotherGraphVal () {
            return this.graphData[0].graphdata
         }
    },

    mounted () {
        // window.addEventListener('resize', this.resizeGraph)
    },

    methods:{

        HeaderCall (responsedata:any) {
            this.responseHeaderData = [...responsedata]
            this.createArea()
        },

        setData (data:any) {
            this.$emit('dropdownGraphData', data)
            if(data.name === 'Daily'){
                this.dataSet=[]
                this.dataSet = data.name
                // this.createArea()
             }
              if(data.name === 'Last Week'){
                this.dataSet=[]
                this.dataSet = data.name
                // this.createArea()
             }
              if(data.name === 'Last Month'){
                this.dataSet=[]
                this.dataSet = data.name
                // this.createArea()
             }
             if(data.name === 'Last Year'){
                this.dataSet=[]
                this.dataSet = data.name
                // this.createArea()
             }
        },

        resizeGraph () {
            var margin = {top: 20, right: 60, bottom: 30, left: 30}
            var width1 = parseInt(d3.select('.second').style('width'), 10) - 15
            var width = width1 - margin.left - margin.right
            let chart = d3.select(`#${this.responseHeaderData[0].areagraphid}svgimg`)
            var targetWidth = width + margin.left + margin.right
            var height = 230 - margin.top - margin.bottom
            var targetHeight = height + margin.top + margin.bottom
            chart.attr("width", targetWidth)
            chart.attr("height", targetHeight)
        },

        radiobuttun (data:any, index:any) {
            let radioflag = 0
            for (let i in this.radioVal) {
              if (this.radioVal[i]) {
                radioflag += 1
              }
            }
            if (data.value) {
              if (radioflag > 1) {
                this.newGraphData[0]['radioData'][index]['value'] = false
                this.radioVal.splice(index, 1, false)
                  d3.select(`.${this.newGraphData[0].areagraphid}line${index}`)
                .style('opacity', function () {
                  return 0
                })
                d3.select(`.${this.newGraphData[0].areagraphid}dots${index}`).selectAll(`.${this.newGraphData[0].dotlass}`)
                  .attr('r', 0)
              }
            } else {
              this.newGraphData[0]['radioData'][index]['value'] = true
              this.radioVal.splice(index, 1, true)
                d3.select(`.${this.newGraphData[0].areagraphid}line${index}`)
                .style('opacity', function () {
                  return 1.4
                })
                d3.select(`.${this.newGraphData[0].areagraphid}dots${index}`).selectAll(`.${this.newGraphData[0].dotlass}`)
                  .attr('r', 3.5)
            }
        },

        getRadioDataValue (index:any) {
            return this.newGraphData[0]['radioData'][index]['value']
        },

        createArea () {
            //  import('d3').then((res) => {
            //   window.d3 = res
            setTimeout(() => {
                 this.responseHeaderData.forEach((item) => {
                 this.areagraph(item)
              })
            }, 1000)
           
            // })
        },

        areagraph (prop:any) {

            // ******************* create new timestamp and axis value according to the dropdown ************
            var oldsvg = d3.select('#' + prop.areagraphid)
            oldsvg.selectAll('*').remove()
              
            var maxrange = prop.maxrange
            var color = prop.color
            var formatData = d3.format(".1s")
            var formatDataValue = d3.format(".2s")
            var margin = {top: 25, right: 60, bottom: 30, left: 20}
            var width1 = parseInt(d3.select('.second').style('width'), 10) - 15
            var width = width1 - margin.left - margin.right
            var height = 370
          
            var data = prop.graphdata
            
            var x = d3.scalePoint()
                    .domain(prop.xaxisdata)
                    .range([0, width])

            var y =  d3.scaleLinear()
                    .domain([0, maxrange + 5])
                    .range([height, 0])

            var xAxis = d3.axisBottom(x)
                        .ticks(7)
                        .tickSize(-height)
                        .tickPadding(10)

            var yAxis = d3.axisLeft(y)
                    .ticks(5)
                    .tickPadding(10)
                    .tickFormat(function (d:any) {
                    if ((d / 10000) >= 1) {
                      d = formatDataValue(d)
                      return d
                    }else if((d/1000)>=1){
                      d = formatData(d)
                      return d
                    }
                     return d;
                    })
                    .tickSize(-width)
    
           //********************************************************/
            var div = d3.select('body').append('div')
                .attr('class', prop.areagraphid)
                .style('opacity', 0)
           // *********************************************************
           // Generate our SVG object
           // *********************************************************
           
              var svg = d3.select('#' + prop.areagraphid).append('svg')
                .attr('id', `${prop.areagraphid}svgimg`)
                .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
                .attr('perserveAspectRatio', 'xMinYMid')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', 'translate(' + (margin.left+10) + ', ' + margin.top + ')')
              svg.append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0, ' + height + ')')
                .call(xAxis)
              svg.append('g')
                .attr('class', 'y axis')
                .call(yAxis)
              svg.append('clipPath')
                .attr('id', prop.clippathid)
                .append('rect')
                .attr('width', width)
                .attr('height', height)
        
              // *********************************************************
              // Create D3 area object and draw data on our SVG object
              // *********************************************************
              var line = d3.area()
                .curve(d3.curveCardinal)
                .x(function (d:any) {
                     return x(d.index) 
                     })
                .y1(function (d:any) {
                     return y(d.count) 
                     })
                .y0(y(0))
              svg.selectAll('.'+ prop.areagraphid +'line0', '.'+ prop.areagraphid +'line1', '.'+ prop.areagraphid +'line2', '.'+ prop.areagraphid +'line3')
                .data(data)
                .enter()
                .append('path')
                .attr('class', function (d:any, i:any) {
                  return prop.areagraphid +'line' + [i]
                })
                .style('fill', function (d:any, i:any) { return color[i] })
                .style('fill-opacity', 0.1)
                .attr('clip-path', 'url(#' + prop.clippathid + ')')
                .attr('stroke', function (d:any, i:any) {
                  return color[i % color.length]
                })
                .attr('stroke-opacity', 'none')
                .attr('d', function (d:any) {
                  return line(d)
                })
                
              // ************************************************************
              // Draw points on SVG object based on the data given
              // ************************************************************
              var points = svg.selectAll('.'+ prop.areagraphid +'dots0', '.'+ prop.areagraphid +'dots1', '.'+ prop.areagraphid +'dots2', '.'+ prop.areagraphid +'dots3')
                .data(data)
                .enter()
                .append('g')
                .attr('class', function (d:any, i:any) {
                  return prop.areagraphid +'dots' + [i]
                })
                .attr('clip-path', 'url(#' + prop.clippathid + ')')
              points.selectAll('.' + prop.dotlass)
                .data(function (d:any, index:any) {
                  var a: any[] = []
                  d.forEach(function (point:any) {
                    a.push({'index': index, 'point': point})
                  })
                  //console.log('a', JSON.stringify(a))
                  return a
                })
                .enter()
                .append('circle')
                .attr('class', prop.dotlass)
                .attr('r', 3.5)
                .attr('fill', function (d:any) {
                  return color[d.index % color.length]
                })
                .attr('transform', function (d:any) {
                  return 'translate(' + x(d['point']['index']) + ',' + y(d['point']['count']) + ')'
                })
                .style('stroke', 'white')
                .style('stroke-width', 1.5)
                .style('cursor', 'pointer')
                .on('mouseover', function ( d:any) {
                  d3.select(d3.event.currentTarget).style('cursor', 'pointer')
                  div.transition()
                    .duration(200)
                    .style('opacity', 0.9)
                    .style("background",color[d.index%color.length])
                  div.html('<p>' + parseInt(d.point.count) + '</p>')
                    .style('left', (d3.event.pageX) + 'px')
                    .style('top', (d3.event.pageY - 28) + 'px')
                })
                .on('mouseout', function () {
                  d3.select(d3.event.currentTarget).style('cursor', 'default')
                  div.transition()
                    .style('opacity', 0.0)
                    .style('background', 'yellow')
                  div.html('')
                })
        }
        

    },

    

    render(){
      console.log('cons:', this.getDropdownData)
        return (
           <div class={["graph-col-6 graph-col-s-6 graph-col-lg-6 second", this.radioVal.length ? '': 'pad-top']}>
               {this.radioVal.length ? 
                  <div class="secondrow">
                      {this.getRadioData.map((i:any, index:any)=>(
                          <div class="secondrow-wrapper">
                              <div class="secondrowcol" onClick={() => this.radiobuttun(i, index)}>
                                   <input type="radio" class="radio-check-data" name={i['name']} value={this.getRadioDataValue(index)} data-waschecked="false"  />
                                   <label for="login1for" class={["login1level", i['color'], this.radioVal[index] ? 'selected': '']} id="login1id">{i['name']}</label>
                                </div>
                          </div>
                      ))}
                  </div>
                :null}
                <span id={this.newGraphData[0].areagraphid} class="graph-form"></span>
                <div class="graph-row formrowstyle">
                  <div class="dropdown-wrapper colstyle">

                     {this.getDropdownData.map((i:any, index:any)=>(
                       <div class="dropdown-col">
                          <label class="graph-label">{i.label} </label>
                          <Dropdown class="drop-wrap-graph" selected={i.selected} itemList={i.itemlist} mSelectProperty={this.mDropdownProperty} placeholder={i.label} onItemSelected={this.setData}/>
                       </div>
                     ))}
                       
                  </div>
                </div> 
           </div>
        ) ;
  }
})


export default Areagraph ;

