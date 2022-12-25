<template>
   <div id="app">
      <Donutchart :donutProp="responceDonutChart" :graphData="responseDonutAreaChart"/> 
      <Leftboxchart :boxProp="responseLeftBox" :boxNumber="boxNumberArr"/>
      <Areagraph :graphData="responseAreaChart" @dropdownGraphData="getData($event)"/>
      <!-- <Dropdown :ida="'a'"
        @on-item-selected="dropdownSelection = $event"
        @on-item-reset="dropdownSelection = $event"
        :itemList="itemList"
        :placeholder="placeholderDropdown"
        :mSelectProperty="mSelectProperty"
        :selected="1"/> -->
         <!-- <Leftboxchart :boxProp="responseLeftBox" 
      :leftHeaderArray="leftHeaderArray"
       :rightHeaderArray="rightHeaderArray" 
       :boxNumber="boxNumberArr"/> -->
   </div>
</template>


<script lang='ts'>

import { defineComponent, ref } from 'vue';
import Donutchart from './components/DonutChart';
import Leftboxchart from './components/LeftboxChart';
import Areagraph from './components/AreaGraph';
import Dropdown from './components/DropDown';
import {Donuttypes, Leftboxtype,Boxheadertype, Graphdatatype, anyObj, SelectMtype} from './types/types';
import './App.scss';
// import 'mobiotics-dynamic-components-vue/dist/mobiotics_dynamic_components_vue.css'

