let audio_intro = document.querySelector("#intro_audio")

audio_intro.loop = true;

window.addEventListener("mouseover", (keyEvent) => {
        audio_intro.play()
});



const instructions = document.createElement("div");
const menu = document.querySelector("#options")
instructions.classList.add("options1");
instructions.style.visibility = 'hidden';
const explanation1 = document.createElement('div');
explanation1.classList.add("explanation");
explanation1.innerHTML = "Attention Dungeon Dweller! The rules are simple: Survive as long as possible. The skellies are not your friends, I repeat, NOT YOUR FRIENDS. If you come across with them, give them some and kill them QUICK";
const explanation2 = document.createElement('div');
explanation2.classList.add("explanation");
explanation2.innerHTML = "W, S, D, A are your best options to move around, while K and L will deliver some good old fashioned democracy to your foes";
const explanation3 = document.createElement('div');
explanation3.classList.add("explanation");
explanation3.innerHTML = "PRO TIP: if you struggle with your resolution while in the game, try to zoom out a bit (control - or command -)";
instructions.appendChild(explanation1);
instructions.appendChild(explanation2);
instructions.appendChild(explanation3);
document.querySelector("body").appendChild(instructions);

document.querySelector("#instructions").addEventListener("click", () => {
        menu.style.visibility = 'hidden';
        instructions.style.visibility = 'visible';
});

document.querySelector(".options1").addEventListener("click", () => {
        menu.style.visibility = 'visible';
        instructions.style.visibility = 'hidden';
});

window.addEventListener('resize', function () {
        "use strict";
        window.location.reload();
});