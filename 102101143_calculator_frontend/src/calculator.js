document.addEventListener("keydown", function (event) {
    const key = event.key;
    if (key == "Enter") {
        calculateResult();
    } else if (key == "Escape") {
        clearDisplay();
    }
});


let expr = '';

function appendToDisplay(value) {
    check();
    expr += value;
    document.getElementById('display').value = expr;
    check();
}
    
function clearDisplay() {
    check();
    expr = '';
    document.getElementById('display').value = '';
    document.getElementById('display2').value = '';
    check();
}

function formatNumber(number) {
    if (Number.isInteger(number)) {
        return number; // 如果是整数，直接返回整数
    } else {
        return parseFloat(number.toFixed(6)); // 如果是小数，保留6位小数并返回
    }
}

function delToDisplay() {
    check();
    expr = expr.slice(0, -1);
    document.getElementById('display').value = expr;
    check();
}

function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

function calculateResult() {
    check();
    try {
        expr = expr.replace(/lg/g, 'Math.log10').replace(/ln/g, 'Math.log').replace(/sqrt/g, 'Math.sqrt').replace(/sin/g, 'Math.sin').replace(/\^/g, '**').replace(/cos/g, 'Math.cos').replace(/tan/g, 'Math.tan').replace(/e/g, 'Math.E').replace(/pi/g, 'Math.PI').replace(/abs/g, 'Math.abs').replace(/(\d+)!/g, 'factorial($1)');
        expr = eval(expr);
        expr = formatNumber(expr);
        if (!/[0-9\.]/.test(String(expr))) expr = 'error';
        document.getElementById('display2').value = expr;
        check();

        expression = expr;
        result = document.getElementById('display2').value

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:5000/post_history', true);
        xhr.setRequestHeader('Content-type', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(xhr.responseText);
            }
        };

        const data = {
        expression: expression,
        result: result
        };

        xhr.send(JSON.stringify(data));

    } catch (error) {
        document.getElementById('display').value = '';
        document.getElementById('display2').value = 'error';
    }
}


function check() {
    expr = document.getElementById('display').value;
}

function send_clear(){
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:5000/send_clear', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
        }
    };
    xhr.send();
}

function get_message(){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:5000/get_calculation_data', true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            Data = JSON.parse(xhr.responseText);
            array = Data['data'];
            let string="";
            for(let i=0;i<array.length;i++){
                string +=array[i][0]+" = "+array[i][1]+"\n";
            }
            document.getElementById('display').value = string;
        } else {
            console.error('获取数据出错: ' + xhr.status);
        }
      }
    };
    xhr.send();
}
let money="";
let time="";
let rate="";
let flag = 0;

function calculateTax(){
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:5000/calculateTax', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                Data = JSON.parse(xhr.responseText);
                document.getElementById('income').value=Data["result"];
            } else {
                console.error('获取数据出错: ' + xhr.status);
            }
        }
    };

    const data = {
        time : time,
        money: money,
        category: flag
    };

    xhr.send(JSON.stringify(data));
}

function switchToRad() {
    document.querySelector(".calculator").style.display = "none";
    document.getElementById("change-tax-calculator").style.display = "none";
    document.getElementById("tax-calculator").style.display = "block";
}

function switchToDeg() {
    document.getElementById("tax-calculator").style.display = "none";
    document.getElementById("change-tax-calculator").style.display = "none";
    document.querySelector(".calculator").style.display = "block";
}

function switchToChangeRad() {
    document.getElementById("tax-calculator").style.display = "none";
    document.querySelector(".calculator").style.display = "none";
    document.getElementById("change-tax-calculator").style.display = "block";
}


function current(){
    flag = 1;
}

function limit(){
    flag = 2;
}

function loan(){
    flag = 3;
}

function check_money(){
    money = document.getElementById('money').value;
    console.log(money);
}

function check_time(){
    time = document.getElementById('time').value;
    console.log(time);
}


function check_rate(){
    rate = document.getElementById('tax_rate').value;
    console.log(rate);
}

function check_month(){
    time = document.getElementById('tax_time').value;
    console.log(time);
}

function changeTax(){
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:5000/changeTax', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                Data = JSON.parse(xhr.responseText);
            } else {
                console.error('获取数据出错: ' + xhr.status);
            }
        }
    };

    const data = {
        time: time,
        rate: rate,
        flag: flag
    };

    xhr.send(JSON.stringify(data));
}

//module.exports = {
//    calculateResult,clearDisplay,appendToDisplay,delToDisplay
//}