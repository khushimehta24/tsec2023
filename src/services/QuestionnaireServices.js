import httpCommon from "../http-common";

const getQuestions = () => {
    return httpCommon.get(`/user/questions`);
};

const submitAnswers = (data) => {
    return httpCommon.post(`/user/questionnaire`, data);
};

export default {
    getQuestions,
    submitAnswers
}