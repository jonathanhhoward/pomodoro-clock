import React from 'react';

function ClockControl({ h2, div, button1, button2 }) {
  return (
    <div className="ClockControl">
      <h2 id={h2.id} className={h2.class}>
        {h2.text}
      </h2>
      <div id={div.id} className={div.class}>
        {div.text}
      </div>
      <button
        id={button1.id}
        className={button1.class}
        onClick={button1.callback}
        disabled={button1.disabled}
      >
        {button1.text}
      </button>
      <button
        id={button2.id}
        className={button2.class}
        onClick={button2.callback}
        disabled={button2.disabled}
      >
        {button2.text}
      </button>
    </div>
  );
}

export default ClockControl;
