import { FlatList, ScrollView, View } from "react-native";
import { Text, Title, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { pb } from "@/utils/pocketbase";
import { useQuery } from "@tanstack/react-query";
import { ReactElement, ReactNode } from "react";
import ContentLoader from "react-content-loader/native";
import { Rect } from "react-native-svg";
import { useActiveTrack } from "react-native-track-player";
import { AudioPlayer } from "@/components/AudioPlayer";
import {
  BaseSectionCard,
  SongSectionCard,
} from "@/components/horizontal-section/section-card/section-card";

export default function HomeScreen() {
  const track = useActiveTrack();

  return (
    <SafeAreaView
      style={{
        paddingTop: 16,
        height: "100%",
      }}
    >
      <ScrollView>
        <ArtistsSection />
        <SongsSection />
        <AlbumsSection />
        <View style={{ height: 16 }} />
      </ScrollView>

      {track ? <AudioPlayer /> : null}
    </SafeAreaView>
  );
}

function HorizontalSection<T>({
  data,
  renderItem,
  title,
}: {
  data: T[];
  renderItem: (props: T) => ReactElement;
  title: string | ReactNode;
}) {
  return (
    <View style={{ paddingLeft: 12, paddingTop: 8 }}>
      {typeof title === "string" ? <Title>{title}</Title> : title}
      <FlatList
        data={data}
        contentContainerStyle={{ gap: 12 }}
        horizontal
        renderItem={({ item }) => renderItem(item)}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListFooterComponent={View}
      />
    </View>
  );
}

function HorizontalSectionPlaceholder() {
  const theme = useTheme();
  return (
    <HorizontalSection
      title={
        <ContentLoader
          speed={2}
          width={100}
          height={25}
          backgroundColor={theme.colors.onBackground}
        >
          <Rect x="0" y="0" rx="0" ry="0" width="100" height="25" />
        </ContentLoader>
      }
      data={Array.from({ length: 5 })}
      renderItem={() => (
        <ContentLoader
          speed={2}
          width={200}
          height={240}
          backgroundColor={theme.colors.onBackground}
          style={{ margin: 10 }}
        >
          <Rect x="0" y="0" rx="0" ry="0" width="200" height="220" />
          <Rect x="5" y="225" rx="0" ry="0" width="170" height="15" />
        </ContentLoader>
      )}
    />
  );
}

function SongsSection() {
  const songsQuery = useQuery({
    queryKey: ["songs"],
    queryFn: () => pb.collection("songs").getFullList(),
  });

  if (songsQuery.isPending) return <HorizontalSectionPlaceholder />;

  if (songsQuery.isError) return <Text>error: {songsQuery.error.message}</Text>;

  return (
    <HorizontalSection
      renderItem={(data) => (
        <SongSectionCard style={{ width: 200 }} {...data} />
      )}
      data={songsQuery.data.map((song) => ({
        imageUrl: pb.files.getUrl(song, song.image),
        title: song.name,
        id: song.id,
        song: song,
      }))}
      title="Latest Songs"
    />
  );
}

function ArtistsSection() {
  const artistsQuery = useQuery({
    queryKey: ["artists"],
    queryFn: () => pb.collection("artists").getFullList(),
  });

  if (artistsQuery.isPending) return <HorizontalSectionPlaceholder />;

  if (artistsQuery.isError) return <Text>{artistsQuery.error.message}</Text>;

  return (
    <HorizontalSection
      renderItem={(data) => (
        <BaseSectionCard style={{ width: 200 }} {...data} />
      )}
      data={artistsQuery.data.map((artist) => {
        return {
          imageUrl: pb.files.getUrl(artist, artist.image),
          title: artist.name,
          id: artist.id,
          href: `/artists/${artist.id}`,
        };
      })}
      title="Popular Artists"
    />
  );
}

function AlbumsSection() {
  const albumsQuery = useQuery({
    queryKey: ["albums"],
    queryFn: () => pb.collection("albums").getFullList(),
  });

  if (albumsQuery.isPending) return <HorizontalSectionPlaceholder />;

  if (albumsQuery.isError) return <Text>{albumsQuery.error.message}</Text>;

  return (
    <HorizontalSection
      renderItem={(data) => (
        <BaseSectionCard style={{ width: 200 }} {...data} />
      )}
      data={albumsQuery.data.map((artist) => {
        return {
          imageUrl: pb.files.getUrl(artist, artist.image),
          title: artist.name,
          id: artist.id,
          href: `/albums/${artist.id}`,
        };
      })}
      title="Popular Albums"
    />
  );
}
