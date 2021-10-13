(tutorCenterApp => {

    // The "scheduler" is in charge of managing tutor schedules.

    // set properties: id, name and skills
    class Tutor {
        constructor(id, name, skills){
            this.id = id;
            this.name = name;
            this.skills = skills;
        }
    }

    // set properties: tutorId, day, name and notes
    class Appointment {
        constructor(tutorId, day, name, notes){
            this.tutorId = tutorId;
            this.day = day;
            this.name = name;
            this.notes = notes;
        }
    }

    tutorCenterApp.Tutor = Tutor;
    tutorCenterApp.Appointment = Appointment;

    const tutors = [
        new Tutor(1, "John", [".NET", "Angular"]),
        new Tutor(2, "David", ["React", "Node"]),
        new Tutor(3, "Karen", ["Angular", "View"]),
        new Tutor(4, "Janet", ["REST Services", "SQL"]),
        new Tutor(5, "David", [".NET"])
    ];

    let appointments = [
        new Appointment(1, 'Monday', 'Sally', 'I need lots of Angular help!')
    ];

    tutorCenterApp.scheduler = {
        getTutors: function(){
            // ** getTutors() - returns all tutors
            return tutors;
        },
        getTutor: function(tutorId){
            // ** getTutor(tutorId) - return tutor with given Id
            return tutors.find(function(tutors){
                return tutors.id == tutorId;
            });
            
        },
        getAppointments: function(){
            // ** getAppointments() - return all appointments
            return appointments;

        },
        getAppointment: function(tutorId, day){
            // ** getAppointment(tutorId, day) - return all appointments for given tutor and day

            return appointments.find( ( appointment ) => appointment.tutorId == tutorId && appointment.day == day);

        },
        saveAppointment: function(tutorId, day, input, notes){
            // ** saveAppointment(appt) - add passed appointment to local variable
            appt = new Appointment(tutorId, day, input, notes);
            appointments.push(appt);

        }

    };

})(tutorCenterApp || (tutorCenterApp = {}));