import Weather from './Weather';
import cloud from '../assets/cloud.svg';

function App() {
    return (
        <>
            <div className="header">
                <div className="header-left">
                    <img src={cloud} alt="" />
                    <h1>Weather by Leshamaybe</h1>
                </div>
                <div className="header-right">
                    <a href="https://github.com/leshamaybe">GitHub</a>
                </div>
            </div>

            <div className="App">
                <Weather />
            </div>
        </>
    );
}

export default App;
