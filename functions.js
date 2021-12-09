const chars = document.getElementsByClassName("char");
const data = [];
fetch("data.json")
  .then((dataList) => dataList.json())
  .then((dataList) => {
    data.push(dataList);
  })
  .then(contextListeners());

// Toggles background image depending on the time clicked
function backgroundToggle(time) {
  time = document.querySelector("input:checked").id;
  document.querySelector("main").style.backgroundImage =
    "url(./afbeeldingen/" + time + ".GIF)";
  if (time == "ochtend") {
    document.querySelector("p").innerHTML =
      "11.2% van alle dagreizigers op de trein van Haarlem naar Amsterdam, reist tijdens een uur in de ochtendspitsperiode.";
  } else if (time == "dal") {
    document.querySelector("p").innerHTML =
      "3% van alle dagreizigers op de trein van Haarlem naar Amsterdam, reist tijdens een uur in de dalperiode.";
  } else if (time == "avond") {
    document.querySelector("p").innerHTML =
      "6% van alle dagreizigers op de trein van Haarlem naar Amsterdam, reist tijdens een uur in de avondspitsperiode.";
  }
}

// Adds a class to article based on the time clicked
function classToggle(time, article) {
  time = document.querySelector("input:checked").id;
  article = document.getElementById("article");
  article.classList.remove("dal", "ochtend", "avond");
  article.classList.add(time);
}

const exceptions = document.querySelectorAll(".o,.r,.s,.q")

// Gives the "hidden" class to characters that should be hidden based on the time clicked
function charToggle(article, chars) {
  article = document.getElementById("article").className;
  for (let i = 0; i < exceptions.length; i++) {
    exceptions[i].id = "praat"
  }
  chars = document.getElementsByClassName("char");
  for (let i = 0; i < chars.length; i++) {
    chars[i].classList.remove("hidden", "extraOverige");
  }
  if (article == "ochtend") {
  } else if (article == "dal") {
    chars = document.getElementsByClassName("dalx");
    for (let i = 0; i < chars.length; i++) {
      chars[i].classList.add("hidden");
    }
  } else if ((article = "avond")) {
    chars = document.getElementsByClassName("avondx");
    for (let i = 0; i < chars.length; i++) {
      chars[i].classList.add("hidden");
    }

    chars = document.getElementsByClassName("praat dalx");
    for (let i = 0; i < chars.length; i++) {
      chars[i].classList.add("extraOverige");
      chars[i].id = "overige"
    }
  }
}

// Adds event listeners to activate the above functions when a different time is clicked
function addListenerToButtons(buttons) {
  buttons = document.querySelectorAll("input");
  for (const button of buttons) {
    button.addEventListener("click", backgroundToggle);
    button.addEventListener("click", classToggle);
    button.addEventListener("click", charToggle);
  }
}
addListenerToButtons();
backgroundToggle();

function onMouseOver(el, id, act, classes) {
  classes = el.target.classList;
  id = el.target.id;

  act = document.getElementsByClassName(id);
  if (id == "overige" || classes[4] == "extraOverige") {
    act = document.getElementsByClassName("overige");
    overige = document.getElementsByClassName("extraOverige");
    for (let i = 0; i < overige.length; i++) {
      overige[i].style.opacity = "1";
    }
  }
  for (let i = 0; i < act.length; i++) {
    act[i].style.opacity = "1";
  }
}

function loadContext(el, context, setTime, time) {
  context = document.getElementById("context");
  target = el.target.id
  setTime = document.getElementById("article").className;
  time = [];
  if (setTime == "ochtend") {
    time = data[0].ochtend;
    for (let i = 0; i < time.length; i++) {
      if (Object.keys(time[i]) == target) {
        const value = Object.values(time[i])
        context.innerHTML = value;
        document.querySelector("section section:nth-of-type(2)").style.opacity = "1";
      }
    }
  }
  else if (setTime == "dal") {
    time = data[0].dal;
    for (let i = 0; i < time.length; i++) {
      if (Object.keys(time[i]) == target) {
        const value = Object.values(time[i])
        context.innerHTML = value;
        document.querySelector("section section:nth-of-type(2)").style.opacity = "1";
      }
    }
  }
  else if (setTime == "avond") {
    time = data[0].avond;
    for (let i = 0; i < time.length; i++) {
      if (Object.keys(time[i]) == target) {
        const value = Object.values(time[i])
        context.innerHTML = value;
        document.querySelector("section section:nth-of-type(2)").style.opacity = "1";
      }
    }
  }
}

function onMouseOut() {
  for (let i = 0; i < chars.length; i++) {
    chars[i].style.opacity = "0.6";
  }
  document.querySelector("section section:nth-of-type(2)").style.opacity = "0";
}

function contextListeners() {
  for (let i = 0; i < chars.length; i++) {
    chars[i].addEventListener("mouseleave", onMouseOut);
    chars[i].addEventListener("mouseenter", onMouseOver);
    chars[i].addEventListener("mouseenter", loadContext);
  }
}
