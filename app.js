const row1Letters = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
const row2Letters = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
const row3Letters = ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<x]']

let currentTile = 1;

const addTile = ($row, id) => {
    const $tile = $('<div>')
    $tile.attr('id', id)
    $tile.addClass('tile')
    $row.append($tile)
}

const addButton = ($row, letter) => {
    const $button = $('<button>')
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

$(() => {

    addAttemptTiles(1)

    addKeyboard()

    const buttons = $('button')
    buttons.click((e) => {
        const letter = e.currentTarget.innerText
        console.log('clicked', letter)
        $currentTile = $(`#tile-${currentTile}`)
        $currentTile.text(letter)
        currentTile++
        // e.currentTarget.disabled = true
        e.currentTarget.style.backgroundColor = 'darkgrey'
    })
});