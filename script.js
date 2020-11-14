
//globals
var hoursArray = ['9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm',
    '2:00pm', '3:00pm', '4:00pm', '5:00pm']

var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday', 'Sunday']

var currentBlockFound = false;
var blockObjArray;

$(document).ready(function () {
    init();
});

//init() initializes the program by creating any needed local storage and 
//          formatting the time blocks properly
function init() {

    //loop through the hours of the day
    var newTimeRow;
    for (var i = 0; i < hoursArray.length; i++) {
        //each hour gets its own row
        newTimeRow = $('<div></div>');
        $(newTimeRow).attr("id", hoursArray[i]);
        $(newTimeRow).attr("class", "row time-block");
        $(newTimeRow).attr("data-time", hoursArray[i]);

        //create 3 colums for each row
        //col #1 - just hour text
        var newCol = $('<div></div>');
        $(newCol).attr('class', 'col col-2 hour');
        $(newCol).text(hoursArray[i]);
        $(newTimeRow).append(newCol);

        //col #2 - div with a textarea for input
        newCol = $('<div></div>');

        //set class based on time
        var reqClass = getRequiredTimeClass(hoursArray[i], i); //returns- past  present or future
        $(newCol).attr('class', 'col col-8 ' + reqClass);
        $(newCol).append("<textarea id=\"" + i + "\"></textarea>");
        $(newTimeRow).append(newCol);

        //col #3 - div with <i> for a save button
        var newCol = $('<div></div>');
        $(newCol).attr('class', 'col col-2 saveBtn');
        $(newCol).html("<i class=\"far fa-save\"></i>")
        $(newTimeRow).append(newCol);

        //append the new row
        $("#timeBlockContainer").append(newTimeRow);
    }

    createLocalStorage();

    //display the current day
    var date = buildDateString();
    $("#currentDay").text(date);
}

$("#timeBlockContainer").on("click", function (event) {
    event.preventDefault();
    if (event.target.matches("i")) { //save icon clicked

        console.log(event.target.parentNode.parentNode)
        var targetGrandparent = event.target.parentNode.parentNode; //the time block the save was in
        var text = $(targetGrandparent).find("textarea").val();
        var targetId = $(targetGrandparent).attr('id');
        saveEvent(text, targetId);
    }

})

function saveEvent(text, target) {

    for (var i = 0; i < blockObjArray.length; i++) {
        if (blockObjArray[i].blockName === target) {
            blockObjArray[i].blockText = text;
        }
    }
    localStorage.setItem('todo', JSON.stringify(blockObjArray));
}

function createLocalStorage() {

    var array = [];
    var obj = JSON.parse(localStorage.getItem('todo'));

    if (obj != null) { //if exists load data and return
        blockObjArray = JSON.parse(localStorage.getItem('todo'));

        for (var i = 0; i < blockObjArray.length; i++) {
            $('#' + i).val(blockObjArray[i].blockText);
        }
        return;
    } //otherwise create the local data
    console.log("Creating local data");
    for (var i = 0; i < hoursArray.length; i++) {
        var newBlock = {
            blockName: hoursArray[i],
            blockText: "",
        }
        array.push(newBlock);
        // console.log(newBlock);
    }
    console.log(array);
    blockObjArray = array; //saves a copy globally if needed
    localStorage.setItem('todo', JSON.stringify(array));
}

function getRequiredTimeClass(timeBlock, index) {
    var currentTime = moment().format('h:mma');

    //format the times to compare them
    var formattedBlock = moment(timeBlock, 'h:mma');
    var formattedCurrentTime = moment(currentTime, "h:mma");
    var formattedNextBlock = moment(hoursArray[index + 1], 'h:mma');

    //pass i, if bewteen i and i+1 in hours, should be current time block
    // EX: if i -> 10:00am and current time is 10:30 then current is after i (10:00am) and before i+1 (11:00am)

    if (formattedBlock.isSame(formattedCurrentTime)) {
        return "present";

    } else if (formattedCurrentTime.isBetween(formattedBlock, formattedNextBlock)) {
        return "present";

    } else if (formattedBlock.isBefore(formattedCurrentTime)) {
        return "past";

    } else if (formattedBlock.isAfter(formattedCurrentTime)) {
        return "future";
    }

}

// buildDateString returns a usable string of todays date
function buildDateString() {
    var string = '';
    string = string + daysOfWeek[moment().day()] + ", ";
    string = string + moment().format('LL');
    return string;
}
