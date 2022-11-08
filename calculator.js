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
    return parseFloat(result.toFixed(3));

}

const percentage = (num) => {
    return (num / 100)
}

const flipVal = (num) => {
    return num * (-1)
}

const checkEquation = (mathArr) => {

}

const isOperator = (value) => {
    if (value == '+' || value == '-' || value == '*' || value == '/') {
        return true
    } else {
        return false
    }
}
// const result = operate('*', 3.123, 3)
// const result = flipVal(-81)
// console.log('Result: ', result)

let mathEquation = [];
let prevVal = '';
let calculatedVal = 0;
const containerEle = document.querySelector(".container");
const gridContainerEle = document.querySelector(".grid-container");
let gridItems = document.querySelectorAll('.grid-item')
let deciFlag = false;

gridItems.forEach((item) => {
    item.addEventListener('click', (item) => {
        let itemVal = item.target.getAttribute('value')

        if (itemVal == 'AC') {
            mathEquation = [];
            prevVal = '';
            console.log({ mathEquation, prevVal })
        }
        //add operator to equation
        else if (mathEquation.length > 0 && isOperator(itemVal)) {
            if (isOperator(mathEquation[mathEquation.length - 1])) {
                mathEquation.pop()
            }
            mathEquation.push(itemVal)
            prevVal = '';
            console.log('ItemVal: ', itemVal, ':prevVal', prevVal, mathEquation)
        }
        else if (itemVal == 'flip') {
            const lastVal = mathEquation[mathEquation.length - 1]
            mathEquation.pop()
            mathEquation.push(flipVal(lastVal))
            prevVal = 'REPLACE'
            console.log({ lastVal, prevVal })

            console.log('ItemVal: ', itemVal, ':prevVal', prevVal, mathEquation)
        }
        else if (itemVal == 'percent') {
            const lastVal = mathEquation[mathEquation.length - 1]
            mathEquation.pop()
            mathEquation.push(percentage(lastVal))
            prevVal = 'REPLACE'
            console.log({ lastVal, prevVal })

            console.log('ItemVal: ', itemVal, ':prevVal', prevVal, mathEquation)
        }
        else if (itemVal == 'deci') {
            deciFlag = true;
            console.log('DECI')
        }
        //add num to equation
        else if (!isOperator(itemVal) && itemVal != '=' && itemVal != 'flip') {
            if (prevVal) {
                console.log(prevVal, deciFlag)
                mathEquation.pop()

                if (prevVal == 'REPLACE') {
                    // mathEquation.pop()
                    itemVal = parseFloat(itemVal)
                }
                else if (deciFlag == true) {
                    itemVal = parseFloat(prevVal) + parseFloat(itemVal * (1 / 10))
                    // deciFlag = false
                }
                else {
                    itemVal = parseFloat(prevVal * 10) + parseFloat(itemVal)
                }
                // mathEquation.pop()
                mathEquation.push(itemVal)
                prevVal = itemVal
                console.log('ItemVal: ', itemVal, ':prevVal', prevVal, mathEquation)
            }
            else {
                mathEquation.push(itemVal)
                prevVal = itemVal
                console.log('ItemVal: ', itemVal, ':prevVal', prevVal, mathEquation)
            }
        }
    })
})