import React, { useState } from "react";
import "./App.css";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";

const DOMAINS = ["@gmail.com", "@hey.com", "@hotmail.com"];
function App() {
  const [input, setInput] = useState("");
  const [suggestedEmail, setSuggestedEmail] = useState(DOMAINS[0]);
  const [domainIdx, setDomainIdx] = useState(0);
  const handleKeyDown = ({ keyCode }) => {
    switch (keyCode) {
      case 38:
        const tempIdx = domainIdx === DOMAINS.length - 1 ? 0 : domainIdx + 1;
        setSuggestedEmail(DOMAINS[tempIdx]);
        setDomainIdx(tempIdx);
        break;
      case 39:
        console.log("right");
        let inputNoEmail = input.split("@")[0];
        setInput(inputNoEmail + DOMAINS[domainIdx]);
        setSuggestedEmail("");
        break;
      case 40:
        console.log("down");
    }
  };
  const handleChange = (e) => {
    const input = e.target.value;
    if (input && input.includes("@")) {
      setSuggestedEmail("");
    } else {
      setSuggestedEmail(DOMAINS[domainIdx]);
    }
    setInput(input);
    console.log(input);
  };

  return (
    <div className="App">
      <Input
        id="standard-adornment-weight"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        endAdornment={
          <InputAdornment position="end">{suggestedEmail}</InputAdornment>
        }
        aria-describedby="standard-weight-helper-text"
        inputProps={{
          "aria-label": "weight",
        }}
      />
    </div>
  );
}

export default App;
