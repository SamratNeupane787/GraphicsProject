document.addEventListener("DOMContentLoaded", function () {
    const gameContainer = document.getElementById("game-container");
    const startButton = document.querySelector(".start-button");
    const gameOverPopup = document.getElementById("game-over-popup");
    const restartButton = document.getElementById("restart-button");
    const scoreDisplay = document.getElementById("score");
    const scorePage = document.querySelector(".score-page")
    const infor = document.querySelector(".Press")
  const instruction = document.getElementById("instruction")
    const gridSize = 20;
    let snake = [{ x: 5, y: 5 }];
    let direction = "right";
    let food = {};
    let score = 0;
    let isGameOver = false;
    let gameInterval;

    function createCell(x, y, className) {
      const cell = document.createElement("div");
      cell.className = "cell " + className;
      cell.style.left = x * gridSize + "px";
      cell.style.top = y * gridSize + "px";
      return cell;
    }

    function createGameGrid() {
      for (let y = 0; y < 20; y++) {
        for (let x = 0; x < 20; x++) {
          const cell = createCell(x, y, "empty");
          gameContainer.appendChild(cell);
        }
      }
    }

    function createFood() {
      const x = Math.floor(Math.random() * 20);
      const y = Math.floor(Math.random() * 20);
      food = { x, y };
      const foodCell = createCell(x, y, "food");
      gameContainer.appendChild(foodCell);
    }

    function updateGameBoard() {
      const cells = document.querySelectorAll(".cell");
      cells.forEach((cell) => {
        cell.className = "cell empty";
      });

      snake.forEach((part) => {
        const { x, y } = part;
        const cell = createCell(x, y, "snake");
        gameContainer.appendChild(cell);
      });

      const foodCell = createCell(food.x, food.y, "food");
      gameContainer.appendChild(foodCell);
    }

    function moveSnake() {
      const head = { ...snake[0] };
        let highScore=0;

      switch (direction) {
        case "up":
          head.y -= 1;
          break;
        case "down":
          head.y += 1;
          break;
        case "left":
          head.x -= 1;
          break;
        case "right":
          head.x += 1;
          break;
      }

      snake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreDisplay.textContent = score;
        createFood();
      } else {
        snake.pop();
      }

      scorePage.innerHTML = `<p>Score : ${score}</p>`

     

    }

    function checkCollision() {
      const head = snake[0];
      if (
        head.x < 0 ||
        head.x >= 20 ||
        head.y < 0 ||
        head.y >= 20 ||
        snake
          .slice(1)
          .some((part) => part.x === head.x && part.y === head.y)
      ) {
        isGameOver = true;
        clearInterval(gameInterval);
        gameOverPopup.style.display = "block";
      }
    }

    function startGame() {
        infor.style.display = "none";
        instruction.style.display= "none";
      snake = [{ x: 5, y: 5 }];
      direction = "right";
      score = 0;
      isGameOver = false;
      gameInterval = setInterval(() => {
        moveSnake();
        checkCollision();
        updateGameBoard();
      }, 200);

      createFood();
      updateGameBoard();
      startButton.disabled = true;
      gameOverPopup.style.display = "none";
    }

    startButton.addEventListener("click", startGame);

    restartButton.addEventListener("click", () => {
      startGame();
      gameOverPopup.style.display = "none";
    });

    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowUp":
          if (direction !== "down") direction = "up";
          break;
        case "ArrowDown":
          if (direction !== "up") direction = "down";
          break;
        case "ArrowLeft":
          if (direction !== "right") direction = "left";
          break;
        case "ArrowRight":
          if (direction !== "left") direction = "right";
          break;
      }
    });

    createGameGrid();
  });