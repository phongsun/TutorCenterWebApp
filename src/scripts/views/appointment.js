(tutorCenterApp => {

    let selected;

    // Add the following methods to app.appointmentView....
    // ** load(tutorId, day)
    //      - store tutorId and day on selected variable above 
    //      - load appointmentView using app._changeView 
    // ** save()
    //      - select DOM elements for name (input) and notes (textarea)
    //      - create new Appointment using values on selected variables and the form values submitted 
    //      - pass appointment to app.scheduler.saveAppointment
    //      - clear the two form element values
    //      - navigate back to calendar using app.calendarView.load with the selected tutorId
    tutorCenterApp.appointmentView = {
        load: (tutorId, day) => {
            document.getElementById('name').value="";
            document.getElementById('notes').value="";
            selected = {
                'tutorId': tutorId,
                'day': day
            };
            tutorCenterApp._changeView('appointmentView');
        },
        save: () => {
            let name = document.getElementById('name');
            let notes = document.getElementById('notes');

            if(name.value.trim() == "" || notes.value.trim() == ""){
                alert("Please enter both name and notes and then try again!");
            }else{
                tutorCenterApp.scheduler.saveAppointment(selected.tutorId, selected.day, name.value, notes.value);
                tutorCenterApp._changeView('homeView');
                let appointmentData = tutorCenterApp.scheduler.getAppointment(selected.tutorId, selected.day);
            }
        }
    };

})(tutorCenterApp || (tutorCenterApp = {}));