const $applybtn=document.querySelector('.apply-btn')
const token=localStorage.getItem('token')
const jobbody=document.getElementById('job-body')
let usersContainer = document.getElementById("jobs");


window.onload=async()=>{
    console.log("onload") 
    const result = await fetch(`/user/diabeticdata?userid=${token}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
        }
    }).then((res) => res.json())
    console.log(result);
    const mappedUsers = result.newResults.map((data, index) => {
        return `<div class="job">
        <h1>Diabetic Data</h1>
        <p>Data: ${data.date} </p>
        <p>Time: ${data.timebefore}</p>
        <p>sugar level fasting: ${data.beforelevel} years</p>
        <p>breakfast time:${data.breakfasttime}</p>
        <p>breakfast: ${data.breakfast} </p>
        <p>Lunch Time: ${data.lunchtime} </p>
        <p>Lunch: ${data.lunch} </p>
        <p>Dinner Time: ${data.dinnertime} </p>  
        <p>Dinner: ${data.dinner} </p>
        <p>Time: ${data.aftertime} </p>
        <p>sugar level after dinner: ${data.afterlevel} </p>
      </div>`;
      });

      if(mappedUsers.length>0){
        usersContainer.innerHTML = mappedUsers
    }
      else{
        alert("Applications Empty") 
        //    usersContainer.innerHTML = "<h1>There are no pending applications to review, Please comeback later!</h1>"
           location.href="/homepage.html"
      }

}
 

