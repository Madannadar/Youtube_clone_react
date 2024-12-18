export const API_KEY ='AIzaSyCQ23J1-Qy1Aja8nIq6FxTGA67lgpjZ4P0'

export const value_Converter = (value) => {
    if(value >= 1000000){
        return `${(value / 1000000).toFixed(1)}M`;
    }
    else if(value > 1000){
        return Math.floor(value / 1000) + "K";
    }
    else{
        return value;
    }
}
