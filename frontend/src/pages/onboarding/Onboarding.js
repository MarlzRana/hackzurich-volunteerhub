import { useEffect, useState } from "react";
import FullQuestion from "./FullQuestion";
import SimpleQuestion from "./SimpleQuestion";
import Tags from "./Tags";
import "./onboarding.css";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { saveOrganisationBio, saveOrganisationLocations, saveOrganisationName, saveOrganisationTags } from "../../services/user.service";
import UploadImage from "./UploadImage";

const SweetAlert = withReactContent(Swal);

const Onboarding = ({ type, questions, isLoggedIn }) => {
    let navigate = useNavigate();
    
    // REMEMBER TO UNCOMMENT!
    // useEffect(() => {
    //     if (!isLoggedIn) navigate("/");
    // });

    const [currentQuestionNo, setCurrentQuestionNo] = useState(0);
    const [inputExists, setInputExists] = useState(false); // used to enforce required questions
    const [dataToSave, setDataToSave] = useState(false);
    const finalQuestionNo = questions.length - 1;

    const currentQuestion = questions[currentQuestionNo];

    const nextStep = () => {
        // check if required
        if (!inputExists && currentQuestion.required) return SweetAlert.fire({icon: "info", title: "This question is required", text: "Please complete it and continue"});

        // save current step
        if (type === "charity") {
            if (currentQuestion.api === "name") saveOrganisationName(dataToSave);
            if (currentQuestion.api === "bio") saveOrganisationBio(dataToSave);
            if (currentQuestion.api === "tags") saveOrganisationTags(dataToSave);
            if (currentQuestion.api === "location") saveOrganisationLocations(dataToSave);
        } else {
            // type is user
        }

        // check if question is done
        if (currentQuestionNo === finalQuestionNo) return SweetAlert.fire({icon: "success", title: "Onboarding Complete!", text: "Information saved successfully"}).then(res => navigate("/dashboard"));
        setCurrentQuestionNo(currentQuestionNo + 1);
        setInputExists(false);
    }

    return (
        <div className="onboarding-page">
            <h1>{ type }</h1>
            
            <div className="onboarding-step">
                { 
                    currentQuestion.type === "full"
                    ? <FullQuestion setDataToSave={setDataToSave} name={currentQuestion.name} required={currentQuestion.required} setInputExists={setInputExists} placeholder={currentQuestion.placeholder} /> :
                    currentQuestion.type === "simple"
                    ? <SimpleQuestion setDataToSave={setDataToSave} name={currentQuestion.name} required={currentQuestion.required} setInputExists={setInputExists} placeholder={currentQuestion.placeholder} /> :
                    currentQuestion.type === "tags"
                    ? <Tags setDataToSave={setDataToSave} name={currentQuestion.name} required={currentQuestion.required} setInputExists={setInputExists} /> :
                    currentQuestion.type === "image"
                    ? <UploadImage setDataToSave={setDataToSave} name={currentQuestion.name} required={currentQuestion.required} setInputExists={setInputExists} /> : ""
                }
                <button onClick={nextStep}>{ currentQuestionNo === finalQuestionNo ? "Submit" : "Next Step"}</button>
            </div>

        </div>
    );
}

export default Onboarding;