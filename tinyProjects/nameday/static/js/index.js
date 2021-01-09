// Variables 
let nameList = document.querySelector('.name-list-0'); // <ul>
let factContent = document.querySelector('.fact-content');
let nameItem = document.querySelector('.name-item');
let homeLink0 = document.querySelector('.home-link-0'); // <a>
let homeLink1 = document.querySelector('.home-link-1'); // <a>
let aboutLink0 = document.querySelector('.about-link-0'); // <a>
let aboutLink1 = document.querySelector('.about-link-1'); // <a>

// Event listeners
document.addEventListener('DOMContentLoaded', adjustDOMAfterLoad);
document.addEventListener('click', renderFact);
aboutLink0.addEventListener('click', transitionToAbout);
aboutLink1.addEventListener('click', transitionToAbout);
homeLink0.addEventListener('click', backToLanding);
homeLink1.addEventListener('click', backToLanding);

// Functions
function transitionToAbout() {
    const tl = gsap.timeline({ defaults: { ease: "power1.out" } });
    tl.to(".about-main", { x: "0%", duration: 1 });
    tl.to(".lslider", { y: "0%", duration: 1 });
    tl.to(".rslider", { y: "0%", duration: 1 }, '-=1');
}

function backToLanding() {
    const tl = gsap.timeline({ defaults: { ease: "power1.out" } });
    tl.to(".about-main", { x: "100%", duration: 1 });
    tl.to(".lslider", { y: "100%", duration: 1 });
    tl.to(".rslider", { y: "-100%", duration: 1 }, '-=1');
}

function fetchAPIEnpoint(path) {
    // GET is the default method, so we don't need to set it
    return fetch(path,
        {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((responseData) => {
            return responseData;
        })
        .catch(error => console.warn(error));
}

// function setTextBackgroundDynamically() {
//     let position = document.querySelector(".bgtext")
//     let offsetLeft = position.offsetLeft
//     let offsetTop = position.offsetHeight
//     let span = position.firstElementChild // <span>
//     span.style.backgroundPosition = "background-position", "-" + offsetLeft + "px -" + offsetTop + "px";
// }

function rollIntro(){
    console.log("running intro");
    const tl = gsap.timeline({ defaults: { ease: "power1.out" } });
    tl.to(".intro-text", { y: "0%", duration: 1, stagger: 0.25 }).to({},2,{});
    tl.to(".intro-main", { y: "-100%", duration: 1, stagger: 0.25 });
}

function adjustDOMAfterLoad() {
    let todaysNames;

    rollIntro();
    fetchAPIEnpoint('/names')
        .then(data => todaysNames = data)
        .then(() => todaysNames.names.forEach(
            function (name) {
                const nameListEntry = document.createElement('li')
                // create name-container div
                const nameContainer = document.createElement('div');
                nameContainer.classList.add('name-container');
                nameListEntry.appendChild(nameContainer);
                // create a
                const nameItem = document.createElement('a');
                nameItem.classList.add('name-item');
                nameContainer.appendChild(nameItem);
                // h1
                const h1 = document.createElement('h1');
                h1.innerText = name;
                nameItem.appendChild(h1);
                // append li to name-list ul
                nameList.appendChild(nameListEntry);
            }
        ));
    // setTextBackgroundDynamically();
}

function renderFact(click) {
    let nameFacts;
    const tl = gsap.timeline({ defaults: { ease: "power1.out" } });
    const clickedName = click.explicitOriginalTarget.innerText

    // reset content of h1.hide
    factContent.innerHTML = null;

    fetchAPIEnpoint('/names')
        .then(data => nameFacts = data)
        .then(function (nameFacts) {
            nameFacts.trivia[nameFacts.names.indexOf(clickedName)].split("\n").forEach(
                function (content) {
                    const headerSix = document.createElement('h6')
                    headerSix.classList.add('hide');
                    const hiddenSpan = document.createElement('span');

                    // Add facts to h1.hide
                    hiddenSpan.classList.add('text');
                    hiddenSpan.innerText = content;
                    headerSix.appendChild(hiddenSpan);

                    // Add header to pre-existing DOM
                    factContent.appendChild(headerSix);

                }
            )
            // Create devider
            const devider = document.createElement('hr');
            devider.classList.add('solid');
            factContent.appendChild(devider);
            // Present the contents
            tl.to(".text", { y: "0%", duration: 1, stagger: 0.25 });
        });

}