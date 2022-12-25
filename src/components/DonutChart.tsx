import { defineComponent,ref, PropType, watch, computed, onMounted} from 'vue';
import {Donuttypes, Graphdatatype} from '../types/types';
import '../styles/donut.scss';
// import '../styles/areagraph.scss';
import numberMinification from '../types/common';

const d3 = require("d3");



const Donutchart = defineComponent({

    props:{
        donutProp:{
            required: true,
            type: Array as PropType<Donuttypes[]>
        },
        graphData: {
         type: Array as PropType<Graphdatatype[]>,
         required: true,
       }
    },

    
    setup(props){

        let responseHeaderData = ref<Donuttypes[]>([]);
        responseHeaderData.value = props.donutProp;
      //   console.log('this is res:', responseHeaderData);

        const piechartclassComputed = computed(()=>{
            return props.donutProp.map(x=> x.piechartclass);
        })

        let responseHeaderDataArea = ref<Graphdatatype[]>([]);
        responseHeaderDataArea.value = props.graphData;
        

        return {responseHeaderData, piechartclassComputed, responseHeaderDataArea}

    },
    data () {
      return {
        newGraphData: [] as Graphdatatype[]
      }
  },

    watch: {
         donutProp () {
            this.HeaderCall(this.donutProp)
         },
         graphData () {
            this.newGraphData = [...this.graphData]
            let newVal = JSON.parse(JSON.stringify(this.newGraphData))
            this.newGraphData = [...newVal]
            this.HeaderAreaCall(this.newGraphData)
         }
    },

    created () {
        this.HeaderCall(this.donutProp);

        this.newGraphData = [...this.graphData]
        let newVal = JSON.parse(JSON.stringify(this.newGraphData))
        this.newGraphData = [...newVal]
        this.HeaderAreaCall(this.newGraphData)
    },

    methods:{
        HeaderCall (responsedata : any) {
            this.responseHeaderData = [...responsedata];
            // console.log('this is:', this.responseHeaderData, responsedata)
            this.createDounut()
        },

        HeaderAreaCall (responsedata:any) {
         this.responseHeaderDataArea = [...responsedata]
         this.createArea()
        },

        getHeaderType (header:any) {
            if (header) {
               if (!Array.isArray(header)) {
                  return typeof header
               } else {
                  return 'array'
               }
            }
        },

        createArea () {
         //  import('d3').then((res) => {
         //   window.d3 = res
         setTimeout(() => {
              this.responseHeaderDataArea.forEach((item) => {
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
            var margin = {top: 0, right: 2, bottom: 3, left: 1}
            var width1 = parseInt(d3.select('.second').style('width'), 10) - 15
            var width = 220
            var height = 100
          
            var data = prop.graphdata
            
            var x = d3.scalePoint()
                    .domain(prop.xaxisdata)
                    .range([0, width])

            var y =  d3.scaleLinear()
                    .domain([0, maxrange + 5])
                    .range([height, 0])

            var xAxis = d3.axisBottom(x)
                       

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
                .attr('transform', 'translate(' + (margin.left) + ', ' + margin.top + ')')
              svg.append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0, ' + height + ')')
                .call(xAxis)
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
              
         },

        getUnit (unit:any) {
            if (unit) {
                return unit
            } else {
                return ''
            }
        },

        createDounut () {
    
            setTimeout(() => {
                this.responseHeaderData.forEach((item : Object) => {
                 this.donutchart(item)
              })
            }, 1000)
             
        },

        getTotalValue (total:any) {
            var formatComma = d3.format(".3s")
            var formatComma1 = d3.format(".2s")
            // var formatNumberComma = d3.format(".1s")
            if (typeof total === 'string' && total.search(",") >= 0) {
              total = total.replace(/,/g,'')
              total = parseFloat(total)
              if (total >= 1000) {
               total = formatComma1(total)
              }
              if (total >= 10000) {
                 total = formatComma(total)
              }
            } else if (Number(total) === total && total % 1 === 0 && total < 1000) {
               total = total + 0
            } else {
               total = parseFloat(total)
               if (total >= 1000) {
                  total = formatComma1(total)
               }
                 if (total >= 10000) {
                    total = formatComma(total)
                 }
            }
            return total
        },

        donutchart(propdata: Object) {
            // console.log('this is prop:', JSON.parse(JSON.stringify(propdata)))
            var prop = JSON.parse(JSON.stringify(propdata))
            var data = prop.chartdata
            let total = numberMinification(prop.meancount)
            var formatComma = d3.format(".3s")

            let totalname = prop.totalcount ? numberMinification(prop.totalcount) : 'Total'

            

            let countVal = false
            let totalVal = 0
            for (let index in data) {
               if (data[index]['count'] !== 0) {
                  countVal = true
               }
               let ab = data[index]['count']
               if (typeof ab === 'string' && ab.search(",") >= 0) {
                 ab = ab.replace(/,/g,'')
                 ab = parseFloat(ab)
               } else if (Number(ab) === ab && ab % 1 === 0 && ab < 1000) {
                  ab = ab + 0
               } else {
                  ab = parseFloat(ab)
               }
               totalVal += ab
            }

            for (let index1 in data) {
                let ab = data[index1]['count']
                if (typeof ab === 'string' && ab.search(",") >= 0) {
                  ab = ab.replace(/,/g,'')
                  ab = parseFloat(ab)
                } else if (Number(ab) === ab && ab % 1 === 0 && ab < 1000) {
                   ab = ab + 0
                } else {
                   ab = parseFloat(ab)
                }
               if ((ab / totalVal)*100 < 4) {
                  if (ab !== 0) {
                     data[index1]['count1'] = (totalVal * 4) / 100
                  } else {
                     data[index1]['count1'] = data[index1]['count']
                  }
               } else {
                  data[index1]['count1'] = data[index1]['count']
               }
            }

            let newData = [{count1: 1, count: 1, name: 'abc'}]
            let newPropColor = ['#F6F6F6']

            let color = countVal?d3.scaleOrdinal(prop.color):d3.scaleOrdinal(newPropColor)
            
            var w = d3.select('.centerbody').style('width') && (d3.select('.centerbody').style('width') !== '' || d3.select('.centerbody').style('width') !== null) ? parseInt(d3.select('.centerbody').style('width'), 10) : 250
            var h = 140
            var padding = 10
            var r = Math.min(w - padding, h - padding) / 2
            var oldsvg = d3.select('.' + prop.piechartclass)
            oldsvg.selectAll('*').remove()
            var vis = countVal ? d3.select('.' + prop.piechartclass).append('svg:svg').data([data]).attr('width', w).attr('height', h).append('svg:g').attr('transform', 'translate(' + w / 2 + ',' + h / 2 + ')'): d3.select('.' + prop.piechartclass).append('svg:svg').data([newData]).attr('width', w).attr('height', h).append('svg:g').attr('transform', 'translate(' + w / 2 + ',' + h / 2 + ')')

            var pie = d3.pie().startAngle(180).value(function (d:any) { if (d.count1) { let a = d.count1
                if (typeof a === 'string' && a.search(",") >= 0) {
                   a = a.replace(/,/g,'')
                }
                a= parseFloat(a)
                return a } return d.count1 })
                var arc = d3.arc()
                  .innerRadius(55).outerRadius(r)
                var arcs = vis.selectAll('g.slice').data(pie).enter().append('svg:g').attr('class', 'slice')
                arcs.append('svg:path')
                  .attr('fill', function (d:any, i:any) {
                    return color(i)
                  })
                  .attr('d', function (d:any) {
                     return arc(d)
                  })
                   .on('mouseenter', function (d:any) {
                      let b = d.data['count']
                      if (typeof b === 'string' && b.search(",") >= 0) {
                        b = b.replace(/,/g,'')
                        b = parseFloat(b)
                        if (b >= 1000) {
                          b = formatComma(b)
                        }
                      } else if (Number(b) === b && b % 1 === 0 && b < 1000) {
                         b = b + 0
                      } else {
                         b = parseFloat(b)
                         if (b >= 1000) {
                           b = formatComma(b)
                         }
                      }
                   if (countVal) {
                     //  console.log('count val', countVal, prop.hoverclass)
                       d3.selectAll('.'+prop.hoverclass[2]).remove()
                       d3.selectAll('.'+prop.hoverclass[3]).remove()
                   //  window.d3.select('text.valuetext1').remove();
                   //  window.d3.select('text.textvalue1').remove();
                    let arcOver = d3.arc()
                      .innerRadius(55).outerRadius(r + 4)
                    d3.select(d3.event.currentTarget) //this
                      .attr('stroke', 'white')
                      .transition()
                      .duration(500)
                      .attr('d', arcOver)
                      .attr('stroke-width', 0)
                      .style('cursor', 'pointer')
                    d3.select('.'+prop.hoverclass[0]).transition().style('opacity', 0)
                    d3.select('.'+prop.hoverclass[1]).transition().style('opacity', 0)
                  //   d3.select('.'+prop.hoverclass[0]).html(b).transition().duration(500).style('opacity', 1)
                  //   d3.select('.'+prop.hoverclass[1]).html(d.data['name']).transition().duration(500).style('opacity', 1)
                   }
                  })
                  .on('mouseout', function () {
                     if (countVal) {
                      d3.select('.'+prop.hoverclass[2]).remove()
                      d3.select('.'+prop.hoverclass[3]).remove()
                      d3.select(d3.event.currentTarget).transition()  //this
                      .duration(500)
                      .attr('d', arc)
                      .attr('stroke', 'none')
                    d3.select('.'+prop.hoverclass[0]).transition().style('opacity', 0)
                    d3.select('.'+prop.hoverclass[1]).transition().style('opacity', 0)
                  //   d3.select('.'+prop.hoverclass[0]).html(total).transition().duration(1500).style('opacity', 1)
                  //   d3.select('.'+prop.hoverclass[1]).html(totalname).transition().duration(1500).style('opacity', 1)
                    }
                  })
                arcs.append('text')
                  .attr('class', prop.hoverclass[0])
                  .attr('text-anchor', 'middle')
                  .attr('font-size', '1em')
                  .attr('y', -3)
                  .style('fill', '#1A1A1A')
                  .style('font-family', 'Roboto Bold')
                  .style('font-size', '18px')
                  .style('letter-spacing', 0)
                  .style('line-height', '23px')
                  .style('text-align', 'center')
                  .html('')
                arcs.append('text')
                  .attr('class', prop.hoverclass[1])
                  .attr('text-anchor', 'middle')
                  .attr('font-size', '1em')
                  .attr('y', 15)
                  .text('2')
                  .style('fill', '#7F8797')
                  .style('font-family', 'Roboto Medium')
                  .style('font-size', '12px')
                  .style('letter-spacing', 0)
                  .style('line-height', '15px')
                  .style('text-align', 'center')
                  .html('')
                arcs.append('text')
                  .attr('class', prop.hoverclass[0])
                  .attr('text-anchor', 'middle')
                  .attr('font-size', '1em')
                  .attr('y', -3)
                  .style('fill', prop.color[0])
                  .style('font-family', 'Roboto Bold')
                  .style('font-size', '15px')
                  .style('letter-spacing', 0)
                  .style('line-height', '23px')
                  .style('text-align', 'center')
                  .html(total)

               arcs.append('line')
                   .style("stroke", "#e7e7e7")
                   .attr("x1", -20)     
                   .attr("x2", 20) 
                   .attr("stroke-width", 2)    
                  
                arcs.append('text')
                  .attr('class', prop.hoverclass[1])
                  .attr('text-anchor', 'middle')
                  .attr('font-size', '1em')
                  .attr('y', 15)
                  .style('fill', '')
                  .style('font-family', 'Roboto Medium')
                  .style('font-size', '15px')
                  .style('letter-spacing', 0)
                  .style('line-height', '15px')
                  .html(totalname)

        }

    },

    

    render(){
          
        return (
           <div>
               <div class="flex-container">
               <div class="first">
                   {
                     this.responseHeaderData.map(item=>(
                       <div class="graph-row">
                            <div class="graph-col-12 graph-col-s-12 graph-col-lg-12">
                                { this.getHeaderType(item.headername) === 'string'?  <p class="head"><span class="headename">{item.headername}</span></p>:null}
                                   <hr class='hr-class'/>
                                    <p class="centerbody"><span class= {this.piechartclassComputed}></span></p>

                                    { item.type.toLowerCase() === 'type1'? 
                                    
                                      <div class="bottom" >
                                          <span id={this.newGraphData[0].areagraphid} ></span>
                                          <div style="float:left;width:31%; font-size: 13px;">Last Week</div>
                                          <div style="float:right;width:20%; font-size: 13px;">{numberMinification(item.footer.totalcenter)}</div>
                                      </div>
                                   :null}
                            </div>
                        </div>
                     ))
                   }
                  </div>

                </div>
           </div>
        ) ;
    }
})


export default Donutchart ;


