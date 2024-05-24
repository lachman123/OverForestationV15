"use client";
import { useEffect, useState } from "react";
import supabase from "@/supabase/supabaseClient";
import QuestionAnswer, {
  Player,
  Question,
  Quiz,
  QuizUI,
} from "@/components/QuestionAnswer";

export default function GameshowPage() {
  const [playerName, setPlayerName] = useState<string>("");
  const [availableGames, setAvailableGames] = useState<Quiz[]>([]);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [player, setPlayer] = useState<Player | null>(null);
  const [players, setPlayers] = useState<any[]>([]);
  const [question, setQuestion] = useState<Question>();
  const [answer, setAnswer] = useState<string>("");
  const [timer, setTimer] = useState<number>(30);

  const getGames = async () => {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { data, error } = await supabase
      .from("quiz")
      .select()
      .eq("status", "lobby")
      .gte("created_at", fiveMinutesAgo);
    if (data) setAvailableGames(data);
  };

  useEffect(() => {
    //Get all games in lobby status that were created in the last 5 mins
    getGames();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    if (timer == 0) {
      //remove interval
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    //Get connected players and show them
    if (!quiz) return;
    const playerChannel = supabase
      .channel("players")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "player" },
        (payload) => {
          const player = payload.new;
          console.log(player);
          if (player.quiz_id === quiz.id) setPlayers([...players, payload.new]);
        }
      )
      .subscribe();

    const questionChannel = supabase
      .channel("players")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "question" },
        (payload) => {
          const newQuestion = payload.new;
          if (newQuestion.quiz_id === quiz.id) {
            if (question && answer == "") {
              //player didn't answer, they need to lose
              handleNoAnswer();
            } else {
              setAnswer("");
              setQuestion(newQuestion as Question);
              setTimer(30);
            }
          }
        }
      )
      .subscribe();

    return () => {
      playerChannel.unsubscribe();
    };
  }, [quiz]);

  const joinGame = (i: number) => {
    console.log(availableGames);
    console.log(availableGames[i]);
    setQuiz(availableGames[i]);
  };

  const createPlayer = async () => {
    //Create new player in supabase
    const { data, error } = await supabase
      .from("player")
      .insert({
        player_name: playerName,
        status: "playing",
        score: 0,
        quiz_id: quiz?.id,
      })
      .select()
      .single();
    if (data) setPlayer(data);
  };

  const handleNoAnswer = async () => {
    if (!player) return;
    await supabase
      .from("player")
      .update({
        status: "lost",
      })
      .eq("id", player.id);
  };

  const handleAnswer = async (i: number) => {
    //send the answer to supabase
    if (!question || !player || !quiz) return;

    const answer = {
      player_answer: question.answers[i],
      quiz_id: quiz.id,
      question_id: question.id,
      player_id: player.id,
    };

    //update our answer state
    setAnswer(question.answers[i]);

    const { data, error } = await supabase
      .from("answer")
      .insert(answer)
      .select()
      .single();

    //update the player
    const correct = question.answers[i] !== question.correct_answer;
    if (question.answers[i] !== question.correct_answer) {
      const { data, error } = await supabase
        .from("player")
        .update({
          score: player.score + (correct ? question.points : 0),
          status: correct ? "playing" : "lost",
        })
        .eq("id", player.id)
        .single();

      if (data) setPlayer(data);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-start justify-between font-mono text-sm lg:flex gap-4 ">
        <div className="flex flex-col gap-4 w-full">
          <h1>Join{quiz && `ed ${quiz.host_player_name}s`} Game</h1>
          {!quiz && (
            <div className="flex flex-col gap-2">
              <button
                onClick={getGames}
                className="p-2 border rounded-lg bg-white mb-2 w-full hover:shadow"
              >
                Refresh
              </button>
              <div className="text-xs font-semibold">Available Games</div>
              {availableGames.map((game, i) => (
                <button
                  className="hover:shadow bg-white p-2 rounded-lg"
                  key={i}
                  onClick={() => joinGame(i)}
                >
                  {game.host_player_name}s Game
                </button>
              ))}
            </div>
          )}
          {!player && quiz && (
            <div className="flex flex-col gap-4">
              <input
                className="p-2 border rounded-lg bg-white/25 mb-2 w-full"
                type="text"
                value={playerName}
                placeholder={"Enter your name to host a game"}
                onChange={(e) => setPlayerName(e.target.value)}
              />
              <button
                onClick={createPlayer}
                disabled={!playerName}
                className="p-2 border rounded-lg bg-white mb-2 w-full hover:shadow"
              >
                Create Player
              </button>
            </div>
          )}
          {question && (
            <QuizUI
              question={question}
              handleSelect={handleAnswer}
              disabled={timer == 0 || player?.status === "lost"}
            />
          )}
        </div>
        <div className="flex flex-col gap-4 p-4 w-full bg-white border rounded-lg">
          <div className="flex justify-between items-center">
            <p>
              {player?.player_name} - {player?.status}
            </p>
            <p>{player?.score}pts</p>
          </div>
          <PlayerList players={players} />
        </div>
      </div>
    </main>
  );
}

function PlayerList({ players }: { players: Player[] }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs font-semibold">Other Players</div>
      {players.map((player, i) => (
        <div key={i} className="flex justify-between items-center">
          <p>
            {player.player_name} - {player.status}
          </p>
          <p>{player.score}pts</p>
        </div>
      ))}
    </div>
  );
}
