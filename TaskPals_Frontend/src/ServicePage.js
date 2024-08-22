import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ServicePage = () => {
  const { serviceId } = useParams();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch(`fetch('http://localhost:5000/api/providers?serviceId=${serviceId}`); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProviders(data);
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
    <div className="service-page">
      <h1>Providers for Service ID: {serviceId}</h1>
      <div className="providers">
        {providers.map((provider) => (
          <div key={provider.id} className="provider-card">
            <h2>{provider.name}</h2>
            <img src={provider.profileImage} alt={provider.name} />
            <p>{provider.bio}</p>
            <h3>Specialties: {provider.specialties.join(', ')}</h3>
            <h4>Rating: {provider.rating} ⭐</h4>
            <button onClick={() => alert(`Contacting ${provider.name}`)}>Contact</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicePage;