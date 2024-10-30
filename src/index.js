import {pop} from "./controllers/pop";
import {open} from "./controllers/open";

window.onload = (event) => {
    startXIDARTimeout();
}
window.navigation.addEventListener("navigate", (event) => {
    startXIDARTimeout();
});

function startXIDARTimeout() {
    const testPhase = true; //Change to false once the event started
    const urlParams = new URLSearchParams(window.location.search);
    const isHalloweenTest = urlParams.get('halloweenTest');
    if ((testPhase && isHalloweenTest) || !testPhase) {
        const timeoutPop = setTimeout(async () => {
            await requestPop();
        }, Math.floor(Math.random() * (15000 - 5000 + 1) + 5000));
    }
}

let lastPopCall = null;

async function requestPop() {
    //Call API to get item (ot not)
    let itemToPop = (lastPopCall === null || (((new Date()).getTime() - lastPopCall.getTime()) / 1000) > 5) ? (await pop()) : null;

    if (itemToPop) {
        lastPopCall = new Date();
        //Get page size
        const body = document.body,
            html = document.documentElement;

        const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const width = window.innerWidth;

        //Create CSS
        if (document.contains(document.getElementById("XIDARHalloweenItemStyle"))) {
            document.getElementById("XIDARHalloweenItemStyle").remove();
        }
        const elStyle = document.createElement('style');
        elStyle.id = 'XIDARHalloweenItemStyle';
        elStyle.type = 'text/css';
        elStyle.innerText = '#XIDARHalloweenItem {' +
            '  position: absolute !important;' +
            '  z-index: 99999999 !important;' +
            '  cursor: pointer !important;' +
            '  pointer-events: all !important;' +
            '  margin-top: ' + Math.floor(Math.random() * ((height - 90) - 90 + 1) + 90) + 'px !important;' +
            '  margin-left: ' + Math.floor(Math.random() * ((width - 90) - 90 + 1) + 90) + 'px !important;' +
            '  width: 5vw !important;' +
            '  min-width: 90px;' +
            '}' +
            '.XIDAR-halloween-effect {' +
            '  animation-name: XIDAR-halloween-bounce, XIDAR-halloween-shade !important;' +
            '  animation-timing-function: ease, ease !important;' +
            '  animation-duration: 4s, 10s !important;' +
            '  animation-iteration-count: infinite, infinite !important;' +
            '}' +
            '@keyframes XIDAR-halloween-bounce {' +
            '  0%   { transform: translateY(0); }' +
            '  50%  { transform: translateY(-20px); }' +
            '  100% { transform: translateY(0); }' +
            '}' +
            '@keyframes XIDAR-halloween-shade {' +
            '  0%   { opacity: 1; }' +
            '  75%  { opacity: 0.1; }' +
            '  100% { opacity: 1; }' +
            '}';
        document.head.appendChild(elStyle);

        //Create item image
        if (document.contains(document.getElementById("XIDARHalloweenItem"))) {
            document.getElementById("XIDARHalloweenItem").remove();
        }

        const popInstant = Date.now();

        const elImg = document.createElement('img');
        elImg.id = 'XIDARHalloweenItem'
        elImg.src = 'https://my.xidar.io/assets/images/halloween/items/' + itemToPop.item + '.png';
        elImg.className = 'XIDAR-halloween-effect'
        elImg.onclick = async (event) => {
            await requestOpen(event.target, itemToPop.uniqId, popInstant);
        }
        document.body.prepend(elImg);
    }
}


