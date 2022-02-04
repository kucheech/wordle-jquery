const row1Letters = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
const row2Letters = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
const row3Letters = ['ENTER','Z','X','C','V','B','N','M', '<x]']

const addButton = ($row, letter) => {
    const $button = $('<button>')
    $button.text(letter)
    $row.append($button)
}

const addKeyboard = () => {
    const $row1 = $('#row1')
    row1Letters.forEach(ch => addButton($row1, ch))
    const $row2 = $('#row2')
    row2Letters.forEach(ch => addButton($row2, ch))
    const $row3 = $('#row3')
    row3Letters.forEach(ch => addButton($row3, ch))
}

$(() => {

    addKeyboard()

    const buttons = $('button')
    buttons.click((e) => {
        const letter = e.currentTarget.innerText
        console.log('clicked', letter)
        // e.currentTarget.disabled = true
        e.currentTarget.style.backgroundColor = 'darkgrey'
    })
});