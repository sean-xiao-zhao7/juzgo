import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveSession = async (value) => {
    try {
        await AsyncStorage.setItem("juzgoSession", JSON.stringify(value));
    } catch (e) {
        console.log(e.message);
    }
};

export const retrieveSession = async (value) => {
    try {
        const sessionInfo = await AsyncStorage.getItem(
            "juzgoSession",
            JSON.stringify(value)
        );
        return JSON.parse(sessionInfo);
    } catch (e) {
        console.log(e.message);
    }
};

export const destroySession = async () => {
    try {
        await AsyncStorage.removeItem("juzgoSession");
    } catch (e) {
        console.log(e.message);
    }
};
