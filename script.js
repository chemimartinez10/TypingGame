const word = document.getElementById('word')
const text = document.getElementById('text')
const scoreEl = document.getElementById('score')
const timeEl = document.getElementById('time')
const endGameContainer = document.getElementById('end-game-container')
const settingsForm = document.getElementById('settings-form')
const settings = document.getElementById('settings')
const settingsBtn = document.getElementById('settings-btn')
const difficultySelect = document.getElementById('difficulty')

const timeWord = 5
const words = []

let randomWord;
let score = 0;
let time = 10;
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium'

difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium'

text.focus()

const timeInterval = setInterval(updateTime, 1000)

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)].toLowerCase()
}

function addWordDOM() {
    randomWord = getRandomWord()
    word.innerHTML = randomWord
}
async function fetchWords() {
    const res = await fetch('https://random-word-api.herokuapp.com/word?number=30')
    const data = await res.json()
    data.forEach(a => words.push(a))
    addWordDOM()
}

function updateScore() {
    score++
    scoreEl.innerHTML = score
}

function updateTime() {
    time--;
    timeEl.innerHTML = `${time} seg`

    if (time === 0) {
        clearInterval(timeInterval)
        //endGame
        gameOver()
    }
}

function gameOver() {
    endGameContainer.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button onClick="location.reload()">Reload</button>
    
    `
    endGameContainer.style.display = 'flex'
}

text.addEventListener('input', e => {
    const insertedText = e.target.value
    if (insertedText === randomWord) {
        addWordDOM()
        updateScore()
        e.target.value = ''
        if (difficulty === 'hard') {
            time += 3
        } else if (difficulty === 'medium') {
            time += 5
        } else {
            time += 7
        }

        updateTime()
    }
})

settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'))

settingsForm.addEventListener('change', e => {
    difficulty = e.target.value
    localStorage.setItem('difficulty', difficulty)
})

fetchWords()