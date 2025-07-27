export const API_KEY = import.meta.env.VITE_API_KEY_YOUTUBE;

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
