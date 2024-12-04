import { useState } from 'react';
import axios from 'axios';

export default function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState({ domains: [], hostings: [] });

    const handleSearch = async () => {
        try {
            const domainsRes = await axios.get('/api/domains');
            const hostingsRes = await axios.get('/api/hostings');
            setResults({
                domains: domainsRes.data.data.filter(domain => domain.domain_name.includes(searchTerm)),
                hostings: hostingsRes.data.data.filter(hosting => hosting.main_website_name.includes(searchTerm)),
            });
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <div className="container">
            <header>
                <h1>Domain & Hosting Manager</h1>
            </header>
            <nav>
                <a href='/'>Home</a>
                <a href="/domains">Domains</a>
                <a href="/hostings">Hostings</a>
                <a href="/providers">Providers</a>
            </nav>
            <div className="search-bar">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for domains or hostings..."
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div>
                <h2>Search Results</h2>
                <h3>Domains</h3>
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
                        {results.domains.map(domain => (
                            <tr key={domain._id}>
                                <td>{domain.domain_name}</td>
                                <td>{domain.provider ? domain.provider.name : 'Unknown'}</td>
                                <td>{new Date(domain.expiry_date).toLocaleDateString()}</td>
                                <td>{domain.comments || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h3>Hostings</h3>
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
                        {results.hostings.map(hosting => (
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
        </div>
    );
}
