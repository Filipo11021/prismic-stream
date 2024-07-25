import Slider from "@react-native-community/slider";
import { View } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";
import TrackPlayer, {
  useActiveTrack,
  useIsPlaying,
  useProgress,
} from "react-native-track-player";

export function AudioPlayer() {
  const progress = useProgress();
  const track = useActiveTrack();
  const theme = useTheme();
  const { playing } = useIsPlaying();

  return (
    <View
      style={{
        borderTopColor: theme.colors.onBackground,
        borderTopWidth: 1,
        paddingTop: 4,
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Text>{track?.title}</Text>
      </View>
      <View
        style={{
          backgroundColor: theme.colors.background,
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <IconButton icon="skip-previous" />

        <IconButton
          icon={playing ? "pause" : "play"}
          mode="contained"
          iconColor="#fff"
          containerColor="#000"
          onPress={async () => {
            if (playing) TrackPlayer.pause();
            else TrackPlayer.play();
          }}
        />

        <Slider
          minimumValue={0}
          maximumValue={progress.duration}
          value={progress.position}
          onValueChange={(v) => {
            TrackPlayer.seekTo(v);
          }}
          style={{ flex: 1 }}
          thumbTintColor={theme.colors.primary}
          minimumTrackTintColor={theme.colors.onBackground}
          maximumTrackTintColor={theme.colors.onBackground}
        />
        <IconButton disabled icon="skip-next" />
      </View>
    </View>
  );
}
