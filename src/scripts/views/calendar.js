(tutorCenterApp => {

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday'];

    // Add the following method to app.calendarView....
    // ** load(tutorId)
    //      - load tutor from app.scheduler using tutorId 
    //      - select h2 tag and set it's text to 'Schedule for [[Tutor Name]]'
    //      - iteral through days collection (above)
    //            for each day:
    //              - get appointment (if there is one) from app.scheduler using tutor.id and day
    //              - select td from DOM (day should be the ID)
	//				- clear the contents of the td (needed later when navigating back to this screen)
    //              - if appt exists, bind name and notes to td's innerHTML
    //                  - else add 'Book Appointment' button to td that call app.appointmentView.load() (with tutorId and day)
    //      - invoke app._changeView to show calendarView
    tutorCenterApp.calendarView = {
        load: (tutorId) => {
            let tutor = tutorCenterApp.scheduler.getTutor(tutorId);
            document.getElementById("scheduleTutorName").innerHTML = "Schedule for " + tutor.name;


            /*var tbody = document.querySelector("#scheduleList");
            var rows = "";*/

            var businessDays = ["Monday", "Tuesday", "Wednesday", "Thursday"];

            var tutorCalendarTable = document.querySelector("#tutorCalendar");
            var template = tutorCalendarTable.querySelector("template");
            var tbody = tutorCalendarTable.querySelector("#scheduleList");

            // create a fragment so that the tags aren't rendered multiple times in the browser
            var fragment = document.createDocumentFragment();

            // determine what business day will be passed in on click

            for(var businessDay of businessDays){
                var clone = template.content.cloneNode(true); // clone the template

                var tr = clone.querySelector("tr");
                // get first TD in TR for days
                var dayTdTag = tr.querySelectorAll("td")[0];
                // create span for day
                var dateSpan = document.createElement('span');
                dateSpan.innerText = businessDay;
                dayTdTag.appendChild(dateSpan);

                // get second TD for TR for appointment
                var availabilityTdTag = tr.querySelectorAll("td")[1];

                if(!availabilityTdTag){
                    alert("null.");
                }

                let appointmentData = tutorCenterApp.scheduler.getAppointment(tutorId, businessDay);
                if(appointmentData){
                    let taken = document.createElement('span');
                    let name = document.createElement('h4');
                    let notes = document.createElement('p');
                    name.innerText = appointmentData.name;
                    notes.innerText = appointmentData.notes;
                    taken.appendChild(name);
                    taken.appendChild(notes);
                    availabilityTdTag.appendChild(taken);
                }else{
                    let btn = document.createElement('button');
                    btn.innerText = "Book Appointment";
                    //btn.onclick = () => tutorCenterApp.appointmentView.load(tutorId, businessDay);
                    btn.setAttribute('onclick', 'tutorCenterApp.appointmentView.load(' + tutorId + ',' + '\"' + businessDay + '\"' + ')');
                    availabilityTdTag.appendChild(btn);
                }

                

                fragment.appendChild(clone);
            }
            while(tbody.firstChild){
                tbody.removeChild(tbody.firstChild);
            }
            tbody.appendChild(fragment);

            /*for(businessDay of businessDays) {
                var appointmentHtml ="<button onclick=\"tutorCenterApp.appointmentView.load(" + tutorId + ", '" + businessDay + "')\">Book Appointment</button>"
                // TODO: if appointment exists on the business date for the tutor, then display the variable appointment with the appointment details
                let appointmentData = tutorCenterApp.scheduler.getAppointment(tutorId, businessDay);
                if(appointmentData){
                    appointmentHtml = "<div><h4>" + appointmentData.name + "</h4></div><div>" + appointmentData.notes + "</div>";
                }
                rows += '<tr><td>' + businessDay + '</td><td>' + appointmentHtml + '/</td></tr>';
            }*/

            //tbody.innerHTML = rows;

            tutorCenterApp._changeView('calendarView');
        }
    };

})(tutorCenterApp || (tutorCenterApp = {}));