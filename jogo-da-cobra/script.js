$(function () {

    const canvas = $('#canvas')[0];
    const ctx = canvas.getContext('2d');
    const block = 10;

    let snake, food, score, dir, speed, loop, maxScore = 0;

    function init() {
        snake = [
            {x: 200, y: 50},
            {x: 200, y: 40},
            {x: 200, y: 30},
            {x: 200, y: 20}
        ];

        food = randomBlock();
        score = 0;
        dir = "down";
        speed = 150;

        $('#pontos').text(score);
        
        clearInterval(loop);
        loop = setInterval(gameLoop, speed);
    }

    function gameLoop() {
        move();
        if (collision()) return gameOver();

        if (ateFood()) {
            score++;
            $('#pontos').text(score);
            snake.push({...snake[snake.length - 1]});
            food = randomBlock();
            increaseSpeed();
        }

        draw();
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // food
        ctx.fillStyle = "lime";
        ctx.fillRect(food.x, food.y, block, block);

        // snake
        ctx.fillStyle = "red";
        snake.forEach(s => ctx.fillRect(s.x, s.y, block, block));
    }

    function move() {
        let head = {...snake[0]};

        if (dir === "up") head.y -= block;
        if (dir === "down") head.y += block;
        if (dir === "left") head.x -= block;
        if (dir === "right") head.x += block;

        snake.unshift(head);
        snake.pop();
    }

    function collision() {
        let h = snake[0];

        // parede
        if (h.x < 0 || h.x >= canvas.width || h.y < 0 || h.y >= canvas.height)
            return true;

        // corpo
        return snake.slice(1).some(p => p.x === h.x && p.y === h.y);
    }

    function ateFood() {
        return snake[0].x === food.x && snake[0].y === food.y;
    }

    function increaseSpeed() {
        if (speed > 60) {
            speed -= 10;
            clearInterval(loop);
            loop = setInterval(gameLoop, speed);
        }
    }

    function randomBlock() {
        return {
            x: Math.floor(Math.random() * (canvas.width / block)) * block,
            y: Math.floor(Math.random() * (canvas.height / block)) * block
        };
    }

    function gameOver() {
        if (score > maxScore) {
            maxScore = score;
        }
        $('#maxScore').text(maxScore);
        clearInterval(loop);
        alert("Game Over!");
    }

    // controles
    $(document).keydown(e => {
        const k = e.which;

        if (k === 38 && dir !== "down") dir = "up";
        if (k === 40 && dir !== "up") dir = "down";
        if (k === 37 && dir !== "right") dir = "left";
        if (k === 39 && dir !== "left") dir = "right";
    });

    // reiniciar
    $('#restart').click(init);

    init();
});
