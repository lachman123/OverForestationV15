import GameList from "../GameList";

export default function JoinGamePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-start justify-between font-mono text-sm lg:flex gap-4 ">
        <h1>You lost that round. Join another game?</h1>
        <GameList />
      </div>
    </main>
  );
}
