type TypeAndWarn = {type:number,warn:boolean}

export default {

    POS_INTEGER:0,
    POS_FLOAT:1,
    NEG_INTEGER:2,
    NEG_FLOAT:3,
    STRING:4,
    FUTURE_USE_1:5,
    FUTURE_USE_2:6,
    FUTURE_USE_3:7,
    convertTOByte: function(numberType:number,warn=false):number{
        /*
                X0, X1, X2, X3, X4, X5, X6, X7
                
                X0-> 1 if warn=true

                X4,X5,X6,X7 -->Type

                X1,X2,X3    -->FUTURE USE
        */
        if(warn){
            return 128+numberType;
        }
        return numberType;
    },
    convertFROMByte: function(uint256:number):TypeAndWarn{
       var ris ={type:0,warn:true};
       if(uint256>=128){
            ris.warn=true;
            ris.type=uint256-128;
       }else{
            ris.warn=false;
            ris.type=uint256;
       }
       return ris;
    }
    
}