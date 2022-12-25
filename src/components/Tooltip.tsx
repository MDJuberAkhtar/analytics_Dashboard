import { defineComponent,ref, PropType, watch, computed, onMounted} from 'vue';
import {Graphdatatype} from '../types/types';
import '../styles/tooltip.scss';

const d3 = require("d3");



const Tooltip = defineComponent({

    props: {
        tooltipstyle:{
            type: Object,
            default () {
                return {                     
                    width: '10px',
                    height:'10px'
                }
            }
        },
        title: {
            type: [String, Number],
            default: 'Give some text to be displayed here'
        },
        value: {
            type: [String, Number],
            required:true
        }
   },
  
    

    

    methods:{

        active (val:string) {

           document.getElementById(val)?.style.fill? '#e75540' : null
           
            // Document.getElementById(`${this.value}`).style.fill = 

            
        },
        inactive (val:string) {
            document.getElementById(val)?.style.fill? '##7f8797' : null

            
        },
        sendClickAction () {
           this.$emit('clickTootlTip')
        }

      
        

    },

    

    render(){
        return (
            <div class="tooltip-div" onMouseover={() => this.active(`${this.value}`)} onMouseleave={() => this.inactive(`${this.value}`)} onClick={() => this.sendClickAction()}>
                <svg width={this.tooltipstyle.width} height={this.tooltipstyle.height} viewBox="0 0 13 13" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                    <title></title>
                    <desc>Created with sketchtool.</desc>
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="0.5">
                        <g /> :id="value" transform="translate(-463.000000, -318.000000)" fill="#7f8797" fill-rule="nonzero"&gt;
                        <g id="Group-6" transform="translate(77.000000, 87.933318)">
                            <g id="card1-copy" transform="translate(0.000000, 40.566682)">
                                <g id="Group-3" transform="translate(0.000000, 57.000000)">
                                    <g id="Tr-Copy-2" transform="translate(0.000000, 114.000000)">
                                        <g id="row1">
                                            <g id="Group-2" transform="translate(0.679696, 0.000000)">
                                                <g id="Group">
                                                    <g id="Ic_info" transform="translate(385.503519, 18.889098)">
                                                        <g id="Combined-Shape">
                                                            <path d="M6.21384298,4.4408921e-15 C9.64565369,4.4408921e-15 12.427686,2.78203226 12.427686,6.21384298 C12.427686,9.64565369 9.64565369,12.427686 6.21384298,12.427686 C2.78203226,12.427686 4.4408921e-15,9.64565369 4.4408921e-15,6.21384298 C4.4408921e-15,2.78203226 2.78203226,4.4408921e-15 6.21384298,4.4408921e-15 Z M6.21384298,1.14406495 C3.41388189,1.14406495 1.14406495,3.41388189 1.14406495,6.21384298 C1.14406495,9.01380407 3.41388189,11.283621 6.21384298,11.283621 C9.01380407,11.283621 11.283621,9.01380407 11.283621,6.21384298 C11.283621,3.41388189 9.01380407,1.14406495 6.21384298,1.14406495 Z M6.71001691,4.83237946 L6.71001691,9.28765077 L5.70943379,9.28765077 L5.70943379,4.83237946 L6.71001691,4.83237946 Z M6.21178416,3.14003518 C6.39296061,3.14003518 6.5329585,3.19081873 6.63178201,3.29238735 C6.73060553,3.39395596 6.78001655,3.52160109 6.78001655,3.67532656 C6.78001655,3.82630694 6.73060553,3.95189327 6.63178201,4.05208934 C6.5329585,4.1522854 6.39296061,4.20238269 6.21178416,4.20238269 C6.03060772,4.20238269 5.8912961,4.1522854 5.79384513,4.05208934 C5.69639416,3.95189327 5.64766941,3.82630694 5.64766941,3.67532656 C5.64766941,3.52160109 5.69639416,3.39395596 5.79384513,3.29238735 C5.8912961,3.19081873 6.03060772,3.14003518 6.21178416,3.14003518 Z"></path>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>  
            </svg>
            <div class="tooltip">
                    <span class="tooltiptext">{ this.title }</span>
                </div>
          </div>
        ) ;
    }
})


export default Tooltip ;

