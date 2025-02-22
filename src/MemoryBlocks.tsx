import {
  faAngular,
  faCss,
  faGithub,
  faHtml5,
  faJs,
  faPhp,
  faPython,
  faReact,
  faSass,
  faVuejs,
} from "@fortawesome/free-brands-svg-icons";
import { NavbarAndBody } from "./Home";
import {
  faArrowRotateRight,
  faExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

export default function MemoryBlocks() {
  const memoryCardsRef = useRef(null);
  const nameRef = useRef(null);
  const winRef = useRef(null);
  const loseRef = useRef(null);
  const [playerName, setPlayerName] = useState("");
  const [flipCards, setFlipCards] = useState<Element[]>([]);
  const [matchedCards, setMatchedCards] = useState<Element[]>([]);
  const [score, setScore] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);

  window.addEventListener("load", () => {
    if (localStorage.getItem("playerName")) {
      (
        nameRef.current as unknown as HTMLElement
      ).parentElement?.parentElement?.classList.add("hidden");
      setPlayerName(localStorage.getItem("playerName") ?? "");
    }
  });

  if (playerName === "") {
    setPlayerName("guest");
  }

  if (score === 10) {
    (winRef.current as unknown as HTMLElement)?.classList.replace(
      "hidden",
      "flex"
    );
  }

  if (wrongAttempts === 20) {
    (loseRef.current as unknown as HTMLElement)?.classList.replace(
      "hidden",
      "flex"
    );
  }

  if (matchedCards.length > 0) {
    matchedCards.forEach((e) => {
      (e as unknown as HTMLElement).style.pointerEvents = "none";
    });
  }

  if (flipCards.length === 2) {
    if (
      (flipCards[0] as unknown as HTMLElement).dataset.card ===
      (flipCards[1] as unknown as HTMLElement).dataset.card
    ) {
      setFlipCards([]);
      setMatchedCards((prev) => [...prev, ...flipCards]);
      setScore((prev) => prev + 1);
    } else {
      setFlipCards([]);
      setWrongAttempts((prev) => prev + 1);
      setTimeout(() => {
        flipCards.forEach((e) => {
          e.classList.remove("rotate-y-180");
          e.classList.remove("pointer-events-none");
        });
      }, 250);
    }
  }

  useEffect(() => {
    const shuffleCards = Array.from(
      (memoryCardsRef.current as unknown as HTMLElement).children
    ).sort(() => Math.random() - 0.5);
    (memoryCardsRef.current as unknown as HTMLElement)?.replaceChildren(
      ...shuffleCards
    );
    const cards = Array.from(
      (memoryCardsRef.current as unknown as HTMLElement).children
    );
    cards.forEach((e) => {
      (e as HTMLElement).addEventListener("click", () => {
        (e as HTMLElement).classList.add("rotate-y-180");
        (e as HTMLElement).classList.add("pointer-events-none");
        setFlipCards((prev) => [...prev, e]);
        console.log(e);
      });
    });
  }, []);

  return (
    <NavbarAndBody>
      <div className="absolute top-0 right-0 w-full h-full bg-[#0000008f] z-10 flex justify-center items-center">
        <div className="bg-white w-96 h-36 p-5 rounded-2xl flex flex-col gap-5">
          <input
            ref={nameRef}
            type="text"
            className="bg-gray-300 py-2 px-2 w-full outline-0 rounded-xl"
            placeholder="Type your name here..."
          />
          <button
            className="bg-gray-300 py-2 px-5 outline-0 cursor-pointer w-fit mx-auto duration-300 hover:bg-gray-400"
            onClick={(e) => {
              e.currentTarget.parentElement?.parentElement?.classList.add(
                "hidden"
              );
              const name = (nameRef.current as unknown as HTMLInputElement)
                .value;
              window.localStorage.setItem("playerName", name);
              setPlayerName(name);
            }}
          >
            OK!
          </button>
        </div>
      </div>
      <div
        ref={winRef}
        className="absolute top-0 left-0 w-full h-full bg-[#0000008f] z-10 hidden justify-center items-center "
      >
        <div className="text-center text-green-500 font-extrabold text-xl sm:text-3xl tracking-widest mt-5">
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
      <div className="font-[Piedra] container mx-auto">
        <div className="bg-gray-100 my-5 p-3 rounded-lg flex justify-between text-xl">
          <div className="capitalize">{playerName}</div>
          <div>Wrong Attempts: {wrongAttempts}</div>
        </div>
        <div
          ref={memoryCardsRef}
          className="bg-gray-100 p-3 rounded-lg grid grid-cols-5 gap-3"
        >
          <div
            className="bg-black text-white h-36 relative duration-500 text-center transform-3d perspective-[1000px] cursor-pointer "
            data-card="sass"
          >
            <div className="absolute w-full h-full backface-hidden">
              <FontAwesomeIcon
                icon={faExclamation}
                className="text-8xl absolute left-1/2 top-1/2 -translate-1/2"
              />
            </div>
            <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-900">
              <FontAwesomeIcon
                icon={faSass}
                style={{ color: "#cc0ccf" }}
                className="text-4xl lg:text-9xl absolute left-1/2 top-1/2 -translate-1/2"
              />
            </div>
          </div>
          <div
            className="bg-black text-white h-36 relative duration-500 text-center transform-3d perspective-[1000px] cursor-pointer "
            data-card="sass"
          >
            <div className="absolute w-full h-full backface-hidden">
              <FontAwesomeIcon
                icon={faExclamation}
                className="text-8xl absolute left-1/2 top-1/2 -translate-1/2"
              />
            </div>
            <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-900">
              <FontAwesomeIcon
                icon={faSass}
                style={{ color: "#cc0ccf" }}
                className="text-4xl lg:text-9xl absolute left-1/2 top-1/2 -translate-1/2"
              />
            </div>
          </div>
          <div
            className="bg-black text-white h-36 relative duration-500 text-center transform-3d perspective-[1000px] cursor-pointer"
            data-card="js"
          >
            <div className="absolute w-full h-full backface-hidden">
              <FontAwesomeIcon
                icon={faExclamation}
                className="text-8xl absolute left-1/2 top-1/2 -translate-1/2"
              />
            </div>
            <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-900">
              <FontAwesomeIcon
                icon={faJs}
                style={{ color: "#FFD43B" }}
                className="text-4xl lg:text-9xl absolute left-1/2 top-1/2 -translate-1/2"
              />
            </div>
          </div>
          {/* 
            asadasda
          */}
          <div
            className="bg-black text-white h-36 relative duration-500 text-center transform-3d perspective-[1000px] cursor-pointer"
            data-card="js"
          >
            <div className="absolute w-full h-full backface-hidden">
              <FontAwesomeIcon
                icon={faExclamation}
                className="text-8xl absolute left-1/2 top-1/2 -translate-1/2"
              />
            </div>
            <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-900">
              <FontAwesomeIcon
                icon={faJs}
                style={{ color: "#FFD43B" }}
                className="text-4xl lg:text-9xl absolute left-1/2 top-1/2 -translate-1/2"
              />
            </div>
          </div>
          <div
            className="bg-black text-white h-36 relative duration-500 text-center transform-3d perspective-[1000px] cursor-pointer"
            data-card="python"
          >
            <div className="absolute w-full h-full backface-hidden">
              <FontAwesomeIcon
                icon={faExclamation}
                className="text-8xl absolute left-1/2 top-1/2 -translate-1/2"
              />
            </div>
            <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-900">
              <FontAwesomeIcon
                icon={faPython}
                style={{ color: "#FFD43B" }}
                className="text-4xl lg:text-9xl absolute left-1/2 top-1/2 -translate-1/2"
              />
            </div>
          </div>
          {/* 
            asadasda
          */}
          <div
            className="bg-black text-white h-36 relative duration-500 text-center transform-3d perspective-[1000px] cursor-pointer"
            data-card="python"
          >
            <div className="absolute w-full h-full backface-hidden">
              <FontAwesomeIcon
                icon={faExclamation}
                className="text-8xl absolute left-1/2 top-1/2 -translate-1/2"
              />
            </div>
            <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-900">
              <FontAwesomeIcon
                icon={faPython}
                style={{ color: "#FFD43B" }}
                className="text-4xl lg:text-9xl absolute left-1/2 top-1/2 -translate-1/2"
              />
            </div>
          </div>
          <div
            className="bg-black text-white h-36 relative duration-500 text-center transform-3d perspective-[1000px] cursor-pointer"
            data-card="git"
          >
            <div className="absolute w-full h-full backface-hidden">
              <FontAwesomeIcon
                icon={faExclamation}
                className="text-8xl absolute left-1/2 top-1/2 -translate-1/2"
              />
            </div>
            <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-900">
              <FontAwesomeIcon
                icon={faGithub}
                style={{ color: "#000000" }}
                className="text-4xl lg:text-9xl absolute left-1/2 top-1/2 -translate-1/2"
              />
            </div>
          </div>
          {/* 
            asadasda
          */}
          <div
            className="bg-black text-white h-36 relative duration-500 text-center transform-3d perspective-[1000px] cursor-pointer"
            data-card="git"
          >
            <div className="absolute w-full h-full backface-hidden">
              <FontAwesomeIcon
                icon={faExclamation}
                className="text-8xl absolute left-1/2 top-1/2 -translate-1/2"
              />
            </div>
            <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-900">
              <FontAwesomeIcon
                icon={faGithub}
                style={{ color: "#000000" }}
                className="text-4xl lg:text-9xl absolute left-1/2 top-1/2 -translate-1/2"
              />
            </div>
          </div>
          <div
            className="bg-black text-white h-36 relative duration-500 text-center transform-3d perspective-[1000px] cursor-pointer "
            data-card="vue"
          >
            <div className="absolute w-full h-full backface-hidden">
              <FontAwesomeIcon
                icon={faExclamation}
                className="text-8xl absolute left-1/2 top-1/2 -translate-1/2"
              />
            </div>
            <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-900">
              <FontAwesomeIcon
                icon={faVuejs}
                style={{ color: "#74C0FC" }}
                className="text-4xl lg:text-9xl absolute left-1/2 top-1/2 -translate-1/2"
              />
            </div>
          </div>
          {/* 
            asadasda
            */}
          <div
            className="bg-black text-white h-36 relative duration-500 text-center transform-3d perspective-[1000px] cursor-pointer "
            data-card="vue"
          >
            <div className="absolute w-full h-full backface-hidden">
              <FontAwesomeIcon
                icon={faExclamation}
                className="text-8xl absolute left-1/2 top-1/2 -translate-1/2"
              />
            </div>
            <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-900">
              <FontAwesomeIcon
                icon={faVuejs}
                style={{ color: "#74C0FC" }}
                className="text-4xl lg:text-9xl absolute left-1/2 top-1/2 -translate-1/2"
              />
            </div>
          </div>
          <div
            className="bg-black text-white h-36 relative duration-500 text-center transform-3d perspective-[1000px] cursor-pointer "
            data-card="react"
          >
            <div className="absolute w-full h-full backface-hidden">
              <FontAwesomeIcon
                icon={faExclamation}
                className="text-8xl absolute left-1/2 top-1/2 -translate-1/2"
              />
            </div>
            <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-900">
              <FontAwesomeIcon
                icon={faReact}
                style={{ color: "#63E6BE" }}
                className="text-4xl lg:text-9xl absolute left-1/2 top-1/2 -translate-1/2"
              />
            </div>
          </div>
          {/* 
            asadasda
          */}
          <div
            className="bg-black text-white h-36 relative duration-500 text-center transform-3d perspective-[1000px] cursor-pointer "
            data-card="react"
          >
            <div className="absolute w-full h-full backface-hidden">
              <FontAwesomeIcon
                icon={faExclamation}
                className="text-8xl absolute left-1/2 top-1/2 -translate-1/2"
              />
            </div>
            <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-900">
              <FontAwesomeIcon
                icon={faReact}
                style={{ color: "#63E6BE" }}
                className="text-4xl lg:text-9xl absolute left-1/2 top-1/2 -translate-1/2"
              />
            </div>
          </div>
          <div
            className="bg-black text-white h-36 relative duration-500 text-center transform-3d perspective-[1000px] cursor-pointer "
            data-card="angular"
          >
            <div className="absolute w-full h-full backface-hidden">
              <FontAwesomeIcon
                icon={faExclamation}
                className="text-8xl absolute left-1/2 top-1/2 -translate-1/2"
              />
            </div>
            <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-900">
              <FontAwesomeIcon
                icon={faAngular}
                style={{ color: "#a42828" }}
                className="text-4xl lg:text-9xl absolute left-1/2 top-1/2 -translate-1/2"
              />
            </div>
          </div>
          {/* 
            asadasda
          */}
          <div
            className="bg-black text-white h-36 relative duration-500 text-center transform-3d perspective-[1000px] cursor-pointer "
            data-card="angular"
          >
            <div className="absolute w-full h-full backface-hidden">
              <FontAwesomeIcon
                icon={faExclamation}
                className="text-8xl absolute left-1/2 top-1/2 -translate-1/2"
              />
            </div>
            <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-900">
              <FontAwesomeIcon
                icon={faAngular}
                style={{ color: "#a42828" }}
                className="text-4xl lg:text-9xl absolute left-1/2 top-1/2 -translate-1/2"
              />
            </div>
          </div>
          <div
            className="bg-black text-white h-36 relative duration-500 text-center transform-3d perspective-[1000px] cursor-pointer "
            data-card="html"
          >
            <div className="absolute w-full h-full backface-hidden">
              <FontAwesomeIcon
                icon={faExclamation}
                className="text-8xl absolute left-1/2 top-1/2 -translate-1/2"
              />
            </div>
            <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-900">
              <FontAwesomeIcon
                icon={faHtml5}
                style={{ color: "#e65c00" }}
                className="text-4xl lg:text-9xl absolute left-1/2 top-1/2 -translate-1/2"
              />
            </div>
          </div>
          {/* 
            asadasda
          */}
          <div
            className="bg-black text-white h-36 relative duration-500 text-center transform-3d perspective-[1000px] cursor-pointer "
            data-card="html"
          >
            <div className="absolute w-full h-full backface-hidden">
              <FontAwesomeIcon
                icon={faExclamation}
                className="text-8xl absolute left-1/2 top-1/2 -translate-1/2"
              />
            </div>
            <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-900">
              <FontAwesomeIcon
                icon={faHtml5}
                style={{ color: "#e65c00" }}
                className="text-4xl lg:text-9xl absolute left-1/2 top-1/2 -translate-1/2"
              />
            </div>
          </div>
          <div
            className="bg-black text-white h-36 relative duration-500 text-center transform-3d perspective-[1000px] cursor-pointer "
            data-card="css"
          >
            <div className="absolute w-full h-full backface-hidden">
              <FontAwesomeIcon
                icon={faExclamation}
                className="text-8xl absolute left-1/2 top-1/2 -translate-1/2"
              />
            </div>
            <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-900">
              <FontAwesomeIcon
                icon={faCss}
                style={{ color: "#1420cc" }}
                className="text-4xl lg:text-9xl absolute left-1/2 top-1/2 -translate-1/2"
              />
            </div>
          </div>
          {/* 
            asadasda
          */}
          <div
            className="bg-black text-white h-36 relative duration-500 text-center transform-3d perspective-[1000px] cursor-pointer "
            data-card="css"
          >
            <div className="absolute w-full h-full backface-hidden">
              <FontAwesomeIcon
                icon={faExclamation}
                className="text-8xl absolute left-1/2 top-1/2 -translate-1/2"
              />
            </div>
            <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-900">
              <FontAwesomeIcon
                icon={faCss}
                style={{ color: "#1420cc" }}
                className="text-4xl lg:text-9xl absolute left-1/2 top-1/2 -translate-1/2"
              />
            </div>
          </div>
          <div
            className="bg-black text-white h-36 relative duration-500 text-center transform-3d perspective-[1000px] cursor-pointer "
            data-card="php"
          >
            <div className="absolute w-full h-full backface-hidden">
              <FontAwesomeIcon
                icon={faExclamation}
                className="text-8xl absolute left-1/2 top-1/2 -translate-1/2"
              />
            </div>
            <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-900">
              <FontAwesomeIcon
                icon={faPhp}
                style={{ color: "#0e36d8" }}
                className="text-4xl lg:text-9xl absolute left-1/2 top-1/2 -translate-1/2"
              />
            </div>
          </div>
          {/* 
            asadasda
          */}
          <div
            className="bg-black text-white h-36 relative duration-500 text-center transform-3d perspective-[1000px] cursor-pointer "
            data-card="php"
          >
            <div className="absolute w-full h-full backface-hidden">
              <FontAwesomeIcon
                icon={faExclamation}
                className="text-8xl absolute left-1/2 top-1/2 -translate-1/2"
              />
            </div>
            <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-900">
              <FontAwesomeIcon
                icon={faPhp}
                style={{ color: "#0e36d8" }}
                className="text-4xl lg:text-9xl absolute left-1/2 top-1/2 -translate-1/2"
              />
            </div>
          </div>
          {/* 
            asadasda
          */}
        </div>
      </div>
    </NavbarAndBody>
  );
}
