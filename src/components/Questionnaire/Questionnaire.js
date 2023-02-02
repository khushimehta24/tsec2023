import React, { useEffect } from 'react'
import QuestionnaireServices from '../../services/QuestionnaireServices'
const Questionnaire = () => {
    useEffect(() => {
        const func = async () => {
            await QuestionnaireServices.getQuestions()
                .then((res) => {
                    console.log(res.data)
                })
        }
        func()
    }, [])

    return (
        <div>Questionnaire</div>
    )
}

export default Questionnaire