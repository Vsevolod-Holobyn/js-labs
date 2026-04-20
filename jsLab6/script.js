let allLevels = [];
let currentLevelData = null;
let moves = 0;
let seconds = 0;
let timerInterval = null;
let boardState = [];

const boardElement = document.getElementById('board');
const moveDisplay = document.getElementById('move-count');
const timerDisplay = document.getElementById('timer');
const targetDisplay = document.getElementById('target-moves');

// 1. Отримання даних із сервера AJAX/Fetch 
async function fetchLevels() {
    try {
        const response = await fetch('data.json');
        allLevels = await response.json();
        loadNewGame();
    } catch (error) {
        console.error("Помилка завантаження рівнів:", error);
    }
}

// 2. Ініціалізація нової гри 
function loadNewGame() {
    let nextLevel;
    do {
        nextLevel = allLevels[Math.floor(Math.random() * allLevels.length)];
    } while (allLevels.length > 1 && currentLevelData && nextLevel.id === currentLevelData.id);

    currentLevelData = nextLevel;
    resetStats();
    setupBoard(currentLevelData.grid);
    targetDisplay.textContent = currentLevelData.target;
}

// 3. Налаштування ігрового поля 
function setupBoard(grid) {
    boardElement.innerHTML = '';
    boardState = grid.map(function(row) {
        return [...row];
    }); 

    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = r;
            cell.dataset.col = c;
            updateCellView(cell, boardState[r][c]);
            
            cell.addEventListener('click', function() {
                handleCellClick(r, c);
            });
            
            boardElement.appendChild(cell);
        }
    }
}

// 4. Логіка натискання та перемикання сусідів
function handleCellClick(r, c) {
    toggle(r, c);       
    toggle(r - 1, c);  
    toggle(r + 1, c);   
    toggle(r, c - 1); 
    toggle(r, c + 1);  

    moves++;
    moveDisplay.textContent = moves;
    
    if (moves === 1) startTimer();
    checkWin();
}

function toggle(r, c) {
    if (r >= 0 && r < 5 && c >= 0 && c < 5) {
        boardState[r][c] = boardState[r][c] === 1 ? 0 : 1;
        const cell = boardElement.querySelector(`[data-row="${r}"][data-col="${c}"]`);
        updateCellView(cell, boardState[r][c]);
    }
}

function updateCellView(element, state) {
    if (state === 1) {
        element.classList.add('on');
        element.classList.remove('off');
    } else {
        element.classList.add('off');
        element.classList.remove('on');
    }
}

// 5. Перевірка перемоги
function checkWin() {
    const isWon = boardState.every(function(row) {
        return row.every(function(cell) {
            return cell === 0;
        });
    });

    if (isWon) {
        stopTimer();
        setTimeout(function() {
            alert("Перемога! Кроків: " + moves + ", Час: " + timerDisplay.textContent);
        }, 100);
    }
}

// 6. Таймер та статистика
function startTimer() {
    if (timerInterval) return;
    timerInterval = setInterval(function() {
        seconds++;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        timerDisplay.textContent = mins + ":" + (secs < 10 ? "0" : "") + secs;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetStats() {
    stopTimer();
    moves = 0;
    seconds = 0;
    moveDisplay.textContent = "0";
    timerDisplay.textContent = "0:00";
}

// Кнопки управління
document.getElementById('new-game-btn').addEventListener('click', loadNewGame);

// ЗАМІНЕНО: стрілкову функцію для кнопки рестарту
document.getElementById('restart-btn').addEventListener('click', function() {
    resetStats();
    setupBoard(currentLevelData.grid); 
});

// Запуск при завантаженні
window.addEventListener('DOMContentLoaded', fetchLevels);