////Global Variables////

let currentGame

fetch('http://localhost:3000/games')
.then(response => response.json())
.then(gameData => {
    ////Wishlist of Functions////
    //function to render games to the game list nav as an h5, including name and manufacturer
    renderGames(gameData)
    //function to render the game details 
    renderGameDetails(gameData[0])
    //function to input and save (until refresh) the highscore for a game
    highScore()
})

function renderGames(games) {
    let gameList = document.querySelector(".game-list");
    games.forEach(game => {
        let gameItem = document.createElement('h5')
        gameItem.textContent = `${game.name} (${game.manufacturer_name})`
        gameList.append(gameItem)

        //Challenge 3
        gameItem.addEventListener('click', () => {
            renderGameDetails(game)
        })
    })
}

//Challenge 2

function renderGameDetails(gameItem) {
    currentGame = gameItem
    //selectors for details
    let gameImage = document.querySelector("#detail-image")
    let gameTitle = document.querySelector("#detail-title")
    let gameHighScore = document.querySelector("#detail-high-score")

    gameImage.src = currentGame.image
    gameTitle.textContent = currentGame.name
    gameHighScore.textContent = currentGame.high_score
}

//Challenge 4

function highScore() {
    let highScoreForm = document.querySelector("#high-score-form")
    highScoreForm.addEventListener('submit', (e) => {
        e.preventDefault()

        if (currentGame.high_score > gameHighScore.textContent) {        
        currentGame.high_score = parseInt(e.target["score-input"].value)
        } 
        
        renderGameDetails(currentGame)
        highScoreForm.reset()
        console.log(currentGame)
    })
}