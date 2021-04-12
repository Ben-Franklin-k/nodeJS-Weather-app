const chalk = require('chalk');
const fetch =require('fetch');


const weatherDetail=(lat,long,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=787dfccb498213e4f7351be5a27d122d&query=${lat},${long}`
    fetch(url).then((res)=>{
        res.json().then(
            (data)=>{
                if (data.body.error){
                    callback(JSON.stringify(res.body.error.info) ,undefined) 
                }else{
                    const data=data.body.current;
                    callback(undefined, "It is "+data.weather_descriptions[0]+" but the temperature is "+chalk.green(data.temperature) +' and it feels like '+data.feelslike
                    )
                }
            }
        )
    }).catch((err)=>{ 
         callback("Unable to connect",undefined)
}

    )
}
module.exports=weatherDetail