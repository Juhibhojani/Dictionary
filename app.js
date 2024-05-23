const URL = "https://api.dictionaryapi.dev/api/v2/entries/en/"

const searchBtn = document.querySelector('#search-btn');
const input = document.querySelector('#inp-word');
const result = document.querySelector('.result')
let sound = document.querySelector('#sound')


// Function to fetch meaning of word
searchBtn.addEventListener("click", async () =>{
    const inputWord = input.value;
    const data = await fetch(URL+inputWord)
    if (data.status!==200){
        result.innerHTML = "<div class='word'><h3>Sorry we couldn't find what you are looking for!</h3> </div>"
        result.style.textAlign = "center"
    }
    else{
        let response = await data.json();
        result.innerHTML = `<div class="word">
        <h3>${inputWord}</h3>
        <button onclick="playSound()">
            <i class="fas fa-volume-up"></i>
        </button>
        </div>
        <div class="details">
        <p class="type">${response[0]['meanings'][0]['partOfSpeech']}</p>
        <p class="phonetics">/${response[0].phonetic || ""}/</p>
        </div>
        <p class="word-meaning">
        ${response[0]['meanings'][0]['definitions'][0]['definition']}
        </p>
        <p class="word-example">
        ${response[0]['meanings'][0]['definitions'][0]['example'] || ""}
        </p>`
        sound.setAttribute("src",`${response[0].phonetics[0].audio || none}`)
        }
    } 
)


const playSound = ()=> {
    sound.play()
}