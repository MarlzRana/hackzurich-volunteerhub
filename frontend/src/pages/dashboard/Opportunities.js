import { useRef } from 'react';
import TinderCard from 'react-tinder-card';

const Opportunities = () => {

    const cardRef = useRef();

    const onSwipe = (direction) => {
        if (direction === "right") alert("IT'S A MATCH!");
        if (direction === "left" || direction === "down") alert("NO!");
    }

    const handleCrossClick = e => {
        swipe('left');
    }

    const handleTickClick = e => {
        swipe('right');
    }

    const swipe = (direction) => {
        cardRef.current.swipe(direction);
    }

    return (
        <div className="opportunities-container">
            <div className="opportunities-cross" onClick={handleCrossClick}>
                CROSS
            </div>
            <TinderCard ref={cardRef} onSwipe={onSwipe} swipeThreshold={250} preventSwipe={['up', 'down']}><div className="opportunity">
                <div className="opportunity-video-container">
                    <video className="opportunity-video" autoPlay muted loop>
                        <source src="https://iliveinthe.uk/videos/volunteerhub/SAMPLE2.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="opportunity-info">
                    <h3>Charity Name</h3>
                    <p>This is some information about the charity showcased in the video lalalalalalal HAHAHAHAH</p>
                </div>
            </div></TinderCard>
            <div className="opportunities-tick" onClick={handleTickClick}>
                TICK
            </div>
        </div>
    );
}

export default Opportunities;