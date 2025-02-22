import { useRef, useState } from "react";
import { NavbarAndBody } from "./Home";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";

const progWords = [
  "algorithm",
  "backend",
  "frontend",
  "javascript",
  "typescript",
];
const animWords = ["tiger", "lion", "elephant", "monkey", "giraffe"];
const sportWords = ["football", "basketball", "tennis", "golf", "swimming"];
const countriesWords = ["spain", "italy", "france", "germany", "portugal"];
const allWords = [...progWords, ...animWords, ...sportWords, ...countriesWords];
let randomWord = allWords[Math.floor(Math.random() * allWords.length)];

export default function Hangman() {
  const [random, setRandom] = useState(randomWord);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const selectRef = useRef(null);
  const bodyRef = useRef(null);
  const winRef = useRef(null);
  const loseRef = useRef(null);
  const randomWordRef = useRef(null);
  const keyboard = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ].map((e, i) => {
    return (
      <div
        key={i}
        className="bg-red-600 hover:bg-red-800 text-white cursor-pointer w-[40px] h-[40px] sm:w-15 sm:h-15 text-center content-center uppercase"
        onClick={(element) => {
          if (random.includes(e)) {
            Array.from(
              (randomWordRef.current as unknown as HTMLElement).children
            ).forEach((word: Element) => {
              if ((word as HTMLElement).textContent === e) {
                (word as HTMLElement).classList.remove("text-transparent");
                setScore((prev) => prev + 1);
              }
            });
          } else {
            (bodyRef.current as unknown as HTMLElement).children[
              wrongAttempts
            ].classList.remove("hidden");
            setWrongAttempts(wrongAttempts + 1);
          }
          (selectRef.current as unknown as HTMLElement)?.classList.add(
            "pointer-events-none"
          );
          element.currentTarget.classList.replace("bg-red-600", "bg-gray-600");
          element.currentTarget.classList.add("pointer-events-none");
        }}
      >
        {e}
      </div>
    );
  });
  const randomWordList = random.split("").map((e, i) => {
    return (
      <p key={i} className="text-transparent">
        {e}
      </p>
    );
  });

  if (wrongAttempts === 6) {
    (loseRef.current as unknown as HTMLElement)?.classList.replace(
      "hidden",
      "flex"
    );
  }
  if (score === random.length) {
    (winRef.current as unknown as HTMLElement)?.classList.replace(
      "hidden",
      "flex"
    );
  }

  return (
    <NavbarAndBody>
      <div
        ref={winRef}
        className="absolute top-0 left-0 w-full h-full bg-[#0000008f] z-10 hidden justify-center items-center "
      >
        <div className="text-center text-lime-500 font-extrabold text-xl sm:text-3xl tracking-widest mt-5">
          Congratulation You Success{" "}
          <FontAwesomeIcon
            icon={faArrowRotateRight}
            className="duration-300 hover:scale-125 cursor-pointer"
            onClick={() => window.location.reload()}
          />
        </div>
      </div>
      <div
        ref={loseRef}
        className="absolute top-0 left-0 w-full h-full bg-[#0000008f] z-10 hidden justify-center items-center"
      >
        <div className="text-center text-red-600 font-extrabold text-xl sm:text-3xl tracking-widest mt-5">
          Oops!{" "}
          <FontAwesomeIcon
            icon={faArrowRotateRight}
            className="duration-300 hover:scale-125 cursor-pointer"
            onClick={() => window.location.reload()}
          />
        </div>
      </div>
      <div className="mx-auto max-w-[1000px] mt-5 font-[Wendy_One] tracking-wide text-[12px] sm:text-lg">
        <div className="bg-white flex justify-center items-center p-5 rounded-lg flex-col gap-5">
          <div className="w-[275px] h-[350px]">
            <div className="one"></div>
            <div className="two"></div>
            <div className="three"></div>
            <div className="four"></div>
            <div className="the-body" ref={bodyRef}>
              <div className="head hidden"></div>
              <div className="body hidden"></div>
              <div className="arm-right hidden"></div>
              <div className="arm-left hidden"></div>
              <div className="leg-right hidden"></div>
              <div className="leg-left hidden"></div>
            </div>
          </div>
          <div
            ref={randomWordRef}
            className="the-word flex gap-2 text-2xl select-none uppercase"
          >
            {randomWordList}
          </div>
        </div>

        <div className="bg-white flex justify-between my-5 p-3 rounded-lg gap-2">
          <div>
            Word Category:
            <select
              ref={selectRef}
              className="outline-0 text-red-600 cursor-pointer"
              onChange={(e) => {
                const arr = e.target.value.split(",");
                randomWord = arr[Math.floor(Math.random() * arr.length)];
                setRandom(randomWord);
              }}
            >
              <option value={allWords}>All</option>
              <option value={progWords}>Programming</option>
              <option value={animWords}>Animals</option>
              <option value={sportWords}>Sports</option>
              <option value={countriesWords}>Countries</option>
            </select>
          </div>
          <div>
            Number Of Attempts{" "}
            <span className="text-red-600">{wrongAttempts}/6</span>
          </div>
        </div>

        <div className="bg-white flex flex-wrap gap-2 justify-center p-5 rounded-lg">
          {keyboard}
        </div>
      </div>
    </NavbarAndBody>
  );
}
