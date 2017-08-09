/* A Document Ready in jQuery below */

$( document ).ready(function() {
    console.log( "Linked to timeCheck.js. Written with jQuery." );
});

/* A Document Ready in jQuery above */

//Reference to all gantry objects
var currentBlock = {
  vehicleType: "Passenger Cars/Light Goods Vehicles/Taxis",
  dayType: "Weekdays",
  gantryIDs: ["2"],
  startHour: charges.startHour,
  startMins: 30,
  endHour: 7,
  endMins: 54,
  chargeAmount: 3.50
};

//Returns a string representing whether it is a weekday, Saturday, or Sunday
function timeAndDayChecker(startHour,startMins,endHour,endMins) {

  function isWeekday() {
    var d = new Date();
    var dayOfWeek = new Array(7);

    dayOfWeek[0] = "Sunday";
    dayOfWeek[1] = "Weekdays";
    dayOfWeek[2] = "Weekdays";
    dayOfWeek[3] = "Weekdays";
    dayOfWeek[4] = "Weekdays";
    dayOfWeek[5] = "Weekdays";
    dayOfWeek[6] = "Saturday";

    var w = dayOfWeek[d.getDay()];
    return w;
  };

//Returns a number between 0 - 23 representing current hour in a 24 hour clock
  function hourIs() {
    var d = new Date();
    var h = d.getHours();
    return h;
  };

//Returns a number between 0 - 59 representing current minutes in a 24 hour clock
  function MinsIs() {
    var d = new Date();
    var m = d.getMinutes();
    return m;
  };

  //Checks which time block it is currently in
  function timeMatch(currentHour,currentMins,startHour,startMins,endHour,endMins) {
    if (currentHour >= startHour && startMins >= startMins && currentHour <= startHour && currentMins <= startMins) {
      return true;
    } else {
      return false;
    };
  };

  //Outputs the current time block
  return hourIs() + MinsIs() + startHour + startMins + endHour + endMins;

};
