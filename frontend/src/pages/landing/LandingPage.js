import Header from './Header';
import "./landing-page.css";

const LandingPage = ({isLoggedIn}) => {
    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <div className="landing-hero">
                <div className="landing-hero-left">
                    <h2>Connecting Volunteers With Top-Tier Organisations</h2>
                    <p>We connect proactive volunteers with amazing organisations that are focussed on making the world a better place.</p>
                </div>
                <div className="landing-hero-right">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Love_Heart_SVG.svg/2258px-Love_Heart_SVG.svg.png" />
                </div>
            </div>
        </>
    );
}

export default LandingPage;