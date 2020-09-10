import React from 'react'

function ClockControl (props) {
  const { h2, div, button1, button2 } = props.data
  return (
    <div id={props.name} className={'ClockControl ' + props.class}>
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
      >
        {button1.text}
      </button>
      <button
        id={button2.id}
        className={button2.class}
        onClick={button2.callback}
      >
        {button2.text}
      </button>
    </div>
  )
}

export default ClockControl
