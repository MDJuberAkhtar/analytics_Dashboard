import { defineComponent,ref, PropType, watch, computed, onMounted} from 'vue';
import {Leftboxtype,Boxheadertype, Numberheadertype} from '../types/types';
import '../styles/leftbox.scss';


const d3 = require("d3");



const Leftboxchart = defineComponent({

    props:{
        boxProp: {
            type: Array as PropType<Leftboxtype[]>,
            required: true,
          },
          // leftHeaderArray: {
          //   type: Array as PropType<Boxheadertype[]>,
          //   required: true,
          // },
          // rightHeaderArray: {
          //   type: Array as PropType<Boxheadertype[]>,
          //   required: true,
          // },
          boxNumber: {
            type: Array
          }
      
    },

    
    setup(props){
        let val = []
       if (Array.isArray(props.boxProp)) {
         for (let i in props.boxProp) {
           val.push(props.boxProp[i])
         }
       } else if (typeof props.boxProp === 'object') {
         val.push(props.boxProp)
       }
       const responseBodyData = [...val];

       let boxNumberProp = props.boxNumber
       boxNumberProp = JSON.parse(JSON.stringify(boxNumberProp));

       let someVariable = ref()

       
    
       return {responseBodyData, boxNumberProp, someVariable}


    },

    watch: {
        boxProp () {
            let val = []
            if (Array.isArray(this.responseBodyData)) {
              for (let i in this.responseBodyData) {
                val.push(this.responseBodyData[i])
              }
            } else if (typeof this.responseBodyData === 'object') {
            val.push(this.responseBodyData)
            }
            this.responseBodyData = [...val]
          
        }
    },

    created () {
        // this.boxNumberProp = this.boxNumber

        if (this.boxProp) {
            let val = []
            if (Array.isArray(this.boxProp)) {
              for (let i in this.boxProp) {
                val.push(this.boxProp[i])
              }
            } else if (typeof this.boxProp === 'object') {
              val.push(this.boxProp)
            }
            let newVal = JSON.parse(JSON.stringify(val))
            this.responseBodyData = [...newVal]
        }
        // this.boxNumberProp = JSON.parse(JSON.stringify(this.boxNumberProp))
        // console.log('thhis :', this.responseBodyData, this.boxNumberProp)
        
      
    },

    methods:{

        getResponseData (val1:  string|number|any , val2: keyof Leftboxtype) {

          if(this.responseBodyData[0]) {

            for(const [key, value] of Object.entries(this.responseBodyData[0])) {

              if(val1.toString() == key){
                return value[val2]
              }
            }

          }
        },

        getResponseDataColor (val1:  string|number|any , val2: keyof Leftboxtype, val3: string|number|any) {

          if(this.responseBodyData[0]) {

            for(const [key, value] of Object.entries(this.responseBodyData[0])) {

              if(val1.toString() == key){
                return value[val2][val3]
              }
            }

          }
        },

        getResponseBoxCount (val1:  string|number|any) {

          if(this.responseBodyData[0]) {

            for(const [key, value] of Object.entries(this.responseBodyData[0])) {

              if(val1.toString() == key) {
                 return value['blockdataname']
              }

            }

          }
        },

        getResponseCount (val1:  string|number|any) {

          if(this.responseBodyData[0]) {

            for(const [key, value] of Object.entries(this.responseBodyData[0])) {

              if(val1.toString() == key) {
                
                 return value['blockdataname'].length
              }

            }

          }
        },

       
        // setData (data: keyof Leftboxtype) {
        //     this.boxNumberProp.splice(0, 1, data.id)
        // },
        // setDownData (data) {
        //     this.boxNumberProp.splice(1, 1, data.id)
        // },

        getBlockDataName (val1:  string|number|any, val2: string|number|any) {

          if(this.responseBodyData[0]) {

            for(const [key, value] of Object.entries(this.responseBodyData[0])) {

              if(val1.toString() == key){
                return value['blockdataname'][val2]['name']
                // return value[val2]
              } else {
                return ''
              }
            }

          }
            // if (this.responseBodyData[0][val1]['blockdataname'][val2]['name']) {
            //   return this.responseBodyData[0][val1]['blockdataname'][val2]['name']
            // } else {
            //   return ''
            // }
        },

        getBlockDataValue (val1:  string|number|any, val2: string|number|any) {
          
          if(this.responseBodyData[0]) {
            var formatComma = d3.format(".3s")

            for(const [key, value] of Object.entries(this.responseBodyData[0])) {

              if(val1.toString() == key){
  
                let total = value['blockdataname'][val2]['value'];
                if (typeof total === 'string' && total.search(",") >= 0) {
                    total = total.replace(/,/g,'')
                    total = parseFloat(total)
                    total = formatComma(total)
                } else if (Number(total) === total && total % 1 === 0 && total < 1000) {
                    total 
                } else {
                    total = parseFloat(total)
                    total = formatComma(total)
                }
                return total

                
                 
              } 
            }

          }
        }
       

    },

    

    render(){
           
        return (
           <div>
             { (this.boxNumberProp && this.boxNumberProp.length >1) ? 
             <div class="graph-col-6 graph-col-s-6 graph-col-lg-6 second">
           
               {this.boxNumberProp.map((item, index)=>(
                 <div>
                    <div class="graph-row graph-header-row">
                      <div class="graph-left-header"><span class= {["lefthead graph-left-head",  this.getResponseData(item, 'leftheaderstyleclass')]}  >{this.getResponseData(item, 'leftheadername')}</span></div>
                      <div class="header-right"><span class="righthead1">{this.getResponseData(item, 'totalname')}</span><span class= {['righthead3', this.getResponseData(item, 'leftheaderstyleclass')]} >{this.getResponseData(item, 'preunit')}</span><span class= {['righthead', this.getResponseData(item, 'leftheaderstyleclass')]} >{this.getResponseData(item, 'totalcount')}</span> <span class="righthead2" >{this.getResponseData(item, 'postunit')}</span></div>
                   </div>
                 
                   {this.getResponseCount(item) == 5 ?
                   <div>
                   <div class="graph-row graph-limit-col-wrapper-1">
                      <div class="graph-limit-col">
                           <div class="card-span"><span class="cardtext">{this.getBlockDataName(item, 0)}</span><div class="card-block-value"><span class="cardvalue righthead2box" >{this.getResponseData(item, 'preunit')}</span><span class={["cardvalue4", this.getResponseDataColor(item, 'leftheaderdataclass', 0)]}>{this.getBlockDataValue(item, 0)}</span><span class="cardvalue righthead1box" >{this.getResponseData(item, 'postunit')}</span></div></div>
                         </div>
                         <div class="graph-limit-col">
                           <div class="card-span"><span class="cardtext">{this.getBlockDataName(item, 1)}</span><div class="card-block-value"><span class="cardvalue righthead2box" >{this.getResponseData(item, 'preunit')}</span><span class={["cardvalue4",this.getResponseDataColor(item, 'leftheaderdataclass', 1)]}>{this.getBlockDataValue(item, 1)}</span><span class="cardvalue1 righthead1box" >{this.getResponseData(item, 'postunit')}</span></div></div>
                        </div>
                        <div class="graph-limit-col">
                           <div class="card-span"><span class="cardtext">{this.getBlockDataName(item, 1)}</span><div class="card-block-value"><span class="cardvalue righthead2box" >{this.getResponseData(item, 'preunit')}</span><span class={["cardvalue4",this.getResponseDataColor(item, 'leftheaderdataclass', 2)]}>{this.getBlockDataValue(item, 1)}</span><span class="cardvalue1 righthead1box" >{this.getResponseData(item, 'postunit')}</span></div></div>
                        </div>
                    </div>

                    <div class="graph-row graph-limit-col-wrapper-1">
                      <div class="graph-limit-col">
                           <div class="card-span"><span class="cardtext">{this.getBlockDataName(item, 0)}</span><div class="card-block-value"><span class="cardvalue righthead2box" >{this.getResponseData(item, 'preunit')}</span><span class={["cardvalue4",this.getResponseDataColor(item, 'leftheaderdataclass', 3)]}>{this.getBlockDataValue(item, 0)}</span><span class="cardvalue righthead1box" >{this.getResponseData(item, 'postunit')}</span></div></div>
                         </div>
                         <div class="graph-limit-col">
                           <div class="card-span"><span class="cardtext">{this.getBlockDataName(item, 1)}</span><div class="card-block-value"><span class="cardvalue righthead2box" >{this.getResponseData(item, 'preunit')}</span><span class={["cardvalue4",this.getResponseDataColor(item, 'leftheaderdataclass', 4)]}>{this.getBlockDataValue(item, 1)}</span><span class="cardvalue1 righthead1box" >{this.getResponseData(item, 'postunit')}</span></div></div>
                        </div>
                     </div>
                   </div> 
                   : this.getResponseCount(item) == 4 ?
                   <div>
                   <div class="graph-row graph-limit-col-wrapper">
                      <div class="graph-limit-col-1">
                           <div class="card-span"><span class="cardtext">{this.getBlockDataName(item, 0)}</span><div class="card-block-value"><span class="cardvalue righthead2box" >{this.getResponseData(item, 'preunit')}</span><span class={["cardvalue4",this.getResponseDataColor(item, 'leftheaderdataclass', 0)]}>{this.getBlockDataValue(item, 0)}</span><span class="cardvalue righthead1box" >{this.getResponseData(item, 'postunit')}</span></div></div>
                         </div>
                         <div class="graph-limit-col">
                           <div class="card-span"><span class="cardtext">{this.getBlockDataName(item, 1)}</span><div class="card-block-value"><span class="cardvalue righthead2box" >{this.getResponseData(item, 'preunit')}</span><span class={["cardvalue4",this.getResponseDataColor(item, 'leftheaderdataclass', 1)]}>{this.getBlockDataValue(item, 1)}</span><span class="cardvalue1 righthead1box" >{this.getResponseData(item, 'postunit')}</span></div></div>
                        </div>
                    </div>

                    <div class="graph-row graph-limit-col-wrapper">
                      <div class="graph-limit-col-1">
                           <div class="card-span"><span class="cardtext">{this.getBlockDataName(item, 0)}</span><div class="card-block-value"><span class="cardvalue righthead2box" >{this.getResponseData(item, 'preunit')}</span><span class={["cardvalue4",this.getResponseDataColor(item, 'leftheaderdataclass', 2)]}>{this.getBlockDataValue(item, 0)}</span><span class="cardvalue righthead1box" >{this.getResponseData(item, 'postunit')}</span></div></div>
                         </div>
                         <div class="graph-limit-col-1">
                           <div class="card-span"><span class="cardtext">{this.getBlockDataName(item, 1)}</span><div class="card-block-value"><span class="cardvalue righthead2box" >{this.getResponseData(item, 'preunit')}</span><span class={["cardvalue4",this.getResponseDataColor(item, 'leftheaderdataclass', 3)]}>{this.getBlockDataValue(item, 1)}</span><span class="cardvalue1 righthead1box" >{this.getResponseData(item, 'postunit')}</span></div></div>
                        </div>
                     </div>
                   </div>
                   : this.getResponseCount(item) == 3 ? 
                   <div class="graph-row graph-limit-col-wrapper">
                   {
                    Array.from(this.getResponseBoxCount(item), (e, i)=> {
                        return(
                          <div class="graph-limit-col">
                            <div class="card-span"><span class="cardtext">{this.getBlockDataName(item, i)}</span><div class="card-block-value"><span class="cardvalue righthead2box" >{this.getResponseData(item, 'preunit')}</span><span class={["cardvalue4",this.getResponseDataColor(item, 'leftheaderdataclass', i)]}>{this.getBlockDataValue(item, i)}</span><span class="cardvalue righthead1box" >{this.getResponseData(item, 'postunit')}</span></div></div>
                          </div>
                        ) 
                          
                    })
                    }
                    </div>
                   : this.getResponseCount(item) == 1||2 ? 
                   <div class="graph-row graph-limit-col-wrapper">
                   {
                    Array.from(this.getResponseBoxCount(item), (e, i)=> {
                        return(
                          <div class="graph-limit-col-1">
                            <div class="card-span"><span class="cardtext">{this.getBlockDataName(item, i)}</span><div class="card-block-value"><span class="cardvalue righthead2box" >{this.getResponseData(item, 'preunit')}</span><span class={["cardvalue4",this.getResponseDataColor(item, 'leftheaderdataclass', i)]}>{this.getBlockDataValue(item, i)}</span><span class="cardvalue righthead1box" >{this.getResponseData(item, 'postunit')}</span></div></div>
                          </div>
                        ) 
                          
                    })
                    }
                    </div>

                   :null}

                    {/* <div class="graph-row graph-limit-col-wrapper">
            
                    {
                    Array.from(this.getResponseBoxCount(item), (e, i)=> {
                     
                        return(
                          <div class="graph-limit-col">
                            <div class="card-span"><span class="cardtext">{this.getBlockDataName(item, i)}</span><div class="card-block-value"><span class="cardvalue righthead2box" >{this.getResponseData(item, 'preunit')}</span><span class="cardvalue">{this.getBlockDataValue(item, i)}</span><span class="cardvalue righthead1box" >{this.getResponseData(item, 'postunit')}</span></div></div>
                          </div>
                        )
                      
                          
                    })
                    } */}
                        {/* <div class="graph-limit-col">
                           <div class="card-span"><span class="cardtext">{this.getBlockDataName(item, 0)}</span><div class="card-block-value"><span class="cardvalue righthead2box" >{this.getResponseData(item, 'preunit')}</span><span class="cardvalue">{this.getBlockDataValue(item, 0)}</span><span class="cardvalue righthead1box" >{this.getResponseData(item, 'postunit')}</span></div></div>
                         </div>
                         <div class="graph-limit-col">
                           <div class="card-span"><span class="cardtext">{this.getBlockDataName(item, 1)}</span><div class="card-block-value"><span class="cardvalue righthead2box" >{this.getResponseData(item, 'preunit')}</span><span class="cardvalue1">{this.getBlockDataValue(item, 1)}</span><span class="cardvalue1 righthead1box" >{this.getResponseData(item, 'postunit')}</span></div></div>
                        </div>
                        <div class="graph-limit-col">
                           <div class="card-span"><span class="cardtext">{this.getBlockDataName(item, 2)}</span><div class="card-block-value"><span class="cardvalue righthead2box" >{this.getResponseData(item, 'preunit')}</span><span class="cardvalue2">{this.getBlockDataValue(item, 2)}</span><span class="cardvalue2 righthead1box" >{this.getResponseData(item, 'postunit')}</span></div></div>
                        </div>  */}

                     {/* </div> */}
                  </div>
               ))} 
             </div> 
             :(this.boxNumberProp && this.boxNumberProp.length === 1) ? 

             <div class="graph-col-6 graph-col-s-6 graph-col-lg-6 second leftone">
               <div class="graph-row graph-header-row">
                      <div class="graph-left-header"><span class= {["lefthead graph-left-head",  this.getResponseData(this.boxNumberProp?.[0], 'leftheaderstyleclass')]}  >{this.getResponseData(this.boxNumberProp?.[0], 'leftheadername')}</span></div>
                      <div class="header-right"><span class="righthead1">{this.getResponseData(this.boxNumberProp?.[0], 'totalname')}</span><span class= {['righthead3', this.getResponseData(this.boxNumberProp?.[0], 'leftheaderstyleclass')]} >{this.getResponseData(this.boxNumberProp?.[0], 'preunit')}</span><span class= {['righthead', this.getResponseData(this.boxNumberProp?.[0], 'leftheaderstyleclass')]} >{this.getResponseData(this.boxNumberProp?.[0], 'totalcount')}</span> <span class="righthead2" >{this.getResponseData(this.boxNumberProp?.[0], 'postunit')}</span></div>
                  </div>
                  <div class="graph-row graph-limit-col-wrapper">
                
                        <div class="graph-limit-col">
                           <div class="card-span"><span class="cardtext">{this.getBlockDataName(this.boxNumberProp?.[0], 0)}</span><div class="card-block-value"><span class="cardvalue righthead2box" >{this.getResponseData(this.boxNumberProp?.[0], 'preunit')}</span><span class="cardvalue">{this.getBlockDataValue(this.boxNumberProp?.[0], 0)}</span><span class="cardvalue righthead1box" >{this.getResponseData(this.boxNumberProp?.[0], 'postunit')}</span></div></div>
                         </div>
                         <div class="graph-limit-col">
                           <div class="card-span"><span class="cardtext">{this.getBlockDataName(this.boxNumberProp?.[0], 1)}</span><div class="card-block-value"><span class="cardvalue righthead2box" >{this.getResponseData(this.boxNumberProp?.[0], 'preunit')}</span><span class="cardvalue1">{this.getBlockDataValue(this.boxNumberProp?.[0], 0)}</span><span class="cardvalue1 righthead1box" >{this.getResponseData(this.boxNumberProp?.[0], 'postunit')}</span></div></div>
                        </div>
                        <div class="graph-limit-col">
                           <div class="card-span"><span class="cardtext">{this.getBlockDataName(this.boxNumberProp?.[0], 2)}</span><div class="card-block-value"><span class="cardvalue righthead2box" >{this.getResponseData(this.boxNumberProp?.[0], 'preunit')}</span><span class="cardvalue2">{this.getBlockDataValue(this.boxNumberProp?.[0], 2)}</span><span class="cardvalue2 righthead1box" >{this.getResponseData(this.boxNumberProp?.[0], 'postunit')}</span></div></div>
                        </div> 
                  </div> 
             </div>:null}
           </div>
        ) ;
    }
})


export default Leftboxchart ;

