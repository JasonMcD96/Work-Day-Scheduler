
//globals
var hoursArray = ['9am', '10am', '11am', '12pm', '1pm',
'2pm', '3pm', '4pm', '5pm']

init();


// ------- IMPORTANT --------
// $("#9am").find("textarea").css("background-color", "pink");


//init() initializes the program
function init(){
   
    //loop through the hours of the day
    var newTimeRow;
    for(var i = 0; i < hoursArray.length; i++){
        //each hour gets its own row
        newTimeRow = $('<div></div>');
        $(newTimeRow).attr("id", hoursArray[i]);
        $(newTimeRow).attr("class", "row time-block");

        //create 3 colums for each row
        //col #1 - just hour text
        var newCol = $('<div></div>');
        $(newCol).attr('class', 'col col-2 hour');
        $(newCol).text(hoursArray[i]);
        $(newTimeRow).append(newCol);

        //col #2 - div with a textarea for input
        newCol = $('<div></div>');
        $(newCol).attr('class', 'col col-8 past');
        $(newCol).append("<textarea></textarea>");
        $(newTimeRow).append(newCol);

        //col #3 - div with <i> for a save button
        var newCol = $('<div></div>');
        $(newCol).attr('class', 'col col-2 saveBtn');
        $(newCol).html("<i class=\"far fa-save\"></i>")
        $(newTimeRow).append(newCol);
        $("#timeBlockContainer").append(newTimeRow);
             
    }
}