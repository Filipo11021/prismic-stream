import { useSetupTrackPlayer } from "@/utils/use-setup-track-player";
import { ParamListBase, Route } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { ReactNode, useEffect } from "react";
import {
  PaperProvider,
  MD3DarkTheme,
  Appbar,
  useTheme,
} from "react-native-paper";
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from "react-native-screens/lib/typescript/native-stack/types";
import { getHeaderTitle } from "@react-navigation/elements";
import { MyQueryClientProvider } from "@/components/MyQueryClientProvider";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

type NativeStackHeaderProps = {
  /**
   * Options for the back button.
   */
  back?: {
    /**
     * Title of the previous screen.
     */
    title: string;
  };
  /**
   * Options for the current screen.
   */
  options: NativeStackNavigationOptions;
  /**
   * Route object for the current screen.
   */
  route: Route<string>;
  /**
   * Navigation prop for the header.
   */
  navigation: NativeStackNavigationProp<ParamListBase>;
};

function Providers({ children }: { children: ReactNode }) {
  return (
    <MyQueryClientProvider>
      <PaperProvider theme={MD3DarkTheme}>{children}</PaperProvider>
    </MyQueryClientProvider>
  );
}

function CustomNavigationBar({
  navigation,
  route,
  options,
  back,
}: NativeStackHeaderProps) {
  const title = getHeaderTitle(options, route.name);

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
}

function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const { status } = useSetupTrackPlayer();
  const theme = useTheme();

  useEffect(() => {
    if (loaded && status === "success") {
      SplashScreen.hideAsync();
    }
  }, [loaded, status]);

  if (!loaded || status !== "success") {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        // @ts-expect-error props types mismatch
        header: (props) => <CustomNavigationBar {...props} />,
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function Layout() {
  return (
    <Providers>
      <RootLayout />
    </Providers>
  );
}
