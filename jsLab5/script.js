document.addEventListener("DOMContentLoaded", function() {
    const startBtn = document.getElementById("startBtn");
    const pixel = document.getElementById("pixel");
    const scoreDisplay = document.getElementById("score");
    const timerDisplay = document.getElementById("timer");
    const difficultySelect = document.getElementById("difficulty");
    const colorSelect = document.getElementById("color");
    const setupDiv = document.getElementById("setup");
    const gameInfo = document.getElementById("game-info");

    let score = 0;
    let timeLeft = 0;
    let gameInterval = null;
    let currentSettings = { time: 0, size: 0 };

    const levels = {
        lazy: { time: 4, size: 60 },
        normal: { time: 2, size: 50 },
        hard: { time: 1, size: 30 }
    };

    function movePixel() {
        const maxX = window.innerWidth - currentSettings.size;
        const maxY = window.innerHeight - currentSettings.size - 100; 
        
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY) + 100;

        pixel.style.left = randomX + "px";
        pixel.style.top = randomY + "px";
    }

    function startTimer() {
        if (gameInterval) clearInterval(gameInterval); 
        
        timeLeft = currentSettings.time;
        timerDisplay.textContent = timeLeft;

        gameInterval = setInterval(function() {
            timeLeft--;
            timerDisplay.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(gameInterval);
                pixel.style.display = "none";
                alert("Game Over! Your score is " + score + ". Please, reload the page to start a new game.");
            }
        }, 1000);
    }

    startBtn.onclick = function() {
        const diff = difficultySelect.value;
        const color = colorSelect.value;

        if (!diff || !color) return;

        score = 0;
        scoreDisplay.textContent = score;
        currentSettings = levels[diff];

        pixel.style.width = currentSettings.size + "px";
        pixel.style.height = currentSettings.size + "px";
        pixel.style.backgroundColor = color;
        pixel.style.display = "block";
        
        setupDiv.style.display = "none";
        gameInfo.style.display = "block";

        movePixel();
        startTimer();
    };

    pixel.onclick = function() {
        if (timeLeft > 0) {
            score++;
            scoreDisplay.textContent = score;
            movePixel();
            startTimer(); 
        }
    };
});