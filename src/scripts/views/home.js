(tutorCenterApp => {

    var isLoaded;

    // Add the following method to app.homeView....
    // ** load()
    //      - if !isLoaded
    //            - get list of tutors from app.scheduler
    //            - select profiles container from html
    //            - select profiles template from html
    //            - iterate through tutors
    //                  for each tutur:
    //                  - create clone of profile template's content
    //                      - hint: let newNode = profileTemplate.content.cloneNode(true);
    //                  - select and populate clone's h2 element with tutor's name
    //                  - select and populate clone's p element with tutor's skills array
    //                      - hint: tutor.skills.map(x => `<span>${x}</span>`).join('')
    //                          - (individual spans allow for styling) 
    //                  - select clone's button element and bind click event to app.calendarView.load() (passing tutorId)
    //                  - append clone to profiles container
    //            - set isLoaded to true so the const list does not have to be loaded again 
    //      - invoke app._changeView to show homeView (regardless of isLoaded status)
    tutorCenterApp.homeView = {
        // Create a load method for homeView
        load: () => {
            if(!isLoaded){
                let tutors = tutorCenterApp.scheduler.getTutors(); // load tutor data
                let container = document.getElementById('cardList'); // profiles container
                let cardTemplate = document.getElementById('card'); // profiles template

                //var cardHtml='';
                //for(tutor in tutors){ // for each tutor
                tutors.forEach((tutor) => {
                    let newNode = cardTemplate.cloneNode(true); // copy the template node
                    //cardHtml = '<span class="card"><img src=""><h3>';//man</h3><p>skill Angular</p><button type="button">View Schedule</button></span>'
                    //cardHtml += tutor.name + '</h3><p>Skills:';
                    //newNode.querySelector('#tutorId').innerText = tutor.id;
                    newNode.querySelector('#tutorName').innerText = tutor.name; // 
                    for(var skill of tutor.skills){
                        newNode.querySelector('#tutorSkills').innerHTML += '<p>' + skill + '</p>';
                    }
                    //cardHtml += '</p><button type="button">View Schedule</button></span>';
                    container.appendChild(newNode); // inject clone into container
                    newNode.querySelector('#scheduleButton').onclick = () => tutorCenterApp.calendarView.load(tutor.id);

                })
            

                cardTemplate.style.display="none";
                isLoaded = true;
            }
            tutorCenterApp._changeView('homeView');
        }
    };// Create a homeView object
    

})(tutorCenterApp || (tutorCenterApp = {}));