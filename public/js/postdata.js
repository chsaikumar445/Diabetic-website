const $userform=document.getElementById("user")


$userform.addEventListener('submit',async (e)=>{
    e.preventDefault()
    const $date=document.getElementById('date').value
    const $time=document.getElementById('time').value
    const $before=document.getElementById('before').value
    const $btime=document.getElementById('btime').value
    const $breaskfast=document.getElementById('breaskfast').value
    const $ltime=document.getElementById('breaskfast').value
    const $lunch=document.getElementById('lunch').value
    const $dtime=document.getElementById('dtime').value
    const $dinner=document.getElementById('dinner').value
    const $atime=document.getElementById('atime').value
    const $after=document.getElementById('after').value
    const $postedby=localStorage.getItem('token')

    const result = await fetch('/user/diabetic', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            date:$date,
            timebefore:$time,
            beforelevel:$before,
            breakfasttime:$btime,
            breakfast:$breaskfast,
            lunchtime:$ltime,
            lunch:$lunch,
            dinnertime:$dtime,
            dinner:$dinner,
            aftertime:$atime,
            afterlevel:$after,
            postedby:$postedby
        })
    }).then((res) => res.json())
    console.log(result)
    if (!result.error) {
        location.href="/homepage.html"
        alert("success")
    } else {
        alert(result.error)
    }

})