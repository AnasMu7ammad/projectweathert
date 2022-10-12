function GetInfo() {

    var newName = document.getElementById("cityInput");
    var cityName = document.getElementById("cityName");
    cityName.innerHTML = "[ " + newName.value + " ]";
    const API_KEY ='add16053181392383937dd55c292403c';
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + newName.value + '&lang=ar&appid=add16053181392383937dd55c292403c')

    .then(response => response.json())
    .then(data => {

        //Getting the min and max values for each day
        for (i = 0; i < 7; i++) {
            document.getElementById("day" + (i + 1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min - 273.15).toFixed(1) + "°";
            //Number(1.3450001).toFixed(2); // 1.35
        }

        for (i = 0; i < 7; i++) {
            document.getElementById("day" + (i + 1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max - 273.15).toFixed(2) + "°";
        }
        //------------------------------------------------------------

        //Getting Weather Icons
        for (i = 0; i < 7; i++) {
            document.getElementById("img" + (i + 1)).src = "http://openweathermap.org/img/wn/10d@2x.png";
        }
        //------------------------------------------------------------
        console.log(data)


    })

    .catch(err => alert("Something Went Wrong: Try Checking Your Internet Coneciton"))
}

function DefaultScreen() {
    document.getElementById("cityInput").defaultValue = "صنعاء";
    GetInfo();
}


//Getting and displaying the text for the upcoming five days of the week
var d = new Date();
var weekday = ["الاحد", "الاثنين", "الثلاثاء", "الاربعاء", "الخميس", "الجمعة", "السبت"];

//Function to get the correct integer for the index of the days array
function CheckDay(day) {
    if (day + d.getDay() > 6) {
        return day + d.getDay() - 7;
    }
    else {
        return day + d.getDay();
    }
}

for (i = 0; i < 7; i++) {
    document.getElementById("day" + (i + 1)).innerHTML = weekday[CheckDay(i)];
}

//inst classes//

const ft = new Fetch();
const ui = new UI();

//add event listeners//

const search = document.getElementById("searchUser");
const button = document.getElementById("submit");
button.addEventListener("click", () => {
  const currentVal = search.value;

  ft.getCurrent(currentVal).then((data) => {
    //call a UI method//
    ui.populateUI(data);
    //call saveToLS
    ui.saveToLS(data);
  });
});

//event listener for local storage

window.addEventListener("DOMContentLoaded", () => {
  const dataSaved = ui.getFromLS();
  ui.populateUI(dataSaved);
});


