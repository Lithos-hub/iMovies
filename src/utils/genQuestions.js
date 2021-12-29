import axios from 'axios';

class Utils {
    
    genQuestions = async () => {
        let questions = [];
        await axios
        .get('./triviaQTest.json')
        .then(res => {
            questions = res.data.questions
        })
        .catch(err => {
            console.log(err)
        })
        return questions
    }
}

export default new Utils;
