const operate = (operator, num1, num2) => {
    let result = 0;
    console.log({ operator, num1, num2 })
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
const operateAndReset = () => {
    calculatedVal = operate(mathEquation[1], parseFloat(mathEquation[0]), parseFloat(mathEquation[2]))
    console.log({ calculatedVal })
    mathEquation = [];
    mathEquation.push(calculatedVal);
    prevVal = '';
    calculatedVal = 0;
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
let deciFlag = 0;

gridItems.forEach((item) => {
    item.addEventListener('click', (item) => {
        let itemVal = item.target.getAttribute('value')

        // AC is clicked, clear everything
        if (itemVal == 'AC') {
            mathEquation = [];
            prevVal = '';
            deciFlag = 0;
            console.log('AC : ', { mathEquation, prevVal })
        }

        // = is clicked
        else if (itemVal == 'equal') {
            console.log('CALL THE OPERATE FUNCTION')
            // call the operate function
            if (mathEquation.length > 2) {
                operateAndReset();
            }
        }

        // +/- is clicked, flip the last input number
        else if (itemVal == 'flip' && mathEquation.length > 0) {
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
        else if (itemVal == 'percent' && mathEquation.length > 0) {
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
                    prevVal = prevVal + '.'
                } else {
                    prevVal = '0' + '.'
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
                mathEquation.push(itemVal)
                prevVal = itemVal
            }
        }  //if the math equation length is longer than 2 then calcualte
        else if (mathEquation.length > 2) {

            console.log('CALL THE OPERATE FUNCTION')
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
    })
})