module.exports = {
  name: "Fusion",
  slug: "fusion",
  version: "1.0.0",
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
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.neurofusion.fusion",
    buildNumber: "14",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#FFFFFF",
    },
    package: "com.neurofusion.fusion",
    versionCode: 7,
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  jsEngine: "hermes",
  extra: {
    eas: {
      projectId: "f79cfe2d-2f56-413a-89f8-b9fde538ac75",
    },
    storybookEnabled: process.env.STORYBOOK_ENABLED,
  },
  plugins: ["expo-notifications"],
  owner: "oreogundipe",
};
