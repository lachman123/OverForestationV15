"use client";
import { Player } from "@/components/QuestionAnswer";
import { useState } from "react";
import supabase from "@/supabase/supabaseClient";
import Link from "next/link";
import { generateImageFal } from "@/ai/fal";

export default function CreatePlayer() {
  const [playerName, setPlayerName] = useState<string>("");
  const [expertise, setExpertise] = useState<string>("");
  const [player, setPlayer] = useState<Player | null>(null);
  const [creating, setCreating] = useState<boolean>(false);
  const createPlayer = async () => {
    //create an image for the player
    setCreating(true);
    try {
      const img = await generateImageFal(
        `${expertise}`,
        {
          width: 512,
          height: 512,
        },
        "fast-turbo-diffusion"
      );
      //Create new player in supabase
      const { data, error } = await supabase
        .from("player")
        .insert({
          player_name: playerName,
          player_data: expertise,
          image: img,
          status: "playing",
          score: 0,
        })
        .select()
        .single();
      if (data) {
        setPlayer(data);
        //save player id to local storage
        localStorage.setItem("player_id", data.id);
      }
    } catch (e) {
      console.error(e);
      setPlayer(null);
      setPlayerName("");
      setExpertise("");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {!player ? (
        <>
          <input
            className="p-2 border rounded-lg bg-white/25 mb-2 w-full"
            type="text"
            value={playerName}
            placeholder={"Your name"}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <input
            className="p-2 border rounded-lg bg-white/25 mb-2 w-full"
            type="text"
            value={expertise}
            placeholder={"Your special expertise"}
            onChange={(e) => setExpertise(e.target.value)}
          />
          <button
            onClick={createPlayer}
            disabled={!playerName || !expertise}
            className="p-2 border rounded-lg bg-white mb-2 w-full hover:shadow"
          >
            {creating ? "Creating player..." : "Create"}
          </button>
        </>
      ) : (
        <div className="max-w-lg rounded shadow p-4 flex flex-col gap-2">
          <img src={player.image} alt={player.player_name} />
          <p>{player.player_name}</p>
          <p>{player.player_data}</p>
          <Link
            href="/gameshow/host"
            className="w-full p-2 border rounded-lg hover:shadow bg-white"
          >
            Host a new game
          </Link>
          <Link
            href="/gameshow/join"
            className="w-full p-2 border rounded-lg hover:shadow bg-white"
          >
            Search for a game
          </Link>
        </div>
      )}
    </div>
  );
}
