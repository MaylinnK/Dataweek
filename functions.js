function backgroundToggle(time) {
  time = document.querySelector("input:checked").id;
  document.querySelector("main").style.backgroundImage =
    "url(./afbeeldingen/" + time + ".gif)";
    if( time == "ochtend") {
        document.querySelector("p").innerHTML = "11.2% van alle dagreizigers op de trein van Haarlem naar Amsterdam, reist tijdens een uur in de ochtendspitsperiode."
    }
    else if( time == "dal") {
        document.querySelector("p").innerHTML = "3% van alle dagreizigers op de trein van Haarlem naar Amsterdam, reist tijdens een uur in de dalperiode."
    }
    else if( time == "avond") {
        document.querySelector("p").innerHTML = "6% van alle dagreizigers op de trein van Haarlem naar Amsterdam, reist tijdens een uur in de avondspitsperiode."
    }
}

function classToggle(time, article) {
  time = document.querySelector("input:checked").id;
  article = document.getElementById('article')
  article.classList.remove("dal", "ochtend", "avond");
  article.classList.add(time);
}

function addListener(buttons) {
  buttons = document.querySelectorAll("input");
  for (const button of buttons) {
    button.addEventListener("click", backgroundToggle);
    button.addEventListener("click", classToggle);
  }
}
addListener();
backgroundToggle()
