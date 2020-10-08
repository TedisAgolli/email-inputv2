import React, { useState } from "react";
import "./App.css";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsAltV } from "@fortawesome/free-solid-svg-icons";

const DOMAINS = [
  /* Default domains included */
  "@hey.com",
  "@aol.com",
  "@att.net",
  "@comcast.net",
  "@facebook.com",
  "@gmail.com",
  "@gmx.com",
  "@googlemail.com",
  "@google.com",
  "@hotmail.com",
  "@hotmail.co.uk",
  "@mac.com",
  "@me.com",
  "@mail.com",
  "@msn.com",
  "@live.com",
  "@sbcglobal.net",
  "@verizon.net",
  "@yahoo.com",
  "@yahoo.co.uk",

  /* Other global domains */
  "@email.com",
  "@fastmail.fm",
  "@games.com" /* AOL */,
  "@gmx.net",
  "@hush.com",
  "@hushmail.com",
  "@icloud.com",
  "@iname.com",
  "@inbox.com",
  "@lavabit.com",
  "@love.com" /* AOL */,
  "@outlook.com",
  "@pobox.com",
  "@protonmail.ch",
  "@protonmail.com",
  "@tutanota.de",
  "@tutanota.com",
  "@tutamail.com",
  "@tuta.io",
  "@keemail.me",
  "@rocketmail.com" /* Yahoo */,
  "@safe-mail.net",
  "@wow.com" /* AOL */,
  "@ygm.com" /* AOL */,
  "@ymail.com" /* Yahoo */,
  "@zoho.com",
  "@yandex.com",
];
function App() {
  const [recommendedDomains, setRecommendedDomains] = useState(DOMAINS);
  const [domainIdx, setDomainIdx] = useState(0);
  const [currentInput, setCurrentInput] = useState("");
  const [greyedOutText, setGreyedOutText] = useState(null);
  const handleKeyDown = (e) => {
    let tempIdx;
    switch (e.keyCode) {
      case 38:
        tempIdx =
          domainIdx === recommendedDomains.length - 1 ? 0 : domainIdx + 1;
        setDomainIdx(tempIdx);
        e.preventDefault();
        break;
      case 40:
        tempIdx =
          domainIdx === 0 ? recommendedDomains.length - 1 : domainIdx - 1;
        setDomainIdx(tempIdx);
        e.preventDefault();
        break;
      default: // Do nothing
    }
  };
  const handleChange = (e) => {
    const newInput = e.target.value || "";
    setCurrentInput(newInput);
    if (newInput.includes("@") || currentInput.includes("@")) {
      const userDomain = newInput.includes("@")
        ? newInput.substring(newInput.indexOf("@"))
        : "";
      let tempDomains = DOMAINS.filter((dom) =>
        dom.startsWith(userDomain)
      ).map((dom) => dom.replace(userDomain, ""));
      setGreyedOutText(userDomain);
      setRecommendedDomains(tempDomains);
      setDomainIdx(0);
    }
  };

  return (
    <div className="App">
      <Input
        id="standard-adornment-weight"
        value={currentInput}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        endAdornment={
          <InputAdornment position="end">
            {<span style={{ color: "lightgray" }}>{greyedOutText}</span>}
            {recommendedDomains[domainIdx]}
            {recommendedDomains[domainIdx] && (
              <FontAwesomeIcon
                style={{ marginLeft: "5px" }}
                icon={faArrowsAltV}
              />
            )}
          </InputAdornment>
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
