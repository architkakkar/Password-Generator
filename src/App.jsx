import { useState, useCallback, useEffect } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "#$%&'()*+,-./:;<=>?@[]^_`{|}~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);

  return (
    <div className="flex flex-col items-center w-full h-screen bg-zinc-950">
      {/* Page Title */}
      <h1 className="pt-14 text-4xl font-black text-center text-zinc-600">
        Password Generator
      </h1>
      <div className="p-8 my-8 bg-zinc-900 rounded-lg w-4/5 max-w-xl">
        {/* Password Input & Copy Btn */}
        <div className="flex items-center justify-center">
          <input
            type="text"
            value={password}
            className="w-full px-4 pt-2.5 pb-3.5 font-bold text-white rounded-l-md outline-none bg-zinc-700 placeholder:text-zinc-500 cursor-not-allowed"
            placeholder="password"
            readOnly
          />
          <button className="px-6 pt-2.5 pb-3.5 font-bold text-black outline-none rounded-r-md bg-emerald-600">
            Copy!
          </button>
        </div>
        {/* Options */}
        <div className="flex items-center justify-between px-6 text-white font-medium mt-4 gap-x-6 flex-wrap gap-5">
          <div className="flex flex-col gap-y-2">
            <label htmlFor="range">Length: {length}</label>
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className="cursor-pointer"
              id="range"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((preVal) => !preVal);
              }}
            />
            <label htmlFor="numberInput">Number?</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={characterAllowed}
              id="characterAllowed"
              onChange={() => {
                setCharacterAllowed((preVal) => !preVal);
              }}
            />
            <label htmlFor="characterAllowed">Characters?</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
