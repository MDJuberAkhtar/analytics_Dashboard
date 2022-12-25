import { defineComponent,ref, PropType, watch, computed, onMounted} from 'vue';
import {Graphdatatype} from '../types/types';
import '../styles/search.scss';

const d3 = require("d3");



const Searchpopup = defineComponent({

//     props: {
//         show: {
//             type: Boolean,
//             default: false
//           },
//           searchLabel: {
//             type: String
//           },
//           query: {
//             type: String,
//             default: null
//           },
//           mSearchProperty: {
//             type: Object,
//             default () {
//               return {
//                 textColor: '#4E617B',
//                 bgPopup: '#fff',
//                 borderPopup: '#D0D6DD',
//                 borderInput: '#0978FC',
//                 fillSearch: '#1573E1',
//                 fillClose: '#D4DAE4'
//               }
//             }
//           },
//           type: {
//             type: [String, Number],
//             default: 'text'
//           },
//           subtype: {
//             type: String
//           }
//    },

//    data () {
//     return {
//       searchQuery: '',
//       placeValue: '',
//       searchImg: ''
//     }
//    },

//    watch: {
//     searchQuery () {
//       if (typeof(this.type) === 'number') {
//         if (this.searchQuery.length > 25) {
//           let value = this.searchQuery.split('')
//           value.splice(25, 1)
//           value = value.join('')
//           this.searchQuery = value
//         } else {
//           if (this.subtype === 'integer') {
//             let intregesx = /^[0-9]*$/
//             if (!intregesx.test(this.searchQuery)) {
//               let valInt = this.searchQuery.split('')
//               valInt.splice(this.searchQuery.length-1, 1)
//               valInt = valInt.join('')
//               this.searchQuery = valInt
//             }
//           }
//           if (this.searchQuery.length > 2) {
//             this.$emit('searchEvent', this.searchQuery)
//           } else if (this.searchQuery.length === 0) {
//             this.$emit('searchEvent', this.searchQuery)
//           }
//         }
//       } else {
//         let regesx = /(^$|^[0-9a-zA-Z_ @./-]+$)/
//         if (!regesx.test(this.searchQuery)) {
//           let val = this.searchQuery.split('')
//           val.splice(this.searchQuery.length-1, 1)
//           val = val.join('')
//           this.searchQuery = val
//         } else {
//           if (this.searchQuery.length > 2) {
//             this.$emit('searchEvent', this.searchQuery)
//           } else if (this.searchQuery.length === 0) {
//             this.$emit('searchEvent', this.searchQuery)
//           }
//         }
//       }
//       this.getStyle()
//     },
//     query () {
//       this.searchQuery = this.query
//     }
//   },
//   created () {
//     this.placeValue = `Search ${this.searchLabel}`
//     this.searchQuery = this.query
//   },
  
    

    

//     methods:{
//         closePopup () {
//             if (event.target === this.$refs.popup) {
//               this.$emit('close', false)
//             }
//           },
//           getStyle () {
//             if (this.searchQuery.length) {
//               this.searchImg = {
//                 backgroundImage: 'none',
//                 textIndent: 0
//               }
//             } else {
//               this.searchImg = {
//                 backgroundImage: `url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='14px' height='14px' viewBox='0 0 14 14' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3C!-- Generator: sketchtool 57.1 (101010) - https://sketch.com --%3E%3Ctitle%3EF9560F91-9B7A-49CA-8D88-32883613B718@2x%3C/title%3E%3Cdesc%3ECreated with sketchtool.%3C/desc%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='01vlive_suport_tickets' transform='translate(-373.000000, -128.000000)' fill='%23C3C3C3' fill-rule='nonzero'%3E%3Cg id='Group-4' transform='translate(88.000000, 72.000000)'%3E%3Cg id='Table_constants' transform='translate(0.000000, 4.166654)'%3E%3Cg id='Group' transform='translate(80.250000, 46.329408)'%3E%3Cg id='Tablehead' transform='translate(162.000000, 2.000000)'%3E%3Cg id='Stacked-Group'%3E%3Cg%3E%3Cg id='Filter-Copy-menu_option' transform='translate(39.000000, 0.000000)'%3E%3Cg id='menu_option'%3E%3Cg id='Filter-Search' transform='translate(-0.000000, 0.000000)'%3E%3Cpath d='M9.96875,14.4375 C12.4367725,14.4375 14.4375,12.4367725 14.4375,9.96875 C14.4375,7.50072752 12.4367725,5.5 9.96875,5.5 C7.50072752,5.5 5.5,7.50072752 5.5,9.96875 C5.5,12.4367725 7.50072752,14.4375 9.96875,14.4375 Z M9.96875,15.8125 C6.74133599,15.8125 4.125,13.196164 4.125,9.96875 C4.125,6.74133599 6.74133599,4.125 9.96875,4.125 C13.196164,4.125 15.8125,6.74133599 15.8125,9.96875 C15.8125,13.196164 13.196164,15.8125 9.96875,15.8125 Z M13.2202912,13.9821747 C13.0099029,13.7717864 13.0099029,13.4306796 13.2202912,13.2202912 C13.4306796,13.0099029 13.7717864,13.0099029 13.9821747,13.2202912 L17.0297088,16.2678253 C17.2400971,16.4782136 17.2400971,16.8193204 17.0297088,17.0297088 C16.8193204,17.2400971 16.4782136,17.2400971 16.2678253,17.0297088 L13.2202912,13.9821747 Z' id='Combined-Shape'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//                 textIndent: '15px'
//               }
//             }
//           },
//           cancelPopup () {
//             event.preventDefault()
//             this.$emit('close', false)
//           },
//           stopClose () {
//             event.stopPropagation()
//             this.$emit('searchClick')
//           },
//           searchValue () {
//             this.$emit('close', false)
//           },
//     },

    

//     render(){
//         return (
//             <div >
             
//           </div>
//         ) ;
//     }
})


export default Searchpopup ;

