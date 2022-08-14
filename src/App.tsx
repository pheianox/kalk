import { MouseEventHandler, useEffect, useState } from "react";
import "./App.css";

const INITIAL_BUFFER_VALUE = "0";
const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["+", "-", "÷", "×"];

function App() {
  const [prompt, setPrompt] = useState(INITIAL_BUFFER_VALUE);
  const [buffer, setBuffer] = useState(INITIAL_BUFFER_VALUE);

  useEffect(() => {
    if (buffer.length === 0) setBuffer(INITIAL_BUFFER_VALUE);
    // console.log("buffer", buffer, "prompt", prompt);
    setPrompt(bufferDecoder(buffer));
  }, [buffer]);

  const bufferDecoder = (buffer: string) =>
    buffer.replace("*", "×").replace("/", "÷").replace("Infinity", "∞").replace("NaN", "∞").replace("undefined", "∞").replace("null", "∞");

  const bufferEncoder = (buffer: string) => buffer.replace("×", "*").replace("÷", "/").replace("∞", "Infinity").replace("%", "/100");

  useEffect(() => {
    window.addEventListener("keyup", onKeyUp);
    return () => window.removeEventListener("keyup", onKeyUp);
  }, []);

  const onKeyUp = (e: KeyboardEvent) => {
    if (e.key === "*") return onInput("×");
    if (e.key === "/") return onInput("÷");
    if (e.key === "=") return onInput("=");

    if (e.key === "Backspace" || e.key === "Delete") {
      if (e.ctrlKey) return onInput("AC");
      return onInput("C");
    }

    onInput(e.key);
  };

  const onClick: MouseEventHandler<HTMLButtonElement> = e => {
    return onInput(e.currentTarget.innerText);
  };

  const onInput = (char: string) => {
    setBuffer(buffer => {
      if (operators.indexOf(char) !== -1) {
        if (char === "-") return buffer === INITIAL_BUFFER_VALUE || buffer === "∞" ? "-" : buffer + "-";
        return operators.indexOf(buffer.slice(-1)) !== -1 ? buffer.slice(0, -1) + char : buffer + char;
      }

      if (char in digits) {
        console.log(`"${buffer}"`);
        return buffer === INITIAL_BUFFER_VALUE || buffer === "∞" ? char : buffer + char;
      }

      if (char === ".") {
        const allNumbers = buffer.split(/\+|-|\*|\//g);
        if (allNumbers.length >= 0) {
          const lastNumber = allNumbers.pop() as string;
          if (lastNumber.includes(".")) return buffer;
        }
        return buffer + ".";
      }

      if (char === "=") {
        const input = bufferEncoder(buffer);
        try {
          const result = eval(input);
          console.log(input, "->", result);
          return String(result);
        } catch (error) {
          console.log(input, "->", (error as Error).message);
          return buffer;
        }
      }

      if (char === "AC") return INITIAL_BUFFER_VALUE;
      if (char === "C") return bufferDecoder(buffer).slice(0, -1);
      if (char === "%" && buffer.slice(-1) in digits) return buffer + "%";

      return buffer;
    });
  };

  return (
    <div className="hero min-h-screen bg-base-200 grid place-items-center">
      <div className="max-w-md">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            {/* Navbar */}
            <div className="navbar bg-base-100">
              <div className="navbar-start prose text-center">
                <h3>Kalk</h3>
              </div>
              <div className="navbar-end prose text-center text-blue">
                <h4>v2.4</h4>
              </div>
            </div>
            {/* IO */}
            <div className="form-control w-full max-w-xs mb-2">
              <label className="label">
                <span className="label-text"></span>
                <span className="label-text-alt"></span>
              </label>
              <input
                type="text"
                className="input w-full max-w-xs input-bordered input-lg pointer-events-none cursor-text"
                placeholder={prompt}
                value={prompt}
                readOnly
              />
              <label className="label">
                <span className="label-text-alt text-error"></span>
                <span className="label-text-alt"></span>
              </label>
            </div>
            {/* Panel */}
            <div className="grid grid-cols-4 grid-rows-auto">
              {/* Row */}
              <button tabIndex={-1} className="btn btn-ghost btn-lg" onClick={onClick}>
                AC
              </button>
              <button tabIndex={-1} className="btn btn-ghost btn-lg" onClick={onClick}>
                C
              </button>
              <button tabIndex={-1} className="btn btn-ghost btn-lg col-span-2" onClick={onClick}>
                =
              </button>
              {/* Row */}
              <button tabIndex={-1} className="btn btn-ghost btn-lg" onClick={onClick}>
                7
              </button>
              <button tabIndex={-1} className="btn btn-ghost btn-lg" onClick={onClick}>
                8
              </button>
              <button tabIndex={-1} className="btn btn-ghost btn-lg" onClick={onClick}>
                9
              </button>
              <button tabIndex={-1} className="btn btn-ghost btn-lg" onClick={onClick}>
                +
              </button>
              {/* Row */}
              <button tabIndex={-1} className="btn btn-ghost btn-lg" onClick={onClick}>
                4
              </button>
              <button tabIndex={-1} className="btn btn-ghost btn-lg" onClick={onClick}>
                5
              </button>
              <button tabIndex={-1} className="btn btn-ghost btn-lg" onClick={onClick}>
                6
              </button>
              <button tabIndex={-1} className="btn btn-ghost btn-lg" onClick={onClick}>
                -
              </button>
              {/* Row */}
              <button tabIndex={-1} className="btn btn-ghost btn-lg" onClick={onClick}>
                1
              </button>
              <button tabIndex={-1} className="btn btn-ghost btn-lg" onClick={onClick}>
                2
              </button>
              <button tabIndex={-1} className="btn btn-ghost btn-lg" onClick={onClick}>
                3
              </button>
              <button tabIndex={-1} className="btn btn-ghost btn-lg" onClick={onClick}>
                ÷
              </button>
              {/* Row */}
              <button tabIndex={-1} className="btn btn-ghost btn-lg" onClick={onClick}>
                %
              </button>
              <button tabIndex={-1} className="btn btn-ghost btn-lg" onClick={onClick}>
                0
              </button>
              <button tabIndex={-1} className="btn btn-ghost btn-lg" onClick={onClick}>
                .
              </button>
              <button tabIndex={-1} className="btn btn-ghost btn-lg" onClick={onClick}>
                ×
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
