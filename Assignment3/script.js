function insertValue(val) {
    document.getElementById("result").value += val;
}

function calculate() {
    let exp = document.getElementById("result").value;

    if (exp === "") {
        alert("Please enter some values!");
        return;
    }

    try {
        let result = eval(exp);

        if (!isFinite(result)) {
            alert("Invalid calculation!");
            return;
        }

        document.getElementById("result").value = result;

    } catch {
        alert("Invalid Expression!");
    }
}

function clearResult() {
    document.getElementById("result").value = "";
}

function squareNumber() {
    let val = document.getElementById("result").value;

    if (val === "" || isNaN(val)) {
        alert("Enter valid number for square!");
        return;
    }

    document.getElementById("result").value = val * val;
}

function promptSquare() {
    let num = prompt("Enter number to find square:");

    if (num === null || num === "" || isNaN(num)) {
        alert("Invalid input!");
    } else {
        alert("Square = " + (num * num));
    }
}