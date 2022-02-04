import words from './words.js'

const MAX_ATTEMPTS = 6

const answer = words[Math.floor(Math.random() * words.length)]
console.log(answer)

const row1Letters = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
const row2Letters = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
const row3Letters = ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<x]']

let currentTile = 1;
let attemptNum = 1;

const addTile = ($row, id) => {
    const $tile = $('<div>')
    $tile.attr('id', id)
    $tile.addClass('tile')
    $row.append($tile)
}

const addButton = ($row, letter) => {
    const $button = $('<button>')
    $button.attr('id', `kb-${letter}`)
    $button.text(letter)
    $row.append($button)
}

const addKeyboard = () => {
    const $row1 = $('#kb-row1')
    row1Letters.forEach(ch => addButton($row1, ch))
    const $row2 = $('#kb-row2')
    row2Letters.forEach(ch => addButton($row2, ch))
    const $row3 = $('#kb-row3')
    row3Letters.forEach(ch => addButton($row3, ch))
}

const addAttemptTiles = attemptNum => {
    const $row = $(`#attempt-row${attemptNum}`)
    for (let i = 1; i <= 5; i++) {
        addTile($row, `tile-${(attemptNum - 1) * 5 + i}`)
    }
}

const setKBColor = (ch, t, mode) => {
    let backgroundColour = 'darkgrey'
    let textColour = 'white'

    if (mode === 'correct') {
        backgroundColour = 'green'
    } else if (mode === 'partial') {
        backgroundColour = 'tan'
    } else {
        textColour = 'black'
    }

    $(`#tile-${t}`).css('background-color', backgroundColour)
    $(`#tile-${t}`).css('color', textColour)
    $(`#kb-${ch}`).css('background-color', backgroundColour)
    $(`#kb-${ch}`).css('color', textColour)
}

const checkAnswer = () => {
    const guess = extractWord()

    let greens = 0
    let tileNum = (attemptNum - 1) * 5 + 1
    guess.forEach((ch, i) => {
        if (ch === answer[i]) {
            greens++
            setKBColor(ch, tileNum, 'correct')
        } else if (answer.includes(ch)) {
            setKBColor(ch, tileNum, 'partial')
        } else {
            setKBColor(ch, tileNum)
        }

        tileNum++
    })

    return greens === 5
}

const extractWord = () => {
    const w = []
    for (let i = 1; i <= 5; i++) {
        w.push($(`#tile-${(attemptNum - 1) * 5 + i}`).text())
    }

    return w
}

const processInput = letter => {
    if (letter === 'ENTER') {
        if (currentTile > attemptNum * 5) {

            const winGame = checkAnswer()

            if (winGame) {
                endGame()
                alert('You win!')
            } else {
                attemptNum++
                if (attemptNum <= MAX_ATTEMPTS) {
                    addAttemptTiles(attemptNum)
                } else {
                    endGame()
                    alert('Game over...')
                }
            }
        } else {
            alert('to complete 5-letter word')
        }
    } else if (letter === '<x]') {
        if (currentTile > (attemptNum - 1) * 5 + 1) {
            currentTile--
            $(`#tile-${currentTile}`).text(null)
        }
    } else if (currentTile <= attemptNum * 5) {
        $(`#tile-${currentTile}`).text(letter)
        currentTile++
    }
}


const endGame = () => {
    $('button').attr('disabled', true)
}

$(() => {

    addAttemptTiles(1)

    addKeyboard()

    $('button').click(e => processInput(e.currentTarget.innerText))
});