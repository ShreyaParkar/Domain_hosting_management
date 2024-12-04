import HostingForm from '../components/HostingForm';
import HostingList from '../components/HostingList';

export default function Hostings() {
    return (
        <div className="container">
            <header>
                <h1>Hostings</h1>
            </header>
            <nav>
                <a href='/'>Home</a>
                <a href="/domains">Domains</a>
                <a href="/hostings">Hostings</a>
                <a href="/providers">Providers</a>
            </nav>
            <HostingForm />
            <HostingList />
        </div>
    );
}
