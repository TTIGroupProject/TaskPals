import React, { useState, useEffect } from 'react';

const CustomerProfile = () => {
    const [customer, setCustomer] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [orders, setOrders] = useState([]); // State for past orders

    useEffect(() => {
        fetchCustomerData();  // Get customer data from the API
        fetchPastOrders(); // Fetch past orders
    }, []);

    const fetchCustomerData = async () => {
        const response = await fetch('http://localhost:5000/api/customers/profile'); 
        const data = await response.json();
        setCustomer(data);
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
    };

    const fetchPastOrders = async () => {
        const response = await fetch('http://localhost:5000/api/customers/orders'); // 
        const data = await response.json();
        setOrders(data);
    };

    const handleProfileUpdate = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:5000/api/customers/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, phone }),
        });

        if (response.ok) {
            setMessage('Profile updated successfully!');
            fetchCustomerData(); // Refresh data
        } else {
            setMessage('Error updating profile.');
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">{customer.name}'s Profile</h1>
            <form onSubmit={handleProfileUpdate} className="mb-5">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Update Profile</button>
            </form>
            {message && <p className="alert alert-info">{message}</p>}

            <h2>Your Past Orders</h2>
            <div className="row">
                {orders.length > 0 ? (
                    orders.map(order => (
                        <div className="col-md-4 mb-4" key={order.id}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{order.serviceName}</h5>
                                    <p className="card-text">Order ID: {order.id}</p>
                                    <p className="card-text">Date: {new Date(order.date).toLocaleDateString()}</p>
                                    <p className="card-text">Status: {order.status}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No past orders available.</p>
                )}
            </div>
        </div>
    );
};

export default CustomerProfile;