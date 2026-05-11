import { Redirect } from "expo-router";
import { Link } from "expo-router";
import { View, Button, Text } from "react-native";

export default function Index() {  
  return (
    <View>
      <Text>Landing Page</Text>
        <Link rel="stylesheet" href={"/main-apps"} push asChild>
          <Button title="Get Started" />
        </Link>
    </View>
  )
}
 