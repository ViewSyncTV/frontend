import Grid from "../components/Grid";


function Live(props) {
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let week = []
  let weekday, timeNow = ""
  let day = new Date()
  for(let i=0; i<7; i++){
    let timeNow = day.getDate()
    let weekday = weekdays[day.getDay()];
    week.push(weekday + " " + timeNow)
    day.setDate(day.getDate() + 1);
  }
  return (
    <div>
    <div role="tablist" className="tabs tabs-boxed">
        <a role="tab" className="tab tab-active">{week[0]}</a>
        <a role="tab" className="tab">{week[1]}</a>
        <a role="tab" className="tab">{week[2]}</a>
        <a role="tab" className="tab">{week[3]}</a>
        <a role="tab" className="tab">{week[4]}</a>
        <a role="tab" className="tab">{week[5]}</a>
        <a role="tab" className="tab">{week[6]}</a>
      </div>
    <Grid ch={props.ch} day={props.day}/>
    </div>
  );
}

export default Live;
