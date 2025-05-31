//Pop-ups met knoppen om opnieuw te spelen of om te stoppen
function popupVerloren() {
    setTimeout(() => {
        document.getElementById("popupVerloren").style.display = "flex";
      }, 1000);
}

function popupGewonnen() {
    setTimeout(() => {
        document.getElementById("popupGewonnen").style.display = "flex";
      }, 1000);
}

//Pakt alle vak classes en veranderd ze willekeurig in class steen of aarde
//Houdt 1 willekeurige class in gedachte en geeft die de class schat extra mee
let grond = ["steen", "aarde"];
let vakken = document.querySelectorAll(".vak");

const locatieSchat = Math.floor(Math.random() * vakken.length);

vakken.forEach(function(vak, rand) {
    let grondStof = grond[Math.floor(Math.random() * grond.length)];
    vak.className = grondStof;

    if (rand === locatieSchat) {
        vak.classList.add("schat");
      }
});

//Geeft de geselecteerd class mee aan de h2 waar op geklikt is
let schep = false;
let pikhouweel = false;

document.getElementById("schep").addEventListener("click", () => {
    schep = true;
    pikhouweel = false;

    document.getElementById("schep").classList.add("geselecteerd");
    document.getElementById("pikhouweel").classList.remove("geselecteerd");
});

document.getElementById("pikhouweel").addEventListener("click", () => {
    schep = false;
    pikhouweel = true;

    document.getElementById("pikhouweel").classList.add("geselecteerd");
    document.getElementById("schep").classList.remove("geselecteerd");
});

function toonFoutmelding() {
    const fout = document.getElementById("foutmelding");
    fout.style.visibility = "visible";

    setTimeout(() => {
        fout.style.visibility = "hidden";
    }, 2000);
  }

let huidigeTijd = 200;
let tijdbalk = document.getElementById("tijdbalk");
let balkTekst = document.getElementById("balkTekst");
let tijdMinder = 10;
let verloren = false;

//Kijkt naar de class waar op is geklikt en als de correcte tool daarbij is geselecteerd wordt het vak opgegraven
document.querySelectorAll(".steen, .aarde").forEach(vak => {
    vak.addEventListener("click", () => {
      const isAarde = vak.classList.contains("aarde");
      const isSteen = vak.classList.contains("steen");
      const isSchat = vak.classList.contains("schat");

      if (verloren){
        return;
        }
        huidigeTijd -= tijdMinder;

        tijdbalk.style.width = huidigeTijd / 2 + "%";
        balkTekst.textContent = "Zetten over: " + huidigeTijd / 10;

        if (huidigeTijd <= 0) {
        verloren = true;
        popupVerloren();
        }
  
        if ((isAarde && schep === true) || (isSteen && pikhouweel === true)) {
            if (isSchat) {
                vak.style.backgroundImage = "url(afbeeldingen/icon_schat.png)";
                popupGewonnen();
            }
            else {
                vak.style.backgroundImage = "url(afbeeldingen/icon_gegraven.png)";
            }

            if (isSteen) {
                document.getElementById("geluidSteen").play();
            }
            else if (isAarde) {
                document.getElementById("geluidAarde").play();
            }
        }
        else {
            toonFoutmelding();
            document.getElementById("geluidVerkeerd").play();
        }
    });
});
