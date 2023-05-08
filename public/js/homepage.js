const $disply=document.querySelector('.DisplayData');
const $submit=document.querySelector('.SubmitData');

const $logoutbtn=document.querySelector('.logout-btn')
const token=localStorage.getItem('token')

console.log(token);

$disply.addEventListener('click',async(e)=>{
    console.log("Login Clicked");
    location.href="display.html"

})

$submit.addEventListener('click',async(e)=>{
    console.log("Login Clicked");
    location.href="postdata.html"

})



$logoutbtn.addEventListener('click',async(e)=>{
    const result = await fetch('/user/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
        },
        body: JSON.stringify({
           
        })
    }).then((res)=>{
        localStorage.clear()
        location.href="/"
        alert("success")
       return res.json()
    })
    
})
