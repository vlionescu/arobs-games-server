
window.onload = function () {

    function reset(keepScore = false){
        if (!keepScore)
            sessionStorage.setItem('score',0);
        //one session lasts as long as the browser is open, and survives over page reloads and restores, but closing a tab ends the session and clears objects
        window.location.reload();
    };

    const words=["advice",
        "arrangement",
        "attempt",
       "brick",
        "calm",
        "cookies",
        "customs",
        "damage",
       "explanation",
        "facing",
        "film",
        "finest",
        "fireplace",
        "floating",
        "folks",
        "mission",
        "monkey",
        "poetry",
        "mysterious",
        "neighborhood",
        "nuts",
        "occasionally",
        "relationship",
        "remarkable",
        "scared",
        "selection",
        "shake",
        "shaking",
        "shallow",
        "awkward",
        "pixel",
        "zombie",
    ] ;

    let word ;              // Selected word
    let lives =6 ;             // Lives
    let keepScore = false;
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];

    document.getElementById("reset").addEventListener("click", ()=>reset(keepScore));

    let sessionScore=sessionStorage.getItem('score');
    let score;
    if(sessionScore)
        score=sessionScore;
    else score=0;

    let keepingScore = function(){
        let divScore= document.getElementById("score");
        let spanScore=document.createElement("span");
        spanScore.innerHTML=score;
        spanScore.id='scoreid';
        divScore.appendChild(spanScore);

    };

    if (!sessionStorage.getItem('score')) {
        sessionStorage.setItem('score',score.toString());
    }
    keepingScore();

    let findLetterFromWords = function(element){
        letter=element.target.innerText;
        console.log(element)
        findLetterIndexes(letter)

    };

    let create_keyboard_buttons = function () {
        let myButtons = document.getElementById('buttons');
        let letters = document.createElement('ul');
        let list;
        for (let i = 0; i < alphabet.length; i++) {
            letters.id = 'alphabet';
            list = document.createElement("button");
            list.id =alphabet[i];
            list.addEventListener("click",findLetterFromWords );
            list.innerText= alphabet[i];
            list.className="letter";
            myButtons.appendChild(letters);
            letters.appendChild(list);
        }
    };
    create_keyboard_buttons();

    let selectedWord = function(){
        word=words[Math.floor(Math.random()*words.length)];
        console.log(word);
    };
    selectedWord();

    let winning = function () {
        let win=true;
        for(let i=0;i<word.length;i++){
            if(document.getElementById(i).innerText===' _') {
                console.log(document.getElementById(i.toString()).innerText)
                win = false;
            }
        }
        if(win===true){
            document.getElementById('hideImgWin').style.display="block";
            let all=document.getElementsByClassName('all')[0];
            let gameArrangement=document.getElementsByClassName('game-arrangement')[0];
            all.removeChild(gameArrangement);
            score++;
            document.getElementById('scoreid').innerText=score;
            console.log(score);
            sessionStorage.setItem('score',score);
            keepScore=true;
        }
    };
    let findLetterIndexes = function(letter) {
        let mistake = true;
        for (let i=0;i<=word.length;i++){
            if(letter===word[i]){
                document.getElementById(i).innerText=letter;
                mistake = false;
                document.getElementById(letter).style.color="white";
                document.getElementById(letter).style.backgroundColor="green";
            }
        }
        if(mistake===true){
            document.getElementById(letter).style.background="red";
            lives--;
            updateHangmanPicture();
            displayLives(lives);
            lost();
            console.log(lives)
        }
        document.getElementById(letter).disabled =true;
        winning()
        displayLives(lives);
        };

    function addImg() {
        let img = document.createElement('img');
        img.src = './images/badass.jpg';
        document.getElementsByClassName('game-arrangement').innerHtml=img;
    }

    function displayLives(number) {
        document.getElementById("lives").innerHTML = 'Lives:  ';
        for (var i = 0; i < number; i++)
            {
                let a = new Image();
                a.src = './images/hearts.png';
                a.width = 25;
                a.height = 25;
                document.getElementById("lives").appendChild(a);
            }
    }

    function updateHangmanPicture() {
        document.getElementById('hangmanPic').src = './images/' + lives + '.jpg';
    }

    let displayWordForGameGuess = function(){
        let divWord = document.getElementById('chosenWord');
        for(let i=0;i<word.length;i++){
            let selectedLetter=document.createElement("span");
            selectedLetter.innerText=' _';
            selectedLetter.id=i;
            divWord.appendChild(selectedLetter);
        }
        findLetterIndexes(word[0]);
        findLetterIndexes(word[word.length-1]);
    };
    displayWordForGameGuess();

function  lost() {
    if(lives===0){
        sessionStorage.removeItem('score');
        document.getElementById('container').style.fontSize="30px";
        document.getElementById('container').style.color="white";
        document.getElementById('container').innerHTML = 'You lost.... The answer was: ' + word;
       }
}
    function isLetter(str) {
        return str.length === 1 && str.match(/[a-z]/i);
    }
    window.addEventListener("keydown", function (event) {
        if (event.defaultPrevented) {
            return; // Do nothing if the event was already processed
        }
        if(isLetter(event.key)) {
            document.getElementById(event.key.toLowerCase()).click()
        }
    });
};