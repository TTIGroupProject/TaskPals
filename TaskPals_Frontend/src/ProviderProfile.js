import React from "react";
import { useParams, Link} from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';

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
function ProviderProfile(){
    const [slots, setSlots] = useState([]);
    const [dates, setDates] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const today = new Date();
    const [providerDetails, setProviderDetails] = useState(null);
    const { provider_id } = useParams();
    
    useEffect(() => {
        const fetchSingleDetails = async () => {
            try {
                const {data} = await axios.get(`http://127.0.0.1:5000/api/provider/${provider_id}`);
                setProviderDetails(data);
                console.log('provider',data)
            }catch(error){
                console.error(error)
            }
        };
        fetchSingleDetails();
        function ListGoals(props){
            const Goals = props.Goals
            const list = Goals.map((goal) =>
            <li><i className="fa-solid fa-circle fa-xs" style={{color: 'lightcoral'}}></i> {goal}</li>)
            return(
                <div>
                    <ul className="m-3 text-start list-unstyled">{list}</ul>
                </div>
            )

        }
    }, [provider_id]);

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
    

    return(
        <div>
        {providerDetails ? 
        ( <>
            <div className="container text-center">
            <div className="row">
            <div className="col-lg bg-danger-subtle m-1 rounded mb-5">
             <img src={providerDetails.profile_image || 'https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg'} alt="profile_pic" className="rounded-circle img-thumbnail m-2"></img>
             <div>
                <strong className="fs-1">{providerDetails.firstName} {providerDetails.lastName}</strong>
             </div>
             <h5 className="fw-light text-danger">{providerDetails.jobApplyingFor}</h5>
             <br />
             <i className="fa-solid fa-quote-left fa-2xl" style={{ color: 'goldenrod'}}></i>
             <div className="lh-1">
             <p className="text-center fw-medium m-2">As a TaskPals Provider I am here for You</p>
             <figcaption className="fw-lighter">-{providerDetails.firstName} {providerDetails.lastName}</figcaption>
             </div>
             <br />
             <div className="p-3 rounded" style={{background: 'lightcoral'}}>
             <h3 className="m-2 fw-medium text-start">My Rating</h3>
             <div className="p-3">
             <i className="fa-solid fa-star fa-xl m-1" style={{color: 'gold'}}></i>
             <i className="fa-solid fa-star fa-xl m-1" style={{color: 'gold'}}></i>
             <i className="fa-solid fa-star fa-xl m-1" style={{color: 'gold'}}></i>
             <i className="fa-solid fa-star fa-xl m-1" style={{color: 'gold'}}></i>
             <i className="fa-solid fa-star fa-xl m-1" style={{color: 'gold'}}></i>
             </div>
             <h6 className="fw-lighter">TaskPalsVerified <i className="fa-regular fa-circle-check"></i></h6>
             
             </div>
             <br />
            </div>
            <div className="col-lg m-1">
            <div className="row">
                <div className="col-12 bg-danger-subtle rounded">
                <h2 className="m-3 fw-medium text-start">Bio</h2>
                <p className="text-center m-2 fw-light mb-4">{providerDetails.bio}</p>
                </div>
            <div className="col-12 bg-danger-subtle mt-2 rounded">
            <h2 className="m-3 fw-medium text-start">Contact Me</h2>
            <a className="btn disabled placeholder col-7 border m-2" aria-disabled="true" style={{background: 'lightcoral'}}><i className="fa-solid fa-phone"></i> {providerDetails.phoneNumber}</a>
            <a className="btn disabled placeholder col-7 border m-1" aria-disabled="true" style={{background: 'lightcoral'}}><i className="fa-solid fa-envelope"></i> {providerDetails.email}</a>
            <a className="btn disabled placeholder col-7 border m-2" aria-disabled="true" style={{background: 'lightcoral'}}><i className="fa-brands fa-facebook"></i> needs facebook </a>
            <a className="btn disabled placeholder col-7 border m-1 mb-3" aria-disabled="true" style={{background: 'lightcoral'}}><i className="fa-brands fa-instagram"></i> needs instagram</a>
            </div>
            
            <div className="col-12 bg-danger-subtle mt-2 rounded">
            <h2 className="fw-medium text-start m-3">Experience</h2>
            <div className="progress m-4" role="progressbar">
                <div className="progress-bar w-25" style={{background: 'lightcoral'}}>{providerDetails.experience} Years</div>
            </div>
                <p className="m-3 fw-light">{providerDetails.firstname} has {providerDetails.experience} years of experience in being a {providerDetails.jobApplyingFor}!</p>
            </div>
            </div>
            </div>
            <div className="col-lg bg-danger-subtle m-1 mb-5 rounded">
            <h2 className="fw-medium text-start m-3">Goals</h2>
                <ul className="text-start">
                    <li>Commit to continuous learning and development by exploring new techniques, tools, and methods relevant to your field. Whether it's through formal education, on-the-job training, or self-directed learning, aim to expand your expertise to stay ahead in your profession. </li>
                    <li>Identify opportunities to streamline your work processes, minimize time spent on repetitive tasks, and maximize output. This could involve adopting new technologies, refining your workflow, or developing better time management strategies to achieve more in less time.</li>
                    <li>Invest time in building meaningful connections with colleagues, clients, and other stakeholders. Effective communication, collaboration, and networking can open doors to new opportunities, enhance teamwork, and create a more supportive and productive work environment.</li>
                    <li>Strive to achieve a balance between your professional responsibilities and personal life to avoid burnout. Set clear boundaries, prioritize self-care, and make time for activities and relationships that bring you joy and relaxation outside of work.</li>
                </ul>
                <button className="btn" style={{backgroundColor: 'lightcoral'}} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Book Me</button>

                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header">
            <button type="button" className="btn-warning btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <h5 className="text-center">Chose A Day</h5>
                <select className="form-select" aria-label="Default select example" onChange={handleDateChange}>
                    <option>Select</option>
                        {dates.map((date, index) => {
                            return(<option key={index} value={date.toISOString()}>{getDate(date)}</option>);
                        })}
                </select>
                <br/>
                <span className="input-group-text">You Chose: {getDate(new Date(selectedDate))}</span>
                <br/>
                <h5 className="text-center">Chose A Time</h5>
                <select className="form-select" aria-label="Default select example" onChange={handleTimeChange}>
                        <option>Select</option>
                        {slots.map((slot, index) => {
                        return(
                            <option key={index} value={getTime(slot)}>{getTime(slot)}</option>
                        );
                        })}
                </select>
                <br/>
                <span className="input-group-text">You Chose: {selectedTime}</span>
                <br/>
                <div className="d-grid"><button type="submit" className="btn btn-lg" style={{background: 'lightcoral'}}>Book</button></div>
            </div>
            </div>
                
            </div>
            </div>
            </div>

        </>) : (<>
            <div className="container text-center">
            <div className="row">
            <div className="col-lg bg-danger-subtle m-1 rounded mb-5">
             <h2>Loading Provider Profile...</h2>
            </div>
            </div>
            <div className="row">
                <div className="col-12 bg-danger-subtle rounded">
                <h2>Loading Provider Bio...</h2>
                </div>
            <div className="col-12 bg-danger-subtle mt-2 rounded">
            <h2>Loading Provider Contact Info...</h2>
            </div>
            
            <div className="col-12 bg-danger-subtle mt-2 rounded">
            <h2>Loading Provider Experience...</h2>
            </div>
            <div className="col-lg bg-danger-subtle m-1 mb-5 rounded">
            <h2>Loading Provider Goals...</h2>
            </div>
            </div>
            </div>

        </>)
        }
    </div>
    )
}

export default ProviderProfile;