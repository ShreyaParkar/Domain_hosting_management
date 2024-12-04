import { useState, useEffect } from 'react';
import axios from 'axios';

const HostingForm = () => {
    const [mainWebsiteName, setMainWebsiteName] = useState('');
    const [providerId, setProviderId] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [comments, setComments] = useState('');
    const [websites, setWebsites] = useState('');
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
            await axios.post('/api/hostings', {
                main_website_name: mainWebsiteName,
                provider_id: providerId,
                expiry_date: expiryDate,
                comments,
                websites: websites.split(',').map(site => site.trim()) // Convert comma-separated list to array
            });
            setMainWebsiteName('');
            setProviderId('');
            setExpiryDate('');
            setComments('');
            setWebsites('');
            alert('Hosting added successfully!');
        } catch (error) {
            console.error('Error adding hosting:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Main Website Name:
                <input type="text" value={mainWebsiteName} onChange={(e) => setMainWebsiteName(e.target.value)} required />
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
            <label>
                Websites Hosted (comma-separated):
                <input type="text" value={websites} onChange={(e) => setWebsites(e.target.value)} />
            </label>
            <button type="submit">Add Hosting</button>
        </form>
    );
};

export default HostingForm;
