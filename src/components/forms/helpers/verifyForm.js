export const emptyVerify = (inputs) => {
    let verified = true;
    inputs.forEach((input) => {
        if (input === "") {
            verified = false;
        }
    });
    return verified;
};

export const emailPasswordVerify = (email, password) => {
    let emailValid = false;
    let passwordValid = false;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        emailValid = true;
    }
    if (password.length > 6) {
        passwordValid = true;
    }

    return emailValid && passwordValid;
};
