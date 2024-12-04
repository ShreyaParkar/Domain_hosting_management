import { useEffect, useState } from 'react';
import axios from 'axios';

const HostingList = () => {
    const [hostings, setHostings] = useState([]);

    useEffect(() => {
        const fetchHostings = async () => {
            try {
                const response = await axios.get('/api/hostings');
                setHostings(response.data.data);
            } catch (error) {
                console.error('Error fetching hostings:', error);
            }
        };

        fetchHostings();
    }, []);

    return (
        <div>
            <h2>Hostings</h2>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Main Website Name</th>
                        <th>Provider</th>
                        <th>Expiry Date</th>
                        <th>Hosted Websites</th>
                        <th>Comments</th>
                    </tr>
                </thead>
                <tbody>
                    {hostings.map((hosting) => (
                        <tr key={hosting._id}>
                            <td>{hosting.main_website_name}</td>
                            <td>{hosting.provider ? hosting.provider.name : 'Unknown'}</td>
                            <td>{new Date(hosting.expiry_date).toLocaleDateString()}</td>
                            <td>
                                {hosting.websites && hosting.websites.length > 0 
                                    ? hosting.websites.join(', ') 
                                    : 'None'}
                            </td>
                            <td>{hosting.comments || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HostingList;
