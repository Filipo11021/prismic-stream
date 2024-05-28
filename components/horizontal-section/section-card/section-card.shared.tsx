import { useRouter } from "expo-router";
import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Card } from "react-native-paper";

export function SectionCardTitle({ children }: { children: ReactNode }) {
  return <Card.Title titleNumberOfLines={3} title={children} />;
}

export function SectionCardContainer({children, style, href}: {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
  href?: string
}) {
  const { push } = useRouter();

  return (
    <Card
      onPress={() => href ? push(href) : null}
      mode="contained"
      style={[style]}
    >
      {children}
    </Card>
  );
}

