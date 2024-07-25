import { SongsRecord, SongsTypeOptions } from "@/pocketbase-types";
import { StyleProp, View, ViewStyle } from "react-native";
import { SectionCardContainer, SectionCardTitle } from "./section-card.shared";
import TrackPlayer, {
  useActiveTrack,
  useIsPlaying,
} from "react-native-track-player";
import { Badge, Card, IconButton } from "react-native-paper";
import { pb } from "@/utils/pocketbase";

export function BaseSectionCard(props: {
  title: string;
  imageUrl: string;
  id: string;
  style?: StyleProp<ViewStyle>;
  href?: string;
}) {
  return (
    <SectionCardContainer href={props.href} style={[props.style]}>
      <View style={{ position: "relative" }}>
        <Card.Cover source={{ uri: props.imageUrl }} />
      </View>
      <SectionCardTitle>{props.title}</SectionCardTitle>
    </SectionCardContainer>
  );
}

function getPlayerIcon({
  bufferingDuringPlay,
  playing,
  isCurrent,
}: {
  playing?: boolean;
  bufferingDuringPlay?: boolean;
  isCurrent?: boolean;
}): "play" | "pause" | "download" {
  if (!isCurrent) return "play";
  if (playing || bufferingDuringPlay) return "pause";
  return "play";
}

export function SongSectionCard(props: {
  title: string;
  imageUrl: string;
  id: string;
  style?: StyleProp<ViewStyle>;
  song: SongsRecord;
}) {
  const track = useActiveTrack();
  const { playing, bufferingDuringPlay } = useIsPlaying();
  const songUrl = pb.files.getUrl(props.song, props.song.file ?? "");
  const isActiveTrack = songUrl === track?.url;

  return (
    <SectionCardContainer href={`/songs/${props.id}`} style={[props.style]}>
      <View style={{ position: "relative" }}>
        <View style={{ position: "relative" }}>
          <Card.Cover source={{ uri: props.imageUrl }} />
          {props.song.type !== SongsTypeOptions.orginal && (
            <Badge style={{ position: "absolute", top: 5, left: 5 }}>
              {props.song.type}
            </Badge>
          )}
        </View>

        {songUrl && (
          <IconButton
            style={{ position: "absolute", bottom: 2, right: 2, zIndex: 50 }}
            icon={getPlayerIcon({
              bufferingDuringPlay,
              playing,
              isCurrent: isActiveTrack,
            })}
            size={45}
            mode="contained"
            iconColor="#fff"
            containerColor="#000"
            onPress={async (e) => {
              e.stopPropagation();

              const thisTrack = isActiveTrack;
              if (!thisTrack) {
                TrackPlayer.add(
                  [
                    {
                      url: pb.files.getUrl(props.song, props.song.file ?? ""),
                      title: props.song.name,
                    },
                  ],
                  ((await TrackPlayer.getActiveTrackIndex()) ?? -1) + 1,
                );
                TrackPlayer.play();
                TrackPlayer.skipToNext();
                return;
              }

              if (bufferingDuringPlay) return null;

              return playing ? TrackPlayer.pause() : TrackPlayer.play();
            }}
          />
        )}
      </View>
      <SectionCardTitle>{props.title}</SectionCardTitle>
    </SectionCardContainer>
  );
}
