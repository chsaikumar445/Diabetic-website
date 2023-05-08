const $studentLoginForm=document.getElementById("student-login")


function handleq1(){
    const $custom1 = document.getElementById("custom1")
    const q1ele = document.getElementById("q1").value
   if(q1ele=="other"){
    $custom1.hidden=false
    $custom1.required=true
    $custom1.placeholder="enter your own question"}
}
function handleq2(){
    const $custom2 = document.getElementById("custom2")
    const q2ele = document.getElementById("q2").value
   if(q2ele=="other"){
    $custom2.hidden=false
    $custom2.required=true
    $custom2.placeholder="enter your own question"}
}
function handleq3(){
    const $custom3 = document.getElementById("custom3")
    const q3ele = document.getElementById("q3").value
   if(q3ele=="other"){
    $custom3.hidden=false
    $custom3.required=true
    $custom3.placeholder="enter your own question"}
}

$studentLoginForm.addEventListener('submit',async (e)=>{
    e.preventDefault()
    console.log("student login intiated")
    const $email=document.getElementById("email").value
    const $password=document.getElementById("password").value
    const $q1=document.getElementById("q1").value
    const $q2=document.getElementById("q2").value
    const $q3=document.getElementById("q3").value
    const $custom1=document.getElementById("custom1").value
    const $custom2=document.getElementById("custom2").value
    const $custom3=document.getElementById("custom3").value
    const $a1=document.getElementById("a1").value
    const $a2=document.getElementById("a2").value
    const $a3=document.getElementById("a3").value
    const $image = document.getElementById("image").value


    const result = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email:$email,
            password:$password,
            question1:$custom1 || $q1,
            question2:$custom2 || $q2,
            question3:$custom3 || $q3,
            answer1:$a1,
            answer2:$a2,
            answer3:$a3,
            image:$image

        })
    }).then((res) => res.json())
    console.log(result,result)
    if (!result.error) {
        localStorage.setItem('token',result.token)
        location.href="/homepage.html"
        alert("success")
    } else {
        alert(result.error)
    }
})