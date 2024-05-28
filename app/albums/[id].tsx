import { pb } from "@/utils/pocketbase";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { Image } from "expo-image";
import { useEffect } from "react";

export default function AlbumsPage() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const query = useQuery({
    queryKey: ["album", id],
    enabled: !!id,
    queryFn: () => pb.collection("albums").getOne(String(id)),
  });

  useEffect(() => {
    navigation.setOptions({ title: query.data?.name ?? "...loading" });
  }, [query]);

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
    </ScrollView>
  );
}
