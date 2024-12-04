import { useEffect, useState } from 'react';
import axios from 'axios';

const ProviderList = () => {
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

    return (
        <div>
            <h2>Providers</h2>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Provider Name</th>
                    </tr>
                </thead>
                <tbody>
                    {providers.map((provider) => (
                        <tr key={provider._id}>
                            <td>{provider.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProviderList;
