$(function(){
    $('#search-term').submit(function(event){
        event.preventDefault();
        var searchTermSt = $('#querySt').val();
        var searchTermCt = $('#queryCt').val();
        getRequest(searchTermSt, searchTermCt);
        console.log(searchTermSt, searchTermCt);
    })
});

function getRequest(searchTermSt, searchTermCt){
    url = 'http://api.wunderground.com/api/b06248e550ec9f58/forecast10day/q/' + searchTermSt + '/' + searchTermCt + '.json';
    console.log(url);
    $.getJSON(url, function(data){
        console.log(data);
        showResults(data.forecast.simpleforecast.forecastday);
        console.log(data.forecast.simpleforecast.forecastday);
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
    console.log(highs,lows,dates);
    chart(highs,lows,dates);
}

//CHARTS
function chart(highs,lows,dates){
var data = {
    labels: dates,
    datasets: [
        {
            label: "My First dataset",
            fill: false,
            backgroundColor: "rgba(255,205,86,0.4)",
            borderColor: "rgba(255,0,0,1)",
            pointBorderColor: "rgba(255,205,86,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(255,205,86,1)",
            pointHoverBorderColor: "rgba(255,205,86,1)",
            pointHoverBorderWidth: 2,
            data: highs
        },
        {
            label: "My Second dataset",
            fill: false,
            backgroundColor: "rgba(255,205,86,0.4)",
            borderColor: "rgba(0,0,255,1)",
            pointBorderColor: "rgba(255,205,86,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
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