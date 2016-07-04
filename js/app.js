$(function(){
    $('#search-term').submit(function(event){
        event.preventDefault();
        var searchTermSt = $('#querySt').val();
        var searchTermCt = $('#queryCt').val();
        getRequest(searchTermSt, searchTermCt);
//        console.log(searchTermSt, searchTermCt);
    })
});

function getRequest(searchTermSt, searchTermCt){
    url = 'http://api.wunderground.com/api/b06248e550ec9f58/forecast10day/q/' + searchTermSt + '/' + searchTermCt + '.json';
//    console.log(url);
    $.getJSON(url, function(data){
//        console.log(data);
        showResults(data.forecast.simpleforecast.forecastday);
//        console.log(data.forecast.simpleforecast.forecastday);
    });
}

function showResults(results){
    var highs = [];
    var lows = [];
    var dates = [];
    $.each(results, function(index,value){
        highs.push(value.high.fahrenheit);
        lows.push(value.low.fahrenheit);
        dates.push("'" + value.date.month + "/" + value.date.day + ", " + value.date.weekday_short + "'")
    })
//    console.log(highs,lows,dates);
    chart(highs,lows,dates);
    $('#myLineChart').fadeIn(1000);
}

//CHARTS
function chart(highs,lows,dates){
var data = {
    labels: dates,
    datasets: [
        {
            label: "High",
            fill: false,
            backgroundColor: "#f44336",
            borderColor: "#d50000",
            pointBorderColor: "#212121",
            pointBackgroundColor: "#bf360c",
            pointBorderWidth: 3,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(255,205,86,1)",
            pointHoverBorderColor: "rgba(255,205,86,1)",
            pointHoverBorderWidth: 2,
            data: highs
        },
        {
            label: "Low",
            fill: false,
            backgroundColor: "00b0ff",
            borderColor: "#2962ff",
            pointBorderColor: "#0d47a1",
            pointBackgroundColor: "#212121",
            pointBorderWidth: 3,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(255,205,86,1)",
            pointHoverBorderColor: "rgba(255,205,86,1)",
            pointHoverBorderWidth: 2,
            data: lows
        }
    ]
};
    
    var ctx = document.getElementById("myLineChart");
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: data
    });
};