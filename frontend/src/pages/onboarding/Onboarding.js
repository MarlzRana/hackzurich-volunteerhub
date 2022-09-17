import { useState } from "react";
import FullQuestion from "./FullQuestion";
import SimpleQuestion from "./SimpleQuestion";
import Tags from "./Tags";
import "./onboarding.css";

const Onboarding = ({ type, questions }) => {
    const [currentQuestionNo, setCurrentQuestionNo] = useState(0);
    const [inputExists, setInputExists] = useState(false); // used to enforce required questions
    const finalQuestionNo = questions.length - 1;

    const currentQuestion = questions[currentQuestionNo];

    const nextStep = () => {
        if (!inputExists && currentQuestion.required) return alert("QUESTION IS REQUIRED, FILL IT IN");
        if (currentQuestionNo === finalQuestionNo) return alert("ONBOARDING DONE");
        setCurrentQuestionNo(currentQuestionNo + 1);
        setInputExists(false);
    }

    return (
        <div className="onboarding-page">
            <h1>{ type }</h1>
            
            <div className="onboarding-step">
                { 
                    currentQuestion.type === "full"
                    ? <FullQuestion name={currentQuestion.name} required={currentQuestion.required} setInputExists={setInputExists} placeholder={currentQuestion.placeholder} /> :
                    currentQuestion.type === "simple"
                    ? <SimpleQuestion /> :
                    currentQuestion.type === "tags"
                    ? <Tags name={currentQuestion.name} required={currentQuestion.required} setInputExists={setInputExists} /> : ""
                }
                <button onClick={nextStep}>{ currentQuestionNo === finalQuestionNo ? "Submit" : "Next Step"}</button>
            </div>

        </div>
    );
}

export default Onboarding;