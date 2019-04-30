$(document).ready(function(){
    var events = [{
            "title": "All Day Event",
            "start": "2019-04-01"
},
        {
            "title": "Long Event",
            "start": "2019-04-07",
            "end": "2019-04-10"
},
        {
            "groupId": "999",
            "title": "Repeating Event",
            "start": "2019-04-09T16:00:00"
},
        {
            "groupId": "999",
            "title": "Repeating Event",
            "start": "2019-04-16T16:00:00"
},
        {
            "title": "Conference",
            "start": "2019-04-11",
            "end": "2019-04-13"
},
        {
            "title": "Meeting",
            "start": "2019-04-12T10:30:00",
            "end": "2019-04-12T12:30:00"
},
        {
            "title": "Lunch",
            "start": "2019-04-12T12:00:00"
},
        {
            "title": "Meeting",
            "start": "2019-04-12T14:30:00"
},
        {
            "title": "Birthday Party",
            "start": "2019-04-13T07:00:00"
},
        {
            "title": "Click for Google",
            "url": "http://google.com/",
            "start": "2019-04-28"
}]
    var count=null;
   var player=document.getElementById('video1');
   var mp4Vid = document.getElementById('videoplayer');
   player.addEventListener('ended',myHandler,false);
    var time1=player.duration
   function myHandler(e)
   {

      if(!e) 
      {
         e = window.event; 
      }
      count="Project%20New%20Hope_%20PTSD%20Retreat%202018";
      $(mp4Vid).attr('src', "videos/"+count+".mp4");
      player.load();
      player.play();
   }
    
    getLocation();
    var headerHeight = $("header").outerHeight()
    var bodyHeight = $("body").first().outerHeight()
    var newHeight = bodyHeight-headerHeight
    var dateTimeHeight = $(".date-weather-cls").outerHeight()
    $("#video1").css("height",(newHeight-dateTimeHeight-55)+"px")
    $("#new-hope-carousel").css("height",newHeight+"px")
    
    /* Date and time calculations start*/
    function updateTime(){
        var newDate = new Date();
        var days=["Sunday",'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        var months=["Jaunary",'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        var day= newDate.getDay();
        var date= newDate.getDate()
        var month = months[newDate.getMonth()];
        var year = newDate.getFullYear();
        var hours = newDate.getHours();
        var minutes = newDate.getMinutes();
        var seconds = newDate.getSeconds();
        if(hours < 10){
            hours = "0"+hours;
        }
        if(minutes < 10){
            minutes = "0"+minutes;
        }
        if(seconds < 10){
            seconds = "0"+seconds;
        }
        var time = hours+":"+minutes+":"+seconds;
        $("#day").html(days[day]);
        $("#date").html(date+" "+month+" "+year);
        $("#time").html(time)
        setTimeout(updateTime, 1000)
    }
    updateTime();
    /* Date and time calculations end*/
    
  /*   $('.carousel').carousel({
      interval: 488000
    })*/
    
    /*Notfication start*/
    var notifications = [];
    $.ajax({
        type: "GET",
        url: "http://localhost/DigitalSignange/data.txt",
        dataType: "text",
        success: function(data) {
            console.log(data);
            data = data.split("\n");
            for(var i = 0; i < data.length; i++){
                $("#notilication-ul").append("<li class='notify'>"+data[i]+"</li>")
            }
        }
     });
      /*var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
      document.getElementById("demo").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "../data.txt", true);
  xhttp.send();*/
    /*Notfication end*/
    
    
    /*Weather start*/
    var long, lat;
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }
    var temp = null, speed = null;
    function showPosition(position) {
        $.ajax({
            type: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather?lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&appid=e26f9566a42faca4fe3dde590b931aaf",
            type: "GET",
            success: function(data) {
                temp = parseInt((parseFloat(data.main.temp)-273.15)*(9/5)+32)
                speed = (parseFloat(data.wind.speed)/1609.344).toFixed(2)
                $("#city").html(data.name)
                $("#temperature").html(temp+"&deg; F")
            }    
        }); 
        $.ajax({
            type: "GET",
            url: "https://api.openweathermap.org/data/2.5/forecast?lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&appid=e26f9566a42faca4fe3dde590b931aaf",
            type: "GET",
            success: function(data) {
                for(var i = 0; i<data.list.length; i++){
                    var time = data.list[i].dt_txt.substr(11,8)
                    var date = data.list[i].dt_txt.substr(5,2)+"/"+data.list[i].dt_txt.substr(8,2)+"/"+data.list[i].dt_txt.substr(0,4)
                    var temp = parseInt((parseFloat(data.list[i].main.temp)-273.15)*(9/5)+32)
                    if(time == "12:00:00")
                        $("#forecast > table").append("<tr><td>"+date+"</td><td>"+temp+"&deg; F</td></tr>")
                }
            }
        })
    }
    /*Weather end*/
 
    /*Calendar start*/
   var newDate = new Date();
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: [ 'interaction', 'dayGrid', 'timeGrid' ],
    defaultView: 'dayGridMonth',
    defaultDate: '2019-04-07',
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: [
      {
        title: 'All Day Event',
        start: '2019-04-01'
      },
      {
        title: 'Long Event',
        start: '2019-04-07',
        end: '2019-04-10'
      },
      {
        groupId: '999',
        title: 'Repeating Event',
        start: '2019-04-09T16:00:00'
      },
      {
        groupId: '999',
        title: 'Repeating Event',
        start: '2019-04-16T16:00:00'
      },
      {
        title: 'Conference',
        start: '2019-04-11',
        end: '2019-04-13'
      },
      {
        title: 'Meeting',
        start: '2019-04-12T10:30:00',
        end: '2019-04-12T12:30:00'
      },
      {
        title: 'Lunch',
        start: '2019-04-12T12:00:00'
      },
      {
        title: 'Meeting',
        start: '2019-04-12T14:30:00'
      },
      {
        title: 'Birthday Party',
        start: '2019-04-13T07:00:00'
      },
      {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: '2019-04-28'
      }
    ]
  });

  calendar.render();
    $(".fc-scroller.fc-day-grid-container").css("height","100%")
    /*Calendar end*/
});

