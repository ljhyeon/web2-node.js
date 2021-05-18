var fs = require('fs');

/*console.log('A');
var result = fs.readFileSync("../syntax/sample.txt", "utf8");
console.log(result);
console.log('C');*/

console.log('A');
// 아래 코드 동시에 실행
fs.readFile('../syntax/sample.txt', 'utf8', function(err, result) {
    console.log(result);
});
console.log('C');