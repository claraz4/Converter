export function base10ToBinary(input) {
    let result = "";

    while (input !== 0) {
        result = (input % 2) + result;
        input = Math.floor(input / 2);
    }

    // Check that the number has 4 digits
    if (result.length !== 4) {
        const toAdd = 4 - result.length;

        for (let i = 0; i < toAdd; i++) {
            result = 0 + result;
        }
    }
    return result;
}

export function binaryToBase10(input) {
    let base10 = 0;
    let position = 0;

    while (input !== 0) {
        const digit = input % 10;
        if (digit === 1) {
            base10 += Math.pow(2, position);
        }
        position++;
        input = Math.floor(input / 10);
    }
    return base10;
}

export function isValid(input) {
    input = parseInt(input);
    while (input !== 0) {
        if (input % 10 !== 0 && input % 10 !== 1) {
            return false;
        }
        input = Math.floor(input / 10);
    }
    return true;
}