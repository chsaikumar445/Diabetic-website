const $adminPasswordForm=document.getElementById("password-reset")
function verifyPassword(password1,password2) { 
    errors=[] 
    if(password1!==password2){
        document.getElementById("message").innerHTML = "password and confirm password should be same";
        return false
    }
    if(password1.length < 8){
        document.getElementById("message").innerHTML = "password length should be longer than or equal to 8 characters";
        return false
    }
    if (password1.search(/[a-z]/i) < 0) {
        errors.push("Your password must contain at least one lower case.");
        document.getElementById("message").innerHTML = "Your password must contain at least one lower case.";
    }
    if (password1.search(/[0-9]/) < 0) {
        errors.push("Your password must contain at least one digit."); 
        document.getElementById("message").innerHTML = "Your password must contain at least one digit .";
    }
    if (password1.search(/[A-Z]/) < 0) {
        errors.push("Your password must contain at least one Upper case."); 
        document.getElementById("message").innerHTML = "Your password must contain at least one upper case.";
    }
    const isContainsSymbol =
    /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
  if (!isContainsSymbol.test(password1)) {
    errors.push("Your password must contain at least one  symbol.");
    document.getElementById("message").innerHTML = "Your password must contain at least one symbol .";
    return false;
  }
    if (errors.length > 0) {
        alert(errors.join("\n"));
        return false;
    }
    document.getElementById("message").innerHTML = "";
    return true
   
  }  
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
$adminPasswordForm.addEventListener('submit',async (e)=>{
    e.preventDefault()
    console.log(" password reset clicked")
    const $password=document.getElementById("password").value
    const $confirmPassword=document.getElementById("password2").value
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
    const url = window.location.href
    const id = url.split('&')[0].split('=')[1]
    const token = url.split('&')[1].split('=')[1]
    if(verifyPassword($password,$confirmPassword)){
    const result = await fetch('/reset-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            
            password:$password,
            question1:$custom1 || $q1,
            question2:$custom2 || $q2,
            question3:$custom3 || $q3,
            answer1:$a1,
            answer2:$a2,
            answer3:$a3,
            image:$image,
            id,
            token
            
        })
    }).then((res) => res.json())
    console.log(result,"result")
    if (result.success) {
        alert("success")
    } else {
        alert(result.error)
    }
}
})