import axios from "axios";

class Utils {
  genQuestions = async () => {
    let questions = [];
    let uniqueQuestions = [];
    await axios
      .get("./triviaQ.json")
      .then((res) => {
        questions = res.data.questions;

        const flags = new Set();

        uniqueQuestions = questions.filter((question) => {
          if (flags.has(question.question)) return false;
          flags.add(question.question);
          return true;
        });
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(uniqueQuestions);
    return uniqueQuestions
  };
}

export default new Utils();
