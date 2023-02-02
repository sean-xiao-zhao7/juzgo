export default () => ({
    expo: {
        name: "Juzgo",
        slug: "juzgo",
        owner: "jpxjpxjpx",
        version: "2.0.1",
        orientation: "portrait",
        icon: "./assets/icon.png",
        userInterfaceStyle: "light",
        splash: {
            image: "./assets/splash.png",
            resizeMode: "contain",
            backgroundColor: "#ffffff",
        },
        updates: {
            fallbackToCacheTimeout: 0,
            url: "https://u.expo.dev/f12dde43-5455-4c42-a6b6-52f26c754ee9",
        },
        assetBundlePatterns: ["**/*"],
        ios: {
            supportsTablet: true,
            bundleIdentifier: "com.jpxjpxjpx.juzgo",
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/adaptive-icon.png",
                backgroundColor: "#FFFFFF",
            },
            package: "com.jpxjpxjpx.juzgo",
        },
        web: {
            favicon: "./assets/favicon.png",
        },
        extra: {
            eas: {
                projectId: "f12dde43-5455-4c42-a6b6-52f26c754ee9",
            },
            API_AI: process.env.API_AI || null,
            API_FDU: process.env.API_FDU || null,
            API_FSU: process.env.API_FSU || null,
            API_FSIU: process.env.API_FSIU || null,
            API_M: process.env.API_M || null,
            API_FRU: process.env.API_FRU || null,
        },
        runtimeVersion: {
            policy: "sdkVersion",
        },
    },
});
