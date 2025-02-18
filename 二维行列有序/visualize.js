// Search in a sorted matrix where each row and column is sorted in descending order.
// Finding target element using efficient search strategy starting from a corner.

// import visualization libraries {
const { Array2DTracer, LogTracer, Layout, VerticalLayout, Commander, Tracer } = require('algorithm-visualizer');
// }

class Main {
    // define tracer variables {
    constructor() {
        this.matrixTracer = new Array2DTracer("Matrix");
        this.logTracer = new LogTracer("Console");
        this.matrix = [
            [44, 32, 24, 23],
            [20, 17, 15, 14],
            [13, 11, 10, 9],
            [8, 6, 5, 2]
        ];

        // visualize {
        Layout.setRoot(new VerticalLayout([this.matrixTracer, this.logTracer]));
        this.matrixTracer.set(this.matrix);
        // }

        this.logTracer.println("Original Matrix:");
        this.visualizeMatrix();
        this.logTracer.println("\nStarting search for target: 15");
        this.findTarget(15);
    }

    // highlight full matrix {
    visualizeMatrix() {
        const rows = this.matrix.length;
        const cols = this.matrix[0].length;
        for (let i = 0; i < rows; i++) {
            let row = "";
            for (let j = 0; j < cols; j++) {
                row += this.matrix[i][j] + " ";
            }
            this.logTracer.println(row);
        }
    }
    // }

    // highlight current search area {
    highlightSearchArea(currentRow, currentCol, rowLen, colLen) {
        // Clear previous highlights

        this.matrixTracer.deselect(0, 0, colLen - 1, rowLen - 1);
        // Highlight current position strongly
        this.matrixTracer.select(currentRow, currentCol);
        Tracer.delay();
        // Highlight potential search area
        const rows = this.matrix.length;
        const cols = this.matrix[0].length;

    }
    // }

    findTarget(target) {
        // initialization {
        const row_len = this.matrix.length;
        const col_len = this.matrix[0].length;
        let row, col;
        let row_add, col_add;
        // }
        let msg = ''
        // determine starting position {
        if (this.matrix[0][0] - this.matrix[0][col_len - 1] < 0) {
            col = col_len - 1;
            msg += '开始于左';
            col_add = -1;
        } else {
            col = 0;
            msg += '开始于右';
            col_add = 1;
        }
        if (this.matrix[0][0] - this.matrix[row_len - 1][0] < 0) {
            row = 0;
            msg += '上';
            row_add = 1;
        } else {
            row = row_len - 1;
            msg += '下';
            row_add = -1;
        }
        this.logTracer.print(msg)

        // }

        // search process {
        while (row >= 0 && row < row_len && col >= 0 && col < col_len) {
            // Highlight current search area
            this.highlightSearchArea(row, col, row_len, col_len);

            this.logTracer.println(`\n检查位置 (${row},${col}): ${this.matrix[row][col]}`);

            if (this.matrix[row][col] === target) {
                this.logTracer.println(`目标值 ${target} 发现于 (${row},${col})`);
                // Mark found position with different color
                this.matrixTracer.patch(row, col, this.matrix[row][col]);
                Tracer.delay();
                return [row, col];
            }

            if (this.matrix[row][col] > target) {
                this.logTracer.println(`${this.matrix[row][col]} > ${target}, 行移动 ${col_add}`);
                col += col_add;
            } else {
                this.logTracer.println(`${this.matrix[row][col]} < ${target}, 列移动 ${row_add}`);
                row += row_add;
            }
        }
        // }

        this.logTracer.println(`\n没有找到目标值 ${target}`);
        return -1;
    }
}

// execute {
new Main();
// }