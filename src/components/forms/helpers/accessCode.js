export const generateAccessCode = (length = 10) => {
    let code = "";
    for (let position = 0; position < length; position += 1) {
        const newDigit = Math.floor(Math.random() * 10);
        code += `${newDigit}`;
        if (position === 2 || position === 5) {
            code += "-";
        }
    }
    return code;
};
