import React, { useState, useEffect} from "react";

function getDate(date) {
    const options = {
        weekday: 'long', 
        month: 'long',   
        day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
}

function getTime(date) {
    const options = {
        hour: '2-digit', 
        minute: '2-digit',   
        hour12: true
    };
    return date.toLocaleTimeString('en-US', options);
}

function generateHalfHourSlotsForDay(date){
    const slots = [];
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(startOfDay);
    endOfDay.setHours(23, 59, 59, 999);

    let slot = new Date(startOfDay);
    while (slot <= endOfDay){
        slots.push(new Date(slot));
        slot.setMinutes(slot.getMinutes() + 30)
    }
    return slots;
};

function generateHalfHourSlotsFromNow(){
    const slots = [];
    const now = new Date();

    const roundedMinutes = Math.ceil(now.getMinutes() / 30) * 30;
    const closestHalfHour = new Date(now);
    closestHalfHour.setMinutes(roundedMinutes);
    closestHalfHour.setSeconds(0);
    closestHalfHour.setMilliseconds(0);

    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999)

    while (closestHalfHour <= endOfDay){
        slots.push(new Date(closestHalfHour));
        closestHalfHour.setMinutes(closestHalfHour.getMinutes() + 30);
    }
    return slots;
}


function BookingForm(){
    const [slots, setSlots] = useState([]);
    const [dates, setDates] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const today = new Date();
    
    useEffect(() => {
    
    const dateArray = [];
    for (let i = 0; i <= 7; i++) {
        const nextDate = new Date(today);
        nextDate.setDate(today.getDate() + i);
        dateArray.push(nextDate);
    }
    setDates(dateArray);
}, []);

    useEffect(() => {
        if(selectedDate) {
            const selectedDateObject = new Date(selectedDate);
            if (selectedDateObject.toDateString() === today.toDateString()) {
                setSlots(generateHalfHourSlotsFromNow());
            } else {
                setSlots(generateHalfHourSlotsForDay(selectedDateObject));
            }
        } else {
            setSlots([]);
        }
    }, [selectedDate])

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    };


    return (
        <div>
            <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Book Now</button>

            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header">
            <button type="button" className="btn-warning btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <h5 className="text-center">Chose A Day</h5>
                <select className="form-select" aria-label="Default select example" onChange={handleDateChange}>
                        {dates.map((date, index) => {
                            return(<option key={index} value={date.toISOString()}>{getDate(date)}</option>);
                        })}
                </select>
                <br/>
                <span className="input-group-text">You Chose: {getDate(new Date(selectedDate))}</span>
                <br/>
                <h5 className="text-center">Chose A Time</h5>
                <select className="form-select" aria-label="Default select example" onChange={handleTimeChange}>
                        <option>Choose A Time</option>
                        {slots.map((slot, index) => {
                        return(
                            <option key={index} value={getTime(slot)}>{getTime(slot)}</option>
                        );
                        })}
                </select>
                <br/>
                <span className="input-group-text">You Chose: {selectedTime}</span>
                <br/>
                <div className="d-grid"><button type="submit" className="btn btn-lg btn-secondary">Book</button></div>
            </div>
            </div>
    </div>
    );
}

export default BookingForm;