
const $studentRegForm=document.getElementById("student-register")

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
$studentRegForm.addEventListener('submit',async (e)=>{
    e.preventDefault()
    console.log("data validated") 
    const $name=document.getElementById("name").value
    const $email=document.getElementById("email").value
    const $password=document.getElementById("password").value
    const $confirmPassword=document.getElementById("password2").value
    const $phone=document.getElementById("phone").value
    const $dob=document.getElementById("dob").value
    const $username=document.getElementById("username").value
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

    console.log($name,$email,$phone,$dob,$username,$q1,$q2,$q3,$custom1,$custom2,$custom3,$a1,$a2,$a3,$image)

    if(verifyPassword($password,$confirmPassword)){
        console.log("inside");
        const result = await fetch('/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name:$name,
                email:$email,
                phone:$phone,
                dob:$dob,
                password:$password,
                username:$username,
                question1:$custom1 || $q1,
                question2:$custom2 || $q2,
                question3:$custom3 || $q3,
                answer1:$a1,
                answer2:$a2,
                answer3:$a3,
                image:$image
            })
        }).then((res) => res.json())
        console.log(result)
        if (!result.error) {
            localStorage.setItem('token', result.token)
            localStorage.setItem('name',result.user.firstname)
            localStorage.setItem('studentid',result.user._id)
            location.href="/login.html"
            alert("success")
        } else {
            alert(result.error)
        }
    }
})

