interface Donuttypes {
    type : string,
    totalcount: number | string,
    totalunit: string,
    headername: string,
    piechartclass: string,
    color: any,
    meancount: number | string,
    chartdata: any,
    footer:any,
    hoverclass: any

}

interface Leftboxtype {

    leftheadername : string
    postunit : string
    preunit : string
    totalcount : number
    totalname :  string
    leftheader : string
    leftheaderstyleclass: string
    leftheaderdata: number
    leftheaderdataclass :any
    blockdataname? : any


}

interface Boxheadertype {
    selected : string
    itemlist: any,
    label: string

}

interface Numberheadertype {
    leftheadername : string
    postunit : string
    preunit : string
    totalcount : number
    totalname :  string
    leftheader : string
    leftheaderstyleclass: string
    leftheaderdata: number
    leftheaderdataclass :any

}

interface Graphdatatype {
    headername : string,
    areagraphid : string
    maxrange : any
    graphdata : any
    xaxisdata : any
    color : any
    clippathid : string
    clippath : string
    dotlass : string
    radioData : any
    dropDownData : any
}

interface anyObj {
    [key: string]: any
  }

interface SelectOptions  {
    multiselect?: boolean,
    options?: []
}

interface FileOptions  {
    filename: string,
    url:string,
    extensions?:string[],
    sizelimit?: number,
    ratio?: [ number, number ],
    ratioText?:{ type?: 'poster'|'proportion', value?: string }
}

interface ButtonOptions {
    text: string,
    heading: string,
    displayTemplate: string
}

interface input { 
    name: string,
    type: 'text' | 'number', 
    component: any, 
    default?: string,
    update?: boolean,
    attrs?: Attr,

    file?: FileOptions,

    select?: SelectOptions

    button?: ButtonOptions
   
}

interface SelectMtype {
    textColor: string
    bgColor: string
    borderColor: string
    selectBgColor: string
    [key: string]: any
    defaultProperty?: any
    inputProperty?: any 
    listProperty?: any
}



export {
    Donuttypes, 
    Leftboxtype,
    Numberheadertype,
    Boxheadertype,
    Graphdatatype,
    anyObj,
    SelectOptions,
    input,
    SelectMtype
}