export default defineComponent({
  name:'App',
  components:{
     Donutchart,
     Leftboxchart,
     Areagraph,
     Dropdown
  },
  setup(){
     //donut chart
     const responceDonutChart = ref<Donuttypes[]>([{
        type : 'type1',
        totalcount : 20000,
        totalunit : '',
        headername : 'SUBSCRIBERS/PROFILES',
        piechartclass : 'chart1',
        color : ['#3286EA', '#e7e7e7'],
        meancount : '5000',
        chartdata:[ {name: 'ACTIVE', count: 5000}, {name: 'TOTAL', count: 20000} ],
        footer : {totalcenter: 5000,   center: 'Inactive'},
        hoverclass : ['subscriptionvalue','subscriptiontext','subscriptionvalue1','subscriptiontext1']
     },
     ])
     
     //left box graph
     const subscriber2 = ref<Leftboxtype>(
        {
         leftheadername : 'INACTIVE',
         postunit : 'Hrs',
         preunit : '$',
         leftheader : 'contenthrs',
         leftheaderstyleclass : '',
         leftheaderdata : 120,
         totalname : 'TOTALCOUNT',
         totalcount : 515,
         leftheaderdataclass : ['colorareoblue', 'colorlight'],
         blockdataname : [{name: 'Weekly', value: 3555, classstyle: 'card-title color2black'}, {name: 'Monthly', value: 45, classstyle: 'card-title color3black'}]
        }
      );


      const subscriber1 = ref<Leftboxtype>({
        leftheadername : 'ACTIVE',
        postunit : 'Hrs',
        preunit : '$',
        totalcount : 0,
        totalname : 'TOTAL',
        leftheader : 'contenthrs',
        leftheaderstyleclass: '',
        leftheaderdata: 90,
        leftheaderdataclass : ['colorsteel', 'colorred','colorareoblue', 'colorlight', 'color2black'],
        blockdataname : [{name: 'Daily', value: 0, classstyle: 'card-title color1black'}, {name: 'Weekly', value: 4, classstyle: 'card-title color2black'}, {name: 'Monthly', value: 14, classstyle: 'card-title color3black'}, {name: 'Weekly', value: 4, classstyle: 'card-title color2black'}, {name: 'Monthly', value: 14, classstyle: 'card-title color3black'}]
      });

      const subscriberObj = ref<Object>({
         active: subscriber1.value,
         inactive: subscriber2.value,
      })

      const responseLeftBox = ref([subscriberObj.value])

      

      const leftHeaderArray = ref<Boxheadertype>({
         selected: 'active',
        itemlist: [{name: 'ACTIVE', id: 'active'}, {name: 'OPEN', id: 'open'}],
        label: 'Ticket' 
      })

      const rightHeaderArray = ref<Boxheadertype>({
          selected: 'inactive',
          itemlist: [{name: 'INACTIVE', id: 'inactive'}, {name: 'OPEN', id: 'open'}],
          label: 'Ticket'
      })

      let boxNumberArr = ref(['active', 'inactive']);

      let dataSet1 = ref([{"dataindex":"Week 1","activecount":23,"index":7},{"dataindex":"Week 2","activecount":2,"index":6},{"dataindex":"Week 3","activecount":21,"index":5},{"dataindex":"Week 4","activecount":14,"index":4},{"dataindex":"week 5","activecount":0,"index":3},{"dataindex":"week 6","activecount":1,"index":2},{"dataindex":"week 7","activecount":0,"index":1}]);
      
      let data2: any[] = []
      let allKeys1 = Object.keys(dataSet1.value[0])
      let newKeys1 = allKeys1.slice(1) ;
      let newKeysValue2 = newKeys1.pop();

      
      newKeys1.forEach((key)=>{  
         data2.push(dataSet1.value.map((x: any) => ({'index': x['dataindex'], 'count': x[key]})))
      })


      let maxArray1 = []
      for (let i in data2) {
         maxArray1.push(Math.max.apply(Math, data2[i].map(function(o:any) { return o.count })))
      }
      let indexDs1 = maxArray1.indexOf(Math.max(...maxArray1))
      let dataindex1 = data2[indexDs1]
      let maxrange1 = Math.max.apply(Math, dataindex1.map(function (o:any) {
         return o.count
      }))

      let datedata1 = []
      for (let i in dataindex1) {
         datedata1.push(dataindex1[i].index)
      }

      const responseDonutAreaChart = ref<Graphdatatype[]>([{
         headername :'Content',
         areagraphid :'coupon',
         maxrange :maxrange1,
         graphdata :data2,
         xaxisdata :datedata1,
         color :['#579FFF'],
         clippathid :'couponclip',
         clippath :'url(#couponclip)',
         dotlass :'coupondot',
         radioData :[],
         dropDownData : []
     },
     ])

      //set Area Graph data
      let dataSet = ref([{"dataindex":"Week 1","activecount":23,"inactivecount":0,"index":7},{"dataindex":"Week 2","activecount":2,"inactivecount":0,"index":6},{"dataindex":"Week 3","activecount":21,"inactivecount":0,"index":5},{"dataindex":"Week 4","activecount":14,"inactivecount":0,"index":4},{"dataindex":"week 5","activecount":0,"inactivecount":0,"index":3},{"dataindex":"week 6","activecount":1,"inactivecount":0,"index":2},{"dataindex":"week 7","activecount":0,"inactivecount":0,"index":1}]);

      let data1: any[] = []
      let allKeys = Object.keys(dataSet.value[0])
      let newKeys = allKeys.slice(1) ;
      let newKeysValue1 = newKeys.pop();

      
      newKeys.forEach((key)=>{  
         data1.push(dataSet.value.map((x: any) => ({'index': x['dataindex'], 'count': x[key]})))
      })


      let maxArray = []
      for (let i in data1) {
         maxArray.push(Math.max.apply(Math, data1[i].map(function(o:any) { return o.count })))
      }
      let indexDs = maxArray.indexOf(Math.max(...maxArray))
      let dataindex = data1[indexDs]
      let maxrange = Math.max.apply(Math, dataindex.map(function (o:any) {
         return o.count
      }))

      let datedata = []
      for (let i in dataindex) {
         datedata.push(dataindex[i].index)
      }

     

      const responseAreaChart = ref<Graphdatatype[]>([{
         headername :'Content',
         areagraphid :'device',
         maxrange :maxrange,
         graphdata :data1,
         xaxisdata :datedata,
         color :['#579FFF', '#FF6073', '#9ac5ff'],
         clippathid :'contentclip',
         clippath :'url(#contentclip)',
         dotlass :'contentdot',
         radioData :[
         {name: 'ACTIVE', color: 'color-blue', value: 'true'},
         {name: 'INACTIVE', color: 'color-red', value: 'true'}
         ],
         dropDownData : [{label: 'Duration', itemlist: [{name: 'Last Week', id: 'week', forVal: 'period'}, {name: 'Last Month', id: 'month', forVal: 'period'}, {name: 'Daily', id: 'day', forVal: 'period'}, {name: 'Last Year', id:'year', forVal: 'period'}], selected: 'day'}, {label: 'Other', itemlist: [{name: 'Last Week', id: 'week', forVal: 'period1'}, {name: 'Last Month', id: 'month', forVal: 'period1'}, {name: 'Daily', id: 'day', forVal: 'period1'}, {name: 'Last Year', id:'year', forVal: 'period1'}], selected: 'day'}]
     },
     ])
     
     //dropdown key



     return { responceDonutChart, responseLeftBox, leftHeaderArray, rightHeaderArray, boxNumberArr,responseDonutAreaChart,  responseAreaChart }
  },
  data() {
    return {
     
      dropdownSelection: {},
      itemList: [
        { name: "Content1", id: 1 },
        { name: "sub1", id: 2 }
      ],
      placeholderDropdown: "Select Category",
      mSelectProperty: {
        textColor: "#576175",
        bgColor: "#fff",
        borderColor: "#D4DAE4",
        selectBgColor: "#ebebeb"
      } as SelectMtype
    };
  },
  watch: {
    dropdownSelection() {
      console.log(this.dropdownSelection);
    },
  },

  methods:{

      getData (data:any) {
        console.log('this is event:',data)
      }
  }

  
       
})
</script>




