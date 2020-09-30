import React, { useState, useEffect, useRef } from "react";
import "../style/additional/animationLib.scss";
import styles from "../style/components/input.module.scss";

const Input = React.forwardRef((props, ref) => {
  const [text, setText] = useState("")
  const [focus, setFocus] = useState(false)

  const handleTextChange = (event) => {
    var text = event.target.value
    setText({ text: text })
  }

  const handleFocusOn = (event) => setFocus({ focus: true })

  const focusInput = () => document.getElementById("inputField").focus();

  return (
    <div className={styles.inputHolder}>
      <div className={styles.mainSearch}>
        <input
          ref={ref}
          onKeyDown={props.onKeyDown}
          className={styles.mainInput}
          type={props.type || "text"}
          placeholder={props.placeholder}
          onChange={handleTextChange}
          onFocus={handleFocusOn}
          onKeyPress={props.onKeyPress}
          autoFocus={props.autofocus}
        />
      </div>
    </div>
  )
})

export default Input;
