export const pressablePressed = ({ pressed }) => {
    if (pressed) {
        return {
            transform: [{ scale: 0.9 }],
            opacity: 0.5,
            marginRight: 20,
            alignItems: "center",
        };
    } else {
        return {
            marginRight: 20,
            alignItems: "center",
        };
    }
};

export const pressablePressedNoMargin = ({ pressed }) => {
    if (pressed) {
        return {
            transform: [{ scale: 0.9 }],
            opacity: 0.5,
            alignItems: "center",
        };
    } else {
        return {
            alignItems: "center",
        };
    }
};

export const pressablePressedInput = ({ pressed }) => {
    if (pressed) {
        return {
            transform: [{ scale: 0.9 }],
            opacity: 0.5,
            alignItems: "center",
            margin: 10,
            marginLeft: 0,
        };
    } else {
        return {
            alignItems: "center",
            margin: 10,
            marginLeft: 0,
        };
    }
};
