const express=require('express')
const hbs=require('hbs')
const path=require('path')
const geoCode = require('./utils/geoCode')
const weatherDetail = require('./utils/weaterDetail')
const publicDir=path.join(__filename, "../public")
const viewsDir=path.join(__filename, "../public/Templates/views")
const partialsDir=path.join(__filename, "../public/Templates/partials")
const app=express();
const port =process.env.PORT||3000
hbs.registerPartials(partialsDir)
app.set("view engine",'hbs')
app.set("views",viewsDir)
app.use(express.static(publicDir))

app.get('',(req,res)=>{
res.render('index',{
    title:"Weather",
    name:"Ben"
})
})
app.get('/about',(req,res)=>{
res.render('about',{
    title:"About"
})
})
app.get('/help',(req,res)=>{
res.render('help',{
    title:"Help"
})
})
app.get('/help/*',(req,res)=>{
    res.render('error',{message:"Help Page not found"})
})
app.get('/weather',(req,res)=>{
    if(!req.query.search){
return res.send("Address is mandatory to perform the operation")
    }

    geoCode(req.query.search,(err,{lat,long,location}={})=>{
        if(err){
            return res.send(err);
        }
        weatherDetail(lat,long,(err,weather)=>{
            if(err){
                return res.send(err);
            }
    res.send({
        weather:weather,
        location:location,
        address:req.query.search
    })
           
        })
    }) 

})
app.get('*',(req,res)=>{
    res.render('error',{
        message:"Page not found"
    })
})
app.listen(port,()=>{
    console.log(`Listening to ${port}`)
})