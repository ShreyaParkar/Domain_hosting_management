import DomainForm from '../components/DomainForm';
import DomainList from '../components/DomainList';

export default function Domains() {
    return (
        <div className="container">
            <header>
                <h1>Domains</h1>
            </header>
            <nav>
                <a href='/'>Home</a>
                <a href="/domains">Domains</a>
                <a href="/hostings">Hostings</a>
                <a href="/providers">Providers</a>
            </nav>
            <DomainForm />
            <DomainList />
        </div>
    );
}
