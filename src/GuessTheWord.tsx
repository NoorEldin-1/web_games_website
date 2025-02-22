import { useEffect, useRef, useState } from "react";
import { NavbarAndBody } from "./Home";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";

const Words = [
  "clouds",
  "fables",
  "flakes",
  "gained",
  "headed",
  "hunted",
  "misted",
  "nested",
  "pained",
  "ranged",
  "rested",
  "sanded",
  "shaded",
  "shaped",
  "spaded",
  "spared",
  "stated",
  "stored",
  "tasted",
  "wasted",
];
const randomWord = Words[Math.floor(Math.random() * Words.length)];

export default function GuessTheWord() {
  const inputsRef = useRef(null);
  const buttonRef = useRef(null);
  const hintRef = useRef(null);
  const statusRef = useRef(null);
  const winRef = useRef(null);
  const loseRef = useRef(null);
  const [, setGameStatus] = useState("");
  const [currentRow, setCurrentRow] = useState(0);
  const [hints, setHints] = useState(2);

  const inputs = [1, 2, 3, 4, 5, 6].map((_, i) => {
    return (
      <input
        key={i}
        type="text"
        maxLength={1}
        disabled={true}
        onKeyDown={(e) => {
          if ((e.target as HTMLInputElement).value.length > 0) {
            if ((e.target as HTMLElement).nextElementSibling) {
              (
                (e.target as HTMLElement).nextElementSibling as HTMLElement
              )?.focus();
            }
          }

          if (e.key === "Backspace") {
            e.preventDefault();
            (e.target as HTMLInputElement).value = "";
            if ((e.target as HTMLElement)?.previousElementSibling) {
              (
                (e.target as HTMLElement)?.previousElementSibling as HTMLElement
              )?.focus();
            }
          }

          if (e.key === "ArrowLeft") {
            if ((e.target as HTMLElement)?.previousElementSibling) {
              (
                (e.target as HTMLElement)?.previousElementSibling as HTMLElement
              )?.focus();
            }
          }

          if (e.key === "ArrowRight") {
            if ((e.target as HTMLElement).nextElementSibling) {
              (
                (e.target as HTMLElement).nextElementSibling as HTMLElement
              )?.focus();
            }
          }
        }}
      />
    );
  });

  const tries = [1, 2, 3, 4, 5].map((e, i) => {
    return (
      <div key={i} className="disabled-row">
        <span>Try {e}</span>
        <div>{inputs}</div>
      </div>
    );
  });

  useEffect(() => {
    if (
      currentRow ===
      (inputsRef.current as unknown as HTMLElement)?.children.length
    ) {
      (buttonRef.current as unknown as HTMLElement).classList.add(
        "pointer-events-none",
        "opacity-50"
      );
      (hintRef.current as unknown as HTMLElement).classList.add(
        "pointer-events-none",
        "opacity-50"
      );
      setGameStatus("lose");
      (statusRef.current as unknown as HTMLElement).classList.remove("hidden");
      (loseRef.current as unknown as HTMLElement).classList.replace(
        "hidden",
        "flex"
      );
    }

    const childrenArr = Array.from(
      (inputsRef.current as unknown as HTMLElement).children
    ) as HTMLElement[];
    childrenArr.forEach((e) => {
      e.classList.add("disabled-row");
      Array.from(e.children[1].children).forEach((e) => {
        (e as HTMLInputElement).disabled = true;
      });
    });
    if (childrenArr[currentRow]) {
      childrenArr[currentRow].classList.remove("disabled-row");
      Array.from(childrenArr[currentRow].children[1].children).forEach((e) => {
        (e as HTMLInputElement).disabled = false;
      });
      (childrenArr[currentRow].children[1].children[0] as HTMLElement)?.focus();
    }
  }, [currentRow]);

  if (hints === 0) {
    (hintRef.current as unknown as HTMLElement).classList.add(
      "pointer-events-none",
      "opacity-50"
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
      <div className="font-[Permanent_Marker] mt-5 container mx-auto grid lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col items-center">
          <div ref={inputsRef} className="inputs-container mb-7">
            {tries}
          </div>
          <div>
            <button
              ref={buttonRef}
              className="px-10 py-2 bg-red-600 mr-5 cursor-pointer duration-300 hover:bg-red-800 text-white rounded-lg text-lg"
              onClick={() => {
                const childrenArr = Array.from(
                  (inputsRef.current as unknown as HTMLElement).children[
                    currentRow
                  ].children[1].children
                );
                let inputWord = "";
                inputWord = "";
                childrenArr.forEach((e, i) => {
                  inputWord += (e as HTMLInputElement).value.toLowerCase();
                  if (
                    (e as HTMLInputElement).value.toLowerCase() ===
                    randomWord[i]
                  ) {
                    e.classList.add("match");
                  } else if (
                    randomWord.includes(
                      (e as HTMLInputElement).value.toLowerCase()
                    )
                  ) {
                    e.classList.add("not-place");
                  } else {
                    e.classList.add("not-match");
                  }
                });
                if (inputWord === randomWord) {
                  const childrenArr = Array.from(
                    (inputsRef.current as unknown as HTMLElement).children
                  );
                  setGameStatus("win");
                  (
                    statusRef.current as unknown as HTMLElement
                  ).classList.remove("hidden");
                  (winRef.current as unknown as HTMLElement).classList.replace(
                    "hidden",
                    "flex"
                  );
                  (buttonRef.current as unknown as HTMLElement).classList.add(
                    "pointer-events-none",
                    "opacity-50"
                  );
                  (hintRef.current as unknown as HTMLElement).classList.add(
                    "pointer-events-none",
                    "opacity-50"
                  );
                  childrenArr.forEach((e) => {
                    e.classList.add("disabled-row");
                    Array.from(e.children[1].children).forEach((e) => {
                      (e as HTMLInputElement).disabled = true;
                    });
                  });
                } else {
                  setCurrentRow(currentRow + 1);
                }
              }}
            >
              Check Word
            </button>
            <button
              ref={hintRef}
              className="px-2.5 py-2 bg-green-500 cursor-pointer duration-300 hover:bg-green-700 rounded-lg text-lg"
              onClick={() => {
                const filterInputs = Array.from(
                  (inputsRef.current as unknown as HTMLElement).children[
                    currentRow
                  ].children[1].children
                ).filter(
                  (e) =>
                    (e as HTMLInputElement).value === "" ||
                    (e as HTMLInputElement).value === " " ||
                    (e as HTMLInputElement).value === null ||
                    (e as HTMLInputElement).value === undefined
                );
                if (filterInputs.length > 0) {
                  let element;
                  filterInputs.forEach((e) => {
                    element = Array.from(
                      (inputsRef.current as unknown as HTMLElement).children[
                        currentRow
                      ].children[1].children
                    ).indexOf(e);
                  });
                  if (element) {
                    (
                      (inputsRef.current as unknown as HTMLElement).children[
                        currentRow
                      ].children[1].children[element] as HTMLInputElement
                    ).value = randomWord[element];
                  }
                  setHints((prev) => prev - 1);
                }
              }}
            >
              {hints} Hints
            </button>
          </div>
          <p ref={statusRef} className="mt-5 text-4xl text-red-600 hidden">
            Word Is: <span className="text-[#ff9800]">{randomWord}</span>
          </p>
        </div>
        <div className="p-2">
          <h2 className="text-center mb-2.5 text-2xl text-red-600">
            Key Colors
          </h2>
          <div className="colors-keys flex flex-col gap-2.5">
            <div className="bg-white px-2.5 py-2">The Letter in Place</div>
            <div className="bg-white px-2.5 py-2">
              The Letter right but Not in Place
            </div>
            <div className="bg-white px-2.5 py-2">The Letter is Wrong</div>
          </div>
        </div>
      </div>
    </NavbarAndBody>
  );
}
