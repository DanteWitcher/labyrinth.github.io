(function (root) {
    var EMPTY = root.maze.EMPTY;
    var WALL = root.maze.WALL;
    var PATH = root.maze.PATH;
    var CURRENT = root.maze.CURRENT;

    /**
     * Функция находит путь к выходу и возвращает найденный маршрут
     *
     * @param {number[][]} maze карта лабиринта представленная двумерной матрицей чисел
     * @param {number} x координата точки старта по оси X
     * @param {number} y координата точки старта по оси Y
     * @returns {[number, number][]} маршрут к выходу представленный списоком пар координат
     */ 



    function lookForExit(maze, x, y) {
        var beggin = 0;
        var exit = [];
        for(var i = 0; i < maze.length; i++) {
            if(i == 0 || i == maze.length - 1) {
                for(var j = 0; j < maze[i].length; j++) {
                    if(((j != x) && (i != y)) && maze[i][j] == 0) {
                        exit.push([j, i]);
                    }
                }   
            }
                if(maze[i][beggin] == 0) {
                        exit.push([beggin, i]);
                }
        }
        return exit;
    }
    function way(maze, finishCord) {
        var pathing = [];
            var numberOfFinish = maze[finishCord[1]][finishCord[0]];
            pathing.unshift([finishCord[0], finishCord[1]]);
        while(numberOfFinish != 1) {
            if((finishCord[1] + 1) != maze.length) {
            var up = maze[finishCord[1] + 1][finishCord[0]]; }
            if((finishCord[1] - 1) >= 0) {
            var down = maze[finishCord[1] - 1][finishCord[0]]; }
            if((finishCord[0] - 1) >= 0) {
            var left = maze[finishCord[1]][finishCord[0] - 1]; }
            if((finishCord[0] + 1) != maze[0].length) {
            var right = maze[finishCord[1]][finishCord[0] + 1]; }

            if ((numberOfFinish - 1) == up) { 
            numberOfFinish = up;
            finishCord[1] = finishCord[1] + 1;
            pathing.unshift([finishCord[0], finishCord[1]]);
            }
            if ((numberOfFinish - 1) == down) {
            numberOfFinish = down;
            finishCord[1] = finishCord[1] - 1;
            pathing.unshift([finishCord[0], finishCord[1]]);
            }
            if((numberOfFinish - 1) == left) { 
            numberOfFinish = left;
            finishCord[0] = finishCord[0] - 1;
            pathing.unshift([finishCord[0], finishCord[1]]);
            }
            if((numberOfFinish - 1) == right) {
            numberOfFinish = right;
            finishCord[0] = finishCord[0] + 1;
            pathing.unshift([finishCord[0], finishCord[1]]);
            }
        }
        return pathing;
    }
    function solution(maze, x, y) {
    // todo: построить правильный маршрут к выходу
        var numberOfQueue = 0,
            countWave = 1,
            queue = [],
            newX = x,
            newY = y,
            answers = lookForExit(maze, x, y),
            finish = [],
            pathing = [];
        while((function(){
            for(var i = 0; i < answers.length; i++) {
                /*if(newY == 43 && (newX + 1) == 15) {
                 debugger;
                }*/
                if(newY == answers[i][0] && newX == answers[i][1]) {
                    finish.push(answers[i][0]);
                    finish.push(answers[i][1]);
                    return false;
                }
            }
            return true;
        })())
        {

        if ((maze[newX][newY + 1]) == 0) {
            maze[newX][newY + 1] = countWave;
            queue.push(new Number(countWave));
            queue[queue.length - 1].cord = [newX, newY + 1];
        }

        if ((newY - 1) >= 0 && (maze[newX][newY - 1]) == 0) {
            maze[newX][newY - 1] = countWave;
            queue.push(new Number(countWave));
            queue[queue.length - 1].cord = [newX, newY - 1];
        }

        /*if(newY == 43 && (newX + 1) == 14) {
            debugger;
        }*/
        if ((maze[newX + 1][newY]) == 0) {
            maze[newX + 1][newY] = countWave; 
            queue.push(new Number(countWave));
            queue[queue.length - 1].cord = [newX + 1, newY];
        }
        if ((newX - 1) >= 0 && (maze[newX - 1][newY]) == 0) {
            maze[newX - 1][newY] = countWave; 
            queue.push(new Number(countWave));
            queue[queue.length - 1].cord = [newX - 1, newY];
        }
        
        countWave = queue[numberOfQueue].valueOf() + 1;
        newX = queue[numberOfQueue].cord[0];
        newY = queue[numberOfQueue].cord[1];
        numberOfQueue++;
        }
        var pathing = way(maze, finish);
        pathing.unshift([x, y]);

        return pathing;
    }

    root.maze.solution = solution;
})(this);
