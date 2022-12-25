const d3 = require("d3");

const numberMinification =(total: any)=>{
    var formatComma = d3.format(".3s")
    var formatComma1 = d3.format(".2s")
    var formatComma2 = d3.format(".1s")
            
    if (typeof total === 'string' && total.search(",") >= 0) {
        total = total.replace(/,/g,'')
        total = parseFloat(total)
        if (total >= 100000) {
            return total = formatComma(total)
        }

        if (total >= 10000) {
            return total = formatComma1(total)
        }
        if (total >= 1000) {
           return total = formatComma2(total)
        }
        
       
    } else if (Number(total) === total && total % 1 === 0 && total < 1000) {
        return total = total + 0
    } else {
         total = parseFloat(total)
         if (total >= 100000) {
            return total = formatComma(total)
        }

        if (total >= 10000) {
            return total = formatComma1(total)
        }
        if (total >= 1000) {
           return total = formatComma2(total)
        }
    }

}

export default numberMinification