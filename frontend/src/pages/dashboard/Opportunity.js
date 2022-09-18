import TinderCard from 'react-tinder-card';

const Opportunity = ({ onSwipe, placeholder, videoURL, charityName, charityDescription }) => {
    if (placeholder === true) return (
        <TinderCard swipeThreshold={999} preventSwipe={['up', 'down', 'left', 'right']}><div className="opportunity">
            <div className="opportunity-video-container">
            <video className="opportunity-video" autoPlay muted loop>
                    {/* <source src="https://iliveinthe.uk/videos/volunteerhub/SAMPLEVIDEO3.mp4" type="video/mp4" />
                    Your browser does not support the video tag. */}
                </video>
            </div>
            <div className="opportunity-info">
                <h3>It looks like you've reached the end</h3>
                <p>Please come back later to see new postings</p>
            </div>
        </div></TinderCard>
    );
    return (
        <TinderCard onSwipe={onSwipe} swipeThreshold={250} preventSwipe={['up', 'down']}><div className="opportunity">
            <div className="opportunity-video-container">
                <video className="opportunity-video" autoPlay muted loop>
                    <source src={videoURL} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="opportunity-info">
                <h3>{charityName}</h3>
                <p>{charityDescription}</p>
            </div>
        </div></TinderCard>
    );
}

export default Opportunity;