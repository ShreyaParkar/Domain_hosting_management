import { useState, useEffect } from 'react';
import axios from 'axios';

const DomainForm = () => {
    const [domainName, setDomainName] = useState('');
    const [providerId, setProviderId] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [comments, setComments] = useState('');
    const [providers, setProviders] = useState([]);

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const response = await axios.get('/api/providers');
                setProviders(response.data.data);
            } catch (error) {
                console.error('Error fetching providers:', error);
            }
        };

        fetchProviders();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/domains', {
                domain_name: domainName,
                provider_id: providerId,
                expiry_date: expiryDate,
                comments,
            });
            setDomainName('');
            setProviderId('');
            setExpiryDate('');
            setComments('');
            alert('Domain added successfully!');
        } catch (error) {
            console.error('Error adding domain:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Domain Name:
                <input type="text" value={domainName} onChange={(e) => setDomainName(e.target.value)} required />
            </label>
            <label>
                Provider:
                <select value={providerId} onChange={(e) => setProviderId(e.target.value)} required>
                    <option value="">Select Provider</option>
                    {providers.map((provider) => (
                        <option key={provider._id} value={provider._id}>{provider.name}</option>
                    ))}
                </select>
            </label>
            <label>
                Expiry Date:
                <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
            </label>
            <label>
                Comments:
                <textarea value={comments} onChange={(e) => setComments(e.target.value)} />
            </label>
            <button type="submit">Add Domain</button>
        </form>
    );
};

export default DomainForm;
