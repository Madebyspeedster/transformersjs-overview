import { useState } from "react";
import { pipeline } from "@huggingface/transformers";

const QuestionAnswering = () => {
  const [question, setQuestion] = useState();
  const [context, setContext] = useState();
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleContextChange = (event) => {
    setContext(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!question || !context) {
      return;
    }

    setLoading(true);
    setAnswer(null);

    try {
      const qaPipeline = await pipeline(
        "question-answering",
        "Xenova/distilbert-base-cased-distilled-squad"
      );

      const result = await qaPipeline(question, context);

      setAnswer(result.answer);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Question Answering</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="questionInput">Question</label>
          <input
            type="text"
            id="questionInput"
            value={question}
            onChange={handleQuestionChange}
            placeholder="Enter your question here"
          />
        </div>

        <div>
          <label htmlFor="contextInput">Context</label>
          <textarea
            id="contextInput"
            rows="4"
            value={context}
            onChange={handleContextChange}
            placeholder="Enter the text from which the answer is extracted"
          ></textarea>
        </div>

        <button type="submit" disabled={loading}>
          <span>{loading ? "Processing..." : "Submit"}</span>
        </button>
      </form>

      {answer && (
        <div id="answer">
          <h4>Answer:</h4>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default QuestionAnswering;