async function requestOpen(itemElement, uniqId, popInstant) {
    const openInstant = Date.now();

    itemElement.remove();

    let itemToOpen = (await open(uniqId, popInstant, openInstant));

    if (itemToOpen) {
        //Create CSS
        if (document.contains(document.getElementById("XIDARHalloweenModalStyle"))) {
            document.getElementById("XIDARHalloweenModalStyle").remove();
        }
        const elStyle = document.createElement('style');
        elStyle.id = 'XIDARHalloweenModalStyle';
        elStyle.type = 'text/css';
        elStyle.innerText = '#XIDARHalloweenModal {' +
            '  display: none;' +
            '  position: fixed;' +
            '  z-index: 99999999999;' +
            '  padding-top: 100px;' +
            '  left: 0;' +
            '  top: 0;' +
            '  width: 100%;' +
            '  height: 100%;' +
            '  overflow: auto;' +
            '  background-color: rgb(0,0,0);' +
            '  background-color: rgba(0,0,0,0.4);' +
            '}' +
            '#XIDARHalloweenModal .xidar-modal-content {' +
            '  border-radius: 10px;' +
            '  color: #FFFFFF;' +
            '  font-family: Arial, Helvetica, sans-serif;' +
            '  background-image: url(\'https://my.xidar.io/assets/images/halloween/bkg.jpg\');' +
            '  background-size: 100% 100%;' +
            '  border: none !important;' +
            '  -webkit-box-shadow: 0px 0px 15px 1px rgba(122,86,156,.7);' +
            '  -moz-box-shadow: 0px 0px 15px 1px rgba(122,86,156,.7);' +
            '  box-shadow: 0px 0px 15px 1px rgba(122,86,156,.7);' +
            '  margin: auto;' +
            '  padding: 20px;' +
            '  width: 80%;' +
            '  max-width: 800px;' +
            '  /*height: 80%;' +
            '  max-height: 600px;*/' +
            '}' +
            '#XIDARHalloweenModal .xidar-close {' +
            '  color: #aaaaaa;' +
            '  float: right;' +
            '  font-size: 28px;' +
            '  font-weight: bold;' +
            '}' +
            '#XIDARHalloweenModal .xidar-trick-treat {' +
            '  padding: 40px 10px;' +
            '  text-align: center;' +
            '}' +
            '#XIDARHalloweenModal .xidar-trick-treat .xidar-text {' +
            '  padding-bottom: 30px;' +
            '  font-size: 20px;' +
            '}' +
            '#XIDARHalloweenModal .xidar-trick-treat img {' +
            '  display: inline-block;' +
            '  vertical-align: middle;' +
            '  width: 50%;' +
            '}' +
            '#XIDARHalloweenModal .xidar-trick-treat .xidar-ticket {' +
            '  width: 25%;' +
            '}' +
            '#XIDARHalloweenModal .xidar-close:hover,' +
            '#XIDARHalloweenModal .xidar-close:focus {' +
            '  color: #000;' +
            '  text-decoration: none;' +
            '  cursor: pointer;' +
            '}';
        document.head.appendChild(elStyle);


        //Create modal
        if (document.contains(document.getElementById("XIDARHalloweenModal"))) {
            document.getElementById("XIDARHalloweenModal").remove();
        }
        const elModal = document.createElement('div');
        elModal.id = 'XIDARHalloweenModal';
        document.body.prepend(elModal);

        let modalContent = '';
        if (itemToOpen['type'] === "trick") {
            modalContent =
                '<div class="xidar-trick-treat">' +
                '<div class="xidar-text">Oops, you\'ve been tricked! Looks like the real treat is still hiding… keep hunting! 🎃👻</div>' +
                '<img src="https://my.xidar.io/assets/images/halloween/trick.png">' +
                '</div>';
        } else if (itemToOpen['type'] === "treat") {
            modalContent =
                '<div class="xidar-trick-treat">' +
                '<div class="xidar-text">Congratulations, you found it! 🎉 You\'ve earned some tickets—happy haunting! 🎃👻</div>' +
                '<img class="xidar-ticket" src="https://my.xidar.io/assets/images/halloween/ticket' + itemToOpen.tickets + '.png">' +
                '<img src="https://my.xidar.io/assets/images/halloween/treat.png">' +
                '</div>';
        }
        elModal.innerHTML =
            '<div class="xidar-modal-content">' +
            '    <span class="xidar-close" onClick="document.getElementById(\'XIDARHalloweenModal\').style.display = \'none\'">&times;</span>' +
            modalContent
        '  </div>';

        elModal.style.display = "block";
    }
}
