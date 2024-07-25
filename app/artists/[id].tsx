import { pb } from "@/utils/pocketbase";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { ScrollView, View } from "react-native";
import { SegmentedButtons, Text, ActivityIndicator } from "react-native-paper";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import {
  AlbumsResponse,
  ArtistsResponse,
  SongsResponse,
} from "@/pocketbase-types";
import {
  BaseSectionCard,
  SongSectionCard,
} from "@/components/horizontal-section/section-card/section-card";

export default function ArtistPage() {
  const { id } = useLocalSearchParams();
  const [value, setValue] = useState("songs");
  const navigation = useNavigation();
  const query = useQuery({
    queryKey: ["artist", id],
    enabled: !!id,
    queryFn: () =>
      pb.collection("artists").getOne<
        ArtistsResponse<{
          songs_via_artists?: SongsResponse[];
          albums_via_artists?: AlbumsResponse[];
        }>
      >(String(id), {
        expand: "songs_via_artists,albums_via_artists",
      }),
  });

  useEffect(() => {
    navigation.setOptions({ title: query.data?.name ?? "...loading" });
  }, [query, navigation]);

  if (query.isPending) return <ActivityIndicator size="large" />;

  if (query.isError) return <Text>error</Text>;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={{ flex: 1, paddingHorizontal: 8 }}
    >
      <Image
        style={{
          height: 300,
          aspectRatio: "1",
          marginHorizontal: "auto",
          marginBottom: 8,
        }}
        source={pb.files.getUrl(query.data, query.data.image)}
      />
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: "songs",
            label: "Songs",
          },
          {
            value: "albums",
            label: "Albums",
          },
        ]}
      />
      <View
        style={{
          display: "flex",
          marginTop: 8,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {value === "songs" &&
          query.data.expand?.songs_via_artists
            ?.map((song) => ({
              title: song.name,
              imageUrl: pb.files.getUrl(song, song.image),
              id: song.id,
              song,
            }))
            .map((item) => (
              <SongSectionCard
                style={{ flexBasis: "47%", marginVertical: 4 }}
                {...item}
              />
            ))}

        {value === "albums" &&
          query.data.expand?.albums_via_artists
            ?.map((album) => ({
              title: album.name,
              imageUrl: pb.files.getUrl(album, album.image),
              id: album.id,
            }))
            .map((item) => (
              <BaseSectionCard
                style={{ flexBasis: "47%", marginVertical: 4 }}
                {...item}
              />
            ))}
      </View>
    </ScrollView>
  );
}
