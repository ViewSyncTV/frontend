import { VITE_DEVELOPMENT_MODE, VITE_PRODUCTION_URL, VITE_DEVELOPMENT_URL } from "../constants";

async function getReminderIds() {
  let backendUrl = VITE_DEVELOPMENT_MODE ? VITE_DEVELOPMENT_URL : VITE_PRODUCTION_URL;
  let reminders = await fetch(backendUrl + "/api/tv-program/reminders",
    {
    method: "GET",
    credentials: "include"
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("tv-show/reminders response:", data.data);
        let tvprogram = data.data.map((item)=> item.tvprogram_id)
        return tvprogram
      });
  return reminders;
}

async function getMetadata(tvprogram_id) {
  let backendUrl = VITE_DEVELOPMENT_MODE ? VITE_DEVELOPMENT_URL : VITE_PRODUCTION_URL;
  let tvprogram = await fetch(backendUrl + "/api/tv-program/week")
  .then((response) => response.json())
  .then((data) => {
    return data.data
    });
    
    let metadata = tvprogram.filter(item => item.id === tvprogram_id);
    if(metadata){
        console.log(metadata[0])
        return metadata[0];
    }
    console.log("non trovato")

  return null
}

export function getReminders(reminders, setReminders) {
  const c = async () => {
    let b = [];
    let rems = await getReminderIds();
    console.log("getRemindersIds(): ", rems);
    for (let i = 0; i < rems.length; i++) {
      let metadata = await getMetadata(rems[i]);
      if(metadata){
        console.log("METADATA: ", metadata)
        b.push(metadata);
      }
    }
    setReminders(b);
  }
  c();
  console.log("Loaded metadata of reminders1: ", reminders);
}
