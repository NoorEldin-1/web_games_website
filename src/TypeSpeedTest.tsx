import { useRef, useState } from "react";
import { NavbarAndBody } from "./Home";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const words: string[] = [
  "algorithm",
  "backend",
  "frontend",
  "react",
  "angular",
  "vue",
  "javascript",
  "typescript",
  "python",
  "java",
  "c++",
  "c#",
  "go",
  "rust",
  "swift",
  "kotlin",
  "php",
  "ruby",
  "nodejs",
  "express",
  "mongodb",
  "mysql",
  "postgres",
  "firebase",
  "aws",
  "azure",
  "googlecloud",
  "docker",
  "kubernetes",
  "graphql",
];
let randomWord = words[Math.floor(Math.random() * words.length)];
export default function TypeSpeedTest() {
  const inputTypeRef = useRef(null);
  const randomWordRef = useRef(null);
  const selectRef = useRef(null);
  const timerRef = useRef(null);
  const winRef = useRef(null);
  const loseRef = useRef(null);
  const [time, setTime] = useState(7);
  const [timeInterval, setTimeInterval] = useState(7);
  const [score, setScore] = useState(0);

  return (
    <NavbarAndBody>
      <div className=" max-w-[1000px] mx-auto mt-5 font-[Roboto] px-2.5">
        <div className="mb-5 bg-white p-5 rounded-sm text-center text-xl">
          Your Playing On
          <select
            defaultValue={time}
            className="outline-0 text-red-600 font-extrabold mx-2 cursor-pointer duration-300 hover:text-red-800"
            ref={selectRef}
            onChange={(e) => {
              setTime(Number(e.target.value));
              setTimeInterval(Number(e.target.value));
            }}
          >
            <option value="7">Easy</option>
            <option value="5">Normal</option>
            <option value="3">Hard</option>
          </select>
          Mode You Had
          <span className="text-red-600 font-extrabold"> {time} </span>Seconds
          To Type The Word
        </div>
        <div
          className="bg-white text-center text-3xl py-2 font-bold mb-5 tracking-widest rounded-sm hidden select-none"
          ref={randomWordRef}
        >
          {randomWord.toLowerCase()}
        </div>
        <button
          className="bg-red-600 w-full py-2 text-white font-bold text-2xl rounded-lg cursor-pointer duration-300 hover:bg-red-800"
          onClick={(e) => {
            e.currentTarget.style.display = "none";
            if (inputTypeRef.current) {
              (inputTypeRef.current as HTMLInputElement).disabled = false;
              (inputTypeRef.current as HTMLElement).focus();
            }
            if (randomWordRef.current) {
              (randomWordRef.current as HTMLElement).style.display = "block";
            }
            if (selectRef.current) {
              (selectRef.current as HTMLSelectElement).disabled = true;
              (selectRef.current as HTMLSelectElement).style.pointerEvents =
                "none";
              (selectRef.current as HTMLSelectElement).classList.add(
                "text-red-800"
              );
            }
            const intervalId = setInterval(() => {
              setTimeInterval((prev) => {
                if (prev === 0) {
                  if (
                    (inputTypeRef.current as unknown as HTMLInputElement)
                      .value ===
                    (randomWordRef.current as unknown as HTMLElement)
                      .textContent
                  ) {
                    setScore((prevScore) => {
                      if (prevScore < words.length - 1) {
                        (
                          inputTypeRef.current as unknown as HTMLInputElement
                        ).value = "";
                        randomWord =
                          words[Math.floor(Math.random() * words.length)];
                        return prevScore + 1;
                      } else {
                        clearInterval(intervalId);
                        (
                          winRef.current as unknown as HTMLElement
                        ).classList.remove("hidden");
                        (
                          inputTypeRef.current as unknown as HTMLInputElement
                        ).disabled = true;
                        return prevScore + 1;
                      }
                    });
                  } else {
                    clearInterval(intervalId);
                    (
                      inputTypeRef.current as unknown as HTMLInputElement
                    ).disabled = true;
                    (
                      loseRef.current as unknown as HTMLElement
                    ).classList.remove("hidden");
                    return (prev = time);
                  }
                  return (prev = time);
                } else {
                  return prev - 1;
                }
              });
            }, 1000);
          }}
        >
          Start
        </button>
        <input
          type="text"
          ref={inputTypeRef}
          disabled={true}
          className="bg-white w-full mt-5 py-4 px-5 border-0 outline-0 text-lg rounded-sm focus:border-2 border-red-600 placeholder:font-extrabold tracking-widest"
          placeholder="Type Word..."
        />
        <div className="bg-white p-5 mt-5 rounded-sm text-lg flex flex-col sm:justify-between sm:flex-row items-center">
          <div>
            Time left:
            <span className="text-red-600 font-extrabold" ref={timerRef}>
              {" "}
              {timeInterval}{" "}
            </span>
            Seconds
          </div>
          <div>
            Score: <span className="text-red-600 font-extrabold">{score}</span>{" "}
            From{" "}
            <span className="text-red-600 font-extrabold">{words.length}</span>
          </div>
        </div>
        <div
          ref={winRef}
          className="text-center text-green-400 font-extrabold text-xl sm:text-3xl tracking-widest mt-5 hidden"
        >
          Congratulation You Success{" "}
          <FontAwesomeIcon
            icon={faArrowRotateRight}
            className="duration-300 hover:scale-125 cursor-pointer"
            onClick={() => window.location.reload()}
          />
        </div>
        <div
          ref={loseRef}
          className="text-center text-red-500 font-extrabold text-3xl tracking-widest mt-5 hidden"
        >
          Oops!{" "}
          <FontAwesomeIcon
            icon={faArrowRotateRight}
            className="duration-300 hover:scale-125 cursor-pointer"
            onClick={() => window.location.reload()}
          />
        </div>
      </div>
    </NavbarAndBody>
  );
}
