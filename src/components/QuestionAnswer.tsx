"use client";

import { getGroqCompletion } from "@/ai/groq";
import { useEffect, useState } from "react";

export type Question = {
  id?: string;
  question: string;
  answers: string[];
  correct_answer: string;
  points: number;
};
export type Quiz = {
  id: string;
  host_player_name: string;
  status: string;
};
export type Player = {
  id: string;
  player_name: string;
  status: string;
  score: number;
  quiz_id: string;
};

export default function QuestionAnswer({
  onQuestion,
  onAnswer,
}: {
  onQuestion: (question: Question) => void;
  onAnswer: (question: Question, answer: string) => void;
}) {
  const [question, setQuestion] = useState<Question>();
  const [timer, setTimer] = useState<number>(30);
  const [selectedAnswer, setSelectedAnswer] = useState<number>();
  useEffect(() => {
    //create a new question when the time is at 0
    if (timer == 30) createQuestion();
    //create a new question every 30 seconds
    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    if (timer == 0) {
      //remove interval
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const createQuestion = async () => {
    try {
      //get groq to generate a theme for our question
      const theme = await getGroqCompletion(
        "Generate a theme for a gameshow question",
        100,
        ""
      );
      //get groq to generate a type of gameshow question
      const type = await getGroqCompletion(
        `The theme of a gameshow is ${theme}. Generate an engaging and interesting type of question for players to answer. 
    Don't generate the question yet, just think of a general type.`,
        100,
        ""
      );
      //get groq to generate a question
      const generatedQuestion = await getGroqCompletion(
        `The theme of a gameshow is ${theme}. The type of the question is ${type}. Generate a gameshow question for the players to answer.
        Output your response as a JSON object in the format {theme: string, type: string, question: string, points:number}`,
        100,
        "",
        true
      );

      const generatedJSON = JSON.parse(generatedQuestion);
      console.log(generatedJSON);
      setQuestion(generatedJSON.question);

      //get groq to generate a question
      const generatedAnswers = await getGroqCompletion(
        `The gameshow question is ${generatedJSON.question}. Generate 3 incorrect answers and 1 correct answer to the question. 
      Output your response as a JSON object in the format { "correct": "answer", "incorrect": ["answer1", "answer2", "answer3"] }`,
        100,
        "",
        true
      );

      const { correct, incorrect } = JSON.parse(generatedAnswers);
      const newQuestion = {
        question: generatedJSON.question,
        answers: [correct, ...incorrect].sort(() => Math.random() - 0.5),
        correct_answer: correct,
        points: generatedJSON.points,
      };

      setQuestion(newQuestion);
      onQuestion(newQuestion);
    } catch (e) {
      console.error(e);
      alert("failed to generate a question, try again");
    }
  };

  const handleAnswer = (answer: number) => {
    if (!question) return;
    setSelectedAnswer(answer);
    onAnswer(question, question.answers[answer]);
  };

  if (!question) return <p>Loading...</p>;
  return (
    <div className="flex flex-col w-full gap-4">
      {timer == 0 ? (
        <>
          <button
            className="p-2 bg-white rounded-lg border border-black/25 w-full hover:shadow "
            onClick={() => setTimer(30)}
          >
            Next Question
          </button>
          {selectedAnswer && question.answers && (
            <p>
              {question.answers[selectedAnswer] === question.correct_answer
                ? "Correct!"
                : "Wrong..."}
            </p>
          )}
        </>
      ) : (
        <p>Time: {timer}s</p>
      )}

      <QuizUI
        disabled={timer == 0}
        question={question}
        handleSelect={handleAnswer}
      />
    </div>
  );
}

export function QuizUI({
  disabled,
  question,
  handleSelect,
}: {
  disabled: boolean;
  question: Question;
  handleSelect: (i: number) => void;
}) {
  const [selectedAnswer, setSelectedAnswer] = useState<number>();
  useEffect(() => {
    setSelectedAnswer(undefined);
  }, [question]);
  return (
    <div className="flex flex-col w-full gap-4">
      <p>
        {question.question} ({question.points}pts)
      </p>
      <div className="flex flex-col gap-4">
        {question.answers?.map((a, i) => (
          <button
            key={i}
            onClick={() => {
              setSelectedAnswer(i);
              handleSelect(i);
            }}
            disabled={selectedAnswer !== undefined || disabled}
            className={`p-2 bg-white rounded-lg border border-black/25 w-full hover:shadow ${
              i === selectedAnswer ? "bg-blue-100" : ""
            }`}
          >
            {a}
          </button>
        ))}
      </div>
    </div>
  );
}
