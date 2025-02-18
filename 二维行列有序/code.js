const rl = require("readline").createInterface({ input: process.stdin });
const iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
const out = process.stdout;
async function findTarget() {
    let matrix = [], target, line;
    line = await readline()
    // 获取输⼊的n
    n = parseInt(line);
    // console.log(n);
    // 获取第⼀⾏字符串
    for (let i = 0; i < n; i++) {
        let arr = (await readline()).split(' ');
        matrix.push(arr);
    }
    // console.log(matrix);
    target = parseInt(await readline());


    if (!matrix || !matrix.length || !matrix[0].length) return -1;
    const row_len = matrix.length;
    const col_len = matrix[0].length;
    let row, col;// 用于确定出发点
    const row_add = (() => { //找大走列
        if (matrix[0][0] - matrix[row_len - 1][0] < 0 ? 1 : -1) {
            row = 0;
            return 1;
        } else {
            row = row_len - 1;
            return -1
        }
    })();
    const col_add = (() => {//找小走行，故需要找行最大
        if (matrix[0][0] - matrix[0][col_len - 1] < 0) {
            col = col_len - 1;
            return -1;
        } else {
            col = 0;
            return 1;
        }
    })();
    while (row >= 0 && row < row_len && col >= 0 && col < col_len) {
        console.log(row,col,matrix[row][col])
        if (matrix[row][col] == target) return [row, col];
        if (matrix[row][col] > target) {
            col += col_add;
        } else {
            row += row_add;
        }
    }
    return -1;
}
async function main(){
    console.log(await findTarget());
    return;
}
main();
