import { useQuery } from "@tanstack/react-query";
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  RepeatMode,
} from "react-native-track-player";

const trackPlayerKey = [Symbol()];

const setupPlayer = async (
  options: Parameters<typeof TrackPlayer.setupPlayer>[0]
) => {
  const setup = async () => {
    try {
      await TrackPlayer.setupPlayer(options);
    } catch (error) {
      return (error as Error & { code?: string }).code;
    }
  };
  while ((await setup()) === "android_cannot_setup_player_in_background") {
    // A timeout will mostly only execute when the app is in the foreground,
    // and even if we were in the background still, it will reject the promise
    // and we'll try again:
    await new Promise<void>((resolve) => setTimeout(resolve, 1));
  }
};

async function setupTrackPlayer() {
  await setupPlayer({
    maxCacheSize: 1024 * 10,
    autoHandleInterruptions: true,
  });

  await TrackPlayer.updateOptions({
    android: {
      appKilledPlaybackBehavior:
        AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
    },
    progressUpdateEventInterval: 1,
  });

  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}

export function useSetupTrackPlayer() {
  const query = useQuery({
    queryKey: trackPlayerKey,
    queryFn: async () => {
      await setupTrackPlayer();
      return null;
    },
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return { status: query.status };
}
