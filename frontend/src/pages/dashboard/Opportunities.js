import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import Opportunity from './Opportunity';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const SweetAlert = withReactContent(Swal);

const Opportunities = () => {

    const cardRef = useRef();

    const onSwipe = (direction) => {
        if (direction === "right") {
            SweetAlert.fire({
                position: 'top-end',
                icon: 'success',
                title: 'You are now following this organisation',
                showConfirmButton: false,
                timer: 1500
              });
        }
        if (direction === "left" || direction === "down") {
            SweetAlert.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Alright, we won\'t recommend this event again',
                showConfirmButton: false,
                timer: 1500
              });
        }
    }

    // const handleCrossClick = e => {
    //     swipe('left');
    // }

    // const handleTickClick = e => {
    //     swipe('right');
    // }

    // const swipe = (direction) => {
    //     cardRef.current.swipe(direction);
    // }

    return (
        <div className="opportunities-container">
            <div className="opportunities-cross" >
                <FontAwesomeIcon icon={faXmark} />
            </div>

            <div className="cards-container">
                <Opportunity placeholder={true} onSwipe={onSwipe} />
                <Opportunity onSwipe={onSwipe}
                videoURL={"https://iliveinthe.uk/videos/volunteerhub/CANCER-RESEARCH.mp4"}
                charityName={"Cancer Research UK"}
                charityDescription={"Cancer Research UK is the world's largest independent cancer research organization. It is registered as a charity in..."}
                />
                <Opportunity onSwipe={onSwipe}
                videoURL={"https://iliveinthe.uk/videos/volunteerhub/WOODLARKS.mp4"}
                charityName={"Woodlarks Resort"}
                charityDescription={"Woodlarks exists so that anyone, whatever their disability, can have the fun and fellowship of affordable camping in a glorious setting"}
                />
                <Opportunity onSwipe={onSwipe}
                videoURL={"https://iliveinthe.uk/videos/volunteerhub/NATIONALTRUST.mp4"}
                charityName={"National Trust"}
                charityDescription={"We look after the places you love, from houses, buildings and gardens to coast and countryside. Join us and help protect them."}
                />
                <Opportunity onSwipe={onSwipe}
                videoURL={"https://iliveinthe.uk/videos/volunteerhub/HEARTFOUNDATION.mp4"}
                charityName={"British Heart Foundation"}
                charityDescription={"With your help, we harness the power of science to take on the world's biggest killers. And together, we give people more time with the ones they love."}
                />
            </div>

            <div className="opportunities-tick" >
                <FontAwesomeIcon icon={faCheck} />
            </div>
        </div>
    );
}

export default Opportunities;