import React, { useState } from "react";
import Grid from "../components/Grid";


function Live(props) {
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [currentDay, setCurrentDay] = useState(new Date());
  let week = [];
  let days = [];
  let nDay = new Date();
  for(let i = 0; i < 7; i++) {
    // let day = nDay.getDate();
    let weekday = weekdays[nDay.getDay()];
    week.push(weekday + " " + nDay.getDate());
    days.push(new Date(nDay.valueOf()));
    nDay.setDate(nDay.getDate() + 1);
  }
  return (
    <div>
      <div role="tablist" className="tabs tabs-boxed">
        {week.map((day, index) => {
          if (index === 0) { return <a role="tab" className="tab tab-active" key={index} onClick={() => setTabDay(index, days[index], setCurrentDay)}>{day}</a>; }
          else { return <a role="tab" className="tab" key={index} onClick={() => setTabDay(index, days[index], setCurrentDay)}>{day}</a>; }
        })}
      </div>
      <Grid ch={props.ch} day={currentDay} />
    </div>
  );
}

function setTabDay(index, newDay, setCurrentDay) {
  console.log("setTabDay");
  let tabs = document.getElementsByClassName("tab");
  for (let i = 0; i < tabs.length; i++) {
    if (i === index) { tabs[i].classList.add("tab-active"); }
    else { tabs[i].classList.remove("tab-active"); }
  }
  setCurrentDay(newDay);
}

export default Live;
