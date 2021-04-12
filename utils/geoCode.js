const request =require('request');

const geoCode=(address,callback)=>{
    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYmVuZnJhIiwiYSI6ImNrbjl4ZmRjdDE2OW8zMm56bmo2ZGM3NjQifQ.k10zyFX1P4ctFvoRuHG0JA`
    request({url,json:true},(err,res)=>{
        if(err){
            callback("Unable to connect to server",undefined)
        }
        else if(res.body.message){
            callback( JSON.stringify( res.body.message))
        }else if(res.body.features.length ===0){
           callback("No data found")
        }
        else{
            const lat=res.body.features[0].center[1]
            const long=res.body.features[0].center[0]
            const location=res.body.features[0].place_name
callback(undefined,{lat,long,location})
        }
    }) 
    
}

module.exports=geoCode