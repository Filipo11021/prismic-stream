import { pb } from "@/utils/pocketbase";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import { Image } from "expo-image";
import { useEffect } from "react";
import { AlbumsResponse, SongsResponse } from "@/pocketbase-types";
import { SongSectionCard } from "@/components/horizontal-section/section-card/section-card";

export default function AlbumsPage() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const query = useQuery({
    queryKey: ["album", id],
    enabled: !!id,
    queryFn: () =>
      pb
        .collection("albums")
        .getOne<
          AlbumsResponse<{ songs_via_album?: SongsResponse[] }>
        >(String(id), {
          expand: "songs_via_album",
        }),
  });

  useEffect(() => {
    navigation.setOptions({ title: query.data?.name ?? "...loading" });
  }, [query, navigation]);

  if (query.isPending) return <Text>...loading</Text>;

  if (query.isError) return <Text>{query.error.message}</Text>;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={{ flex: 1 }}
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
      <View
        style={{
          display: "flex",
          marginTop: 8,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {query.data.expand?.songs_via_album
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
      </View>
    </ScrollView>
  );
}
