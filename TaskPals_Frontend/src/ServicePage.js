import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ServicePage = () => {
  const { serviceId } = useParams();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/providers`, {
          params: { serviceId }
        });
        setProviders(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [serviceId]);

  if (loading) return <div>Loading providers...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <h1 className="my-4">Providers for Service ID: {serviceId}</h1>
      <div className="row">
        {providers.map((provider) => (
          <div key={provider.provider_id} className="col-md-4 mb-4">
            <div className="card">
              <img 
                src={provider.profile_image || 'default_profile_image_url_here.jpg'} 
                className="card-img-top" 
                alt={provider.name} 
              />
              <div className="card-body">
                <h5 className="card-title">{provider.name}</h5>
                <p className="card-text">{provider.bio}</p>
                <p className="card-text">
                  <strong>Specialties:</strong> {provider.specialties.join(', ')}
                </p>
                <p className="card-text">
                  <strong>Rating:</strong> {provider.rating} ⭐
                </p>
                <a href={`mailto:${provider.email}`} className="btn btn-primary">Contact</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicePage;