import { useParams, Link} from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';

function ProviderProfile(){
    const [providerDetails, setProviderDetails] = useState(null);
    const { provider_id } = useParams();
    
    useEffect(() => {
        const fetchSingleDetails = async () => {
            try {
                const {data} = await axios.get(`http://127.0.0.1:5000/api/providers/:provider_id`);
                setProviderDetails(data);
                
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

    return(
        <div>
        {providerDetails ? 
        ( <>
            <div className="container text-center">
            <div className="row">
            <div className="col-lg bg-danger-subtle m-1 rounded mb-5">
             <img src={providerDetails.profile_pic} alt="profile_pic" className="rounded-circle img-thumbnail m-2"></img>
             <div>
                <strong className="fs-1">{providerDetails.name}</strong>
             </div>
             <h5 className="fw-light text-danger">{providerDetails.job}</h5>
             <br />
             <i className="fa-solid fa-quote-left fa-2xl" style={{ color: 'goldenrod'}}></i>
             <div className="lh-1">
             <p className="text-center fw-medium m-2">{providerDetails.quote}</p>
             <figcaption className="fw-lighter">{providerDetails.quote_source}</figcaption>
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
            <a class="btn disabled placeholder col-7 border m-2" aria-disabled="true" style={{background: 'lightcoral'}}><i className="fa-solid fa-phone"></i> {providerDetails.phone}</a>
            <a class="btn disabled placeholder col-7 border m-1" aria-disabled="true" style={{background: 'lightcoral'}}><i className="fa-solid fa-envelope"></i> {providerDetails.email}</a>
            <a class="btn disabled placeholder col-7 border m-2" aria-disabled="true" style={{background: 'lightcoral'}}><i className="fa-brands fa-facebook"></i> {providerDetails.facebook}</a>
            <a className="btn disabled placeholder col-7 border m-1 mb-3" aria-disabled="true" style={{background: 'lightcoral'}}><i className="fa-brands fa-instagram"></i> {providerDetails.instagram}</a>
            </div>
            
            <div className="col-12 bg-danger-subtle mt-2 rounded">
            <h2 className="fw-medium text-start m-3">Experience</h2>
            <div className="progress m-4" role="progressbar">
                <div className="progress-bar w-25" style={{background: 'lightcoral'}}>{providerDetails.experience} Years</div>
            </div>
                <p className="m-3 fw-light">Jane has {providerDetails.experience} years of experience in being a {providerDetails.job}!</p>
            </div>
            </div>
            </div>
            <div className="col-lg bg-danger-subtle m-1 mb-5 rounded">
            <h2 className="fw-medium text-start m-3">Goals</h2>
                <ListGoals Goals={providerDetails.goals}/>
                <Link to="/Book">
                    <button className="btn" style={{backgroundColor: 'lightcoral'}}>Book Me</button>
                </Link>
                
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