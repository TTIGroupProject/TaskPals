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
    }, [provider_id]);

    return(
        <div>
        {providerDetails ? 
        (<div className="card" style="width: 20rem;" {...providerDetails}>
                <img src={providerDetails.profile_image} alt={providerDetails.name} className="card-img-top"/>
                <div className="card-body">
                <h5 className="card-title">{providerDetails.name}</h5>
                    <p className="card-text">Example Text</p>
                <a className="btn btn-secondary">
                    <Link to={`/Book`}>Book Now</Link>
                </a>
                </div>
            </div>) : (<div>
                <strong role="status" className="d-flex justify-content-center m-5 fs-1 font-monospace">Loading Provider Details..</strong>
                <div className="d-flex justify-content-center">
                        <div class="spinner-grow text-primary p-4 m-2" role="status">
                        <span class="visually-hidden"></span>
                      </div>
                      <div class="spinner-grow text-secondary p-4 m-2" role="status">
                        <span class="visually-hidden"></span>
                      </div>
                      <div class="spinner-grow text-info p-4 m-2" role="status">
                        <span class="visually-hidden"></span>
                      </div>
                      </div>
                      </div>)
        }
    </div>
    )
}

export default ProviderProfile;