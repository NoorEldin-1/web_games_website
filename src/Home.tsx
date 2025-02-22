import img1 from "./assets/ticTacToe.png";
import img2 from "./assets/typeSpeedTest.jpg";
import img3 from "./assets/memoryBlocks.jpg";
import img4 from "./assets/hangman.png";
import img5 from "./assets/guessTheWord.jpg";
import { Link } from "react-router-dom";
export default function Home() {
  const gamesDetails = [
    {
      image: img1,
      title: "Tic Tac Toe",
      description:
        "Tic Tac Toe is a simple, two-player game where players take turns marking a square on a 3x3 grid. The first player to get three in a row (horizontally, vertically, or diagonally) wins the game. If all squares are filled and no player has won, the game is a draw.",
      pathLink: "ticTacToe",
    },
    {
      image: img2,
      title: "Typing Speed Test",
      description: `The Typing Speed Test is a simple application that measures a user's typing speed and accuracy. The test displays a passage of text, and the user must type it out as quickly and accurately as possible.

`,
      pathLink: "typeSpeedTest",
    },
    {
      image: img3,
      title: "Memory Blocks",
      description: `Memory Blocks is a classic memory-matching game where players flip over tiles to reveal matching pairs of blocks. The game requires concentration and memory skills to win.

`,
      pathLink: "memoryBlocks",
    },
    {
      image: img4,
      title: "Hangman",
      description: `Hangman is a classic guessing game where a player tries to guess a word by suggesting letters. For each incorrect guess, a part of a hangman figure is drawn. The game ends when the player guesses the word correctly or the hangman figure is complete.

`,
      pathLink: "hangman",
    },
    {
      image: img5,
      title: "Guess The Word",
      description: `Guess The Word is a word-based guessing game where a player tries to guess a secret word by suggesting words. After each guess, the game provides feedback in the form of colored tiles, indicating how close the guess was to the secret word.

`,
      pathLink: "guessTheWord",
    },
  ];
  const gamesDetailsList = gamesDetails.map((e, i) => {
    return (
      <Link
        to={`/home/${e.pathLink}`}
        key={i}
        className="cursor-pointer duration-200 hover:scale-105"
      >
        <img
          src={e.image}
          alt=""
          className="w-[150px] h-[120px] mx-auto object-contain"
        />
        <h3 className="text-center text-2xl font-bold my-3">{e.title}</h3>
        <p className="text-center text-gray-300">{`${e.description
          .slice(0, 100)
          .trim()}...`}</p>
      </Link>
    );
  });
  return (
    <>
      <NavbarAndBody>
        <div className="text-white container mx-auto mt-8 pb-8 gap-4 grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {gamesDetailsList}
        </div>
      </NavbarAndBody>
    </>
  );
}
export function NavbarAndBody({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="bg-[#1e1e1e] min-h-screen relative">
        <div className="text-center py-4 border-b-2 border-slate-500">
          <Link
            to={"/home"}
            className="text-white text-lg font-bold cursor-pointer duration-300 hover:text-slate-500"
          >
            Home
          </Link>
        </div>
        {children}
      </div>
    </>
  );
}
