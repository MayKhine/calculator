const operate = (operator, num1, num2) => {
    let result = 0;
    switch (operator) {
        case '+':
            result = (num1 + num2);
            break;
        case '-':
            result = (num1 - num2);
            break;
        case '*':
            result = (num1 * num2);
            break;
        case '/':
            result = (num1 / num2);
            break
    }
    return result; //parseFloat(result.toFixed(3));
}
let calcFlag = 0;
const operateAndReset = () => {

    calculatedVal = operate(mathEquation[1], parseFloat(mathEquation[0]), parseFloat(mathEquation[2]))
    // tempMathEquation = mathEquation.push('=')
    // mathEquation.push('=');
    mathEquation = [];
    mathEquation.push(calculatedVal);

    // console.log({ calculatedVal })
    // euqationReset = 1;
    prevVal = '';
    calculatedVal = 0;
    calcFlag = 1;
}

const operateForEqual = () => {
    calculatedVal = operate(mathEquation[1], parseFloat(mathEquation[0]), parseFloat(mathEquation[2]))
    mathEquation.push('=');
    mathEquation.push(calculatedVal);
    prevVal = calculatedVal;
    calculatedVal = 0;
}
const percentage = (num) => {
    return (num / 100)
}

const flipVal = (num) => {
    return num * (-1)
}

const isOperator = (value) => {
    if (value == '+' || value == '-' || value == '*' || value == '/') {
        return true
    } else {
        return false
    }
}

const display = (arr) => {

    if (arr.length >= 1 && arr[arr.length - 1].length > 16) {
        //print NaN
        displayScreen.forEach((i) => {
            i.innerHTML = 'NaN'
        })
    }
    else {
        displayScreen.forEach((i) => {
            if (prevVal == '' || prevVal == 'REPLACE') {
                if (arr.length > 0 && isOperator(arr[arr.length - 1]) != true) {
                    // i.innerHTML = arr[arr.length - 1]
                    i.innerHTML = roundDeci(arr[arr.length - 1])

                }
                else {
                    if (arr.length >= 2) {
                        // i.innerHTML = arr[arr.length - 2]
                        i.innerHTML = roundDeci(arr[arr.length - 2])

                    }
                    else {
                        i.innerHTML = 0
                    }
                }
            } else {
                // i.innerHTML = prevVal
                i.innerHTML = roundDeci(prevVal)

            }
        })
    }
}

const roundDeci = (num) => {
    // return parseFloat(num.toFixed(10));
    num = num.toString()

    let deciPosition = num.indexOf('.')
    let ePosition = num.indexOf('e')

    if (calcFlag == 1) {
        if (deciPosition != -1 && (ePosition - deciPosition) > 5) {
            num = num.substr(0, (deciPosition + 6)) + num.substr(ePosition)

        } else if (deciPosition != -1 && (num.length - deciPosition) > 5) {
            num = parseFloat(num).toFixed(5)
        }
        calcFlag = 0
        mathEquation.pop()
        mathEquation.push(num)
    }
    return num
}

let mathEquation = [];
let euqationReset = 0;
let prevVal = '';
let calculatedVal = 0;
const containerEle = document.querySelector(".container");
const gridContainerEle = document.querySelector(".grid-container");
let gridItems = document.querySelectorAll('.grid-item')
// let displayScreen = document.querySelectorAll('.display')

let displayScreen = document.querySelectorAll('.calc-display')
// let displayScreen2 = document.querySelectorAll('.calc-display2')

let deciFlag = 0;

gridItems.forEach((item) => {
    item.addEventListener('click', (item) => {

        let itemVal = item.target.getAttribute('value')

        // AC is clicked, clear everything
        if (itemVal == 'AC') {
            mathEquation = [];
            prevVal = '';
            deciFlag = 0;
            // console.log('AC : ', { mathEquation, prevVal })
        }
        // = is clicked
        else if (itemVal == 'equal') {
            // call the operate function
            if (mathEquation.length > 2) {

                operateAndReset();
                // operateForEqual();
            }
        }
        // +/- is clicked, flip the last input number
        else if (itemVal == 'flip' && mathEquation.length > 0 && prevVal != '') {
            let lastVal = mathEquation[mathEquation.length - 1]

            if (isOperator(lastVal)) {
                mathEquation.pop()
                lastVal = mathEquation[mathEquation.length - 1]
                mathEquation.pop()
            } else {
                mathEquation.pop()
            }
            mathEquation.push(flipVal(lastVal))
            prevVal = 'REPLACE';
            deciFlag = 0;
        }
        //percent is clicked
        else if (itemVal == 'percent' && mathEquation.length > 0 && prevVal != '') {
            const lastVal = mathEquation[mathEquation.length - 1]
            mathEquation.pop()
            mathEquation.push(percentage(lastVal))
            prevVal = 'REPLACE'
            deciFlag = 0;
        }
        // deciaml is clicked
        else if (itemVal == 'deci') {
            if (deciFlag == 0) {
                if (prevVal) {
                    mathEquation.pop()
                    prevVal = prevVal + '.'
                    mathEquation.push(prevVal)
                } else {
                    prevVal = '0' + '.'
                    mathEquation.push(prevVal)
                }
                deciFlag = 1
            }
        }
        //add num to equation
        else if (!isOperator(itemVal) && itemVal != 'percent' && itemVal != 'flip') {
            //if preVal exist 
            if (prevVal) {
                mathEquation.pop()

                if (prevVal == 'REPLACE') {
                    itemVal = itemVal
                }

                else {
                    itemVal = prevVal + '' + itemVal
                }
                mathEquation.push(itemVal)
                prevVal = itemVal
            }
            else {
                if (!isOperator(mathEquation[mathEquation.length - 1])) {
                    //reset and add the new 
                    mathEquation = []
                }
                mathEquation.push(itemVal)
                prevVal = itemVal
            }
        }  //if the math equation length is longer than 2 then calcualte
        else if (mathEquation.length > 2) {
            // console.log('CALL THE OPERATE FUNCTION')
            operateAndReset();
            mathEquation.push(itemVal)
        }
        //add operator to equation 
        else if (isOperator(itemVal) && mathEquation.length > 0) {
            //if last input was an operator, update it
            if (isOperator(mathEquation[mathEquation.length - 1])) {
                mathEquation.pop()
            }
            mathEquation.push(itemVal)
            prevVal = '';
            deciFlag = 0;
        }

        console.log(mathEquation)
        display(mathEquation)
    })
})