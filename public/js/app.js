
const weatherForm=document.querySelector('form');
const search=document.querySelector('input')
const message1=document.querySelector('#p1')
const message2=document.querySelector('#p2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location=search.value
    message1.textContent="Loading...."
    message2.textContent=""
    fetch(`http://localhost:3000/weather/?search=${location}`).then(res=>{
        res.json().then((data)=>{
if(data.err){
    message1.textContent=data.error
    message2.textContent=""
}else{
    message1.textContent=data.location
message2.textContent=data.weather
}
        })
    })
})