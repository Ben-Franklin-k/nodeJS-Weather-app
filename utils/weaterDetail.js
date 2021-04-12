const chalk = require('chalk');
const request=require('request')

const weatherDetail=(lat,long,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=787dfccb498213e4f7351be5a27d122d&query=${lat},${long}`
    request({url,json:true},
    (err,res)=>{
        if(err){
            callback("Unable to connect",undefined)
        }else if (res.body.error){
            callback(JSON.stringify(res.body.error.info) ,undefined) 
        }else{
            const data=res.body.current;
            callback(undefined, "It is "+data.weather_descriptions[0]+" but the temperature is "+ data.temperature +' and it feels like '+data.feelslike
            )
          
        }}
    ) 
}


module.exports=weatherDetail