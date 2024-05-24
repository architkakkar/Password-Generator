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

  const copyPassword = async () => {
    try {
      await navigator.clipboard.writeText(password);
      alert("Password copied to clipboard successfully!");
    } catch (err) {
      console.error("Failed to copy text: ", err);
      alert("Failed to copy password.");
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-screen bg-zinc-950">
      {/* Page Title */}
      <h1 className="pt-14 text-4xl font-black text-center text-emerald-500">
        Password Generator
      </h1>
      <div className="px-8 py-10 mt-12 bg-zinc-900 rounded-lg w-4/5 max-w-xl shadow-md shadow-zinc-600">
        {/* Password Input & Copy Btn */}
        <div className="flex items-center justify-center">
          <input
            type="text"
            value={password}
            className="w-full px-4 pt-2.5 pb-3.5 font-bold text-white rounded-l-md outline-none bg-zinc-700 placeholder:text-zinc-500 cursor-not-allowed tracking-wider"
            placeholder="password"
            readOnly
          />
          <button
            className="px-6 pt-2.5 pb-3.5 font-bold text-black outline-none rounded-r-md bg-emerald-500 hover:bg-emerald-600"
            onClick={copyPassword}
          >
            Copy!
          </button>
        </div>
        {/* Options */}
        <div className="flex items-center justify-between px-6 text-white font-medium mt-8 gap-x-6 flex-wrap gap-5">
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
          <div className="flex items-center gap-x-2 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              className="cursor-pointer"
              onChange={() => {
                setNumberAllowed((preVal) => !preVal);
              }}
            />
            <label htmlFor="numberInput" className="cursor-pointer">
              Number?
            </label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={characterAllowed}
              id="characterAllowed"
              className="cursor-pointer"
              onChange={() => {
                setCharacterAllowed((preVal) => !preVal);
              }}
            />
            <label htmlFor="characterAllowed" className="cursor-pointer">
              Characters?
            </label>
          </div>
        </div>
        {/* Refresh Password Button */}
        <div className="flex items-center justify-center mt-8">
          <button
            className="px-6 py-3 bg-emerald-500 rounded-md font-bold hover:bg-emerald-600"
            onClick={passwordGenerator}
          >
            Refresh Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
