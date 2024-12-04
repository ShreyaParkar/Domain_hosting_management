import { useEffect, useState } from 'react';
import axios from 'axios';

const DomainList = () => {
    const [domains, setDomains] = useState([]);

    useEffect(() => {
        const fetchDomains = async () => {
            try {
                const response = await axios.get('/api/domains');
                setDomains(response.data.data);
            } catch (error) {
                console.error('Error fetching domains:', error);
            }
        };

        fetchDomains();
    }, []);

    return (
        <div>
            <h2>Domains</h2>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Domain Name</th>
                        <th>Provider</th>
                        <th>Expiry Date</th>
                        <th>Comments</th>
                    </tr>
                </thead>
                <tbody>
                    {domains.map((domain) => (
                        <tr key={domain._id}>
                            <td>{domain.domain_name}</td>
                            <td>{domain.provider ? domain.provider.name : 'Unknown'}</td>
                            <td>{new Date(domain.expiry_date).toLocaleDateString()}</td>
                            <td>{domain.comments || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DomainList;
