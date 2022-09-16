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
