import { useState } from 'react';
import axios from 'axios';

const ProviderForm = () => {
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/providers', { name });
            setName('');
            alert('Provider added successfully!');
        } catch (error) {
            console.error('Error adding provider:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Provider Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <button type="submit">Add Provider</button>
        </form>
    );
};

export default ProviderForm;
