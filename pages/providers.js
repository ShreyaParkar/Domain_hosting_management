import ProviderForm from '../components/ProviderForm';
import ProviderList from '../components/ProviderList';

export default function Providers() {
    return (
        <div className="container">
            <header>
                <h1>Providers</h1>
            </header>
            <nav>
                <a href='/'>Home</a>
                <a href="/domains">Domains</a>
                <a href="/hostings">Hostings</a>
                <a href="/providers">Providers</a>
            </nav>
            <ProviderForm />
            <ProviderList />
        </div>
    );
}
