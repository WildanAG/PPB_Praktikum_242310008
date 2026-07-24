import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { usePathname, useRouter, useSegments } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useEffect, useRef } from "react";
import { Alert, BackHandler, StatusBar } from "react-native";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { color_list } from "../../components/e-catalogs/styles/StyleApps";

export default function DrawerLayout() {
  const router = useRouter();
  const segments = useSegments();
  const pathname = usePathname();
  const backPressCount = useRef(0);
  const backPressTimer = useRef(null);

  useEffect(() => {
    const backAction = () => {
      const isOnHomeTab =
        pathname === "/main-apps" ||
        pathname === "/main-apps/" ||
        (segments.length === 1 && segments[0] === "main-apps") ||
        (segments.length === 2 &&
          segments[0] === "main-apps" &&
          segments[1] === "index");

      if (isOnHomeTab) {
        if (backPressCount.current === 0) {
          backPressCount.current = 1;

          Alert.alert(
            "Exit App",
            "Press back again to exit",
            [{ text: "OK" }],
            { cancelable: true }
          );

          backPressTimer.current = setTimeout(() => {
            backPressCount.current = 0;
          }, 2000);

          return true;
        } else {
          BackHandler.exitApp();
          return true;
        }
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => {
      backHandler.remove();
      if (backPressTimer.current) {
        clearTimeout(backPressTimer.current);
      }
    };
  }, [router, pathname, segments]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="auto" barStyle={"dark-content"} hidden={false} />
      <Drawer
        screenOptions={{
          headerShown: true, // Menampilkan header dengan tombol hamburger menu
          headerTintColor: color_list.green_dark,
          drawerActiveTintColor: color_list.green,
          drawerInactiveTintColor: "gray",
          drawerStyle: {
            backgroundColor: color_list.white,
            width: 250,
          },
          drawerLabelStyle: {
            fontSize: 14,
            fontWeight: "600",
            marginLeft: -10,
          },
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Home",
            title: "Home",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="book" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="explore"
          options={{
            drawerLabel: "Explore",
            title: "Explore",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="navigate-circle" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="mylibrary"
          options={{
            drawerLabel: "My Library",
            title: "My Library",
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="bookshelf"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="scanner"
          options={{
            drawerLabel: "Scanner",
            title: "Scanner",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="scan" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="account"
          options={{
            drawerLabel: "Account",
            title: "Account",
            drawerIcon: ({ color, size }) => (
              <AntDesign name="user" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

// import { Entypo, Ionicons } from "@expo/vector-icons";
// import { Tabs } from "expo-router";
// import { StatusBar } from "react-native";
// import "react-native-reanimated";

// export default function TabLayout() {
//   return (
//     <>
//       <StatusBar style="auto" barStyle={"dark-content"} hidden={false} />
//       <Tabs
//         screenOptions={{
//           headerShown: false,
//           tabBarActiveTintColor: "#49745e",
//           tabBarInactiveTintColor: "gray",
//           tabBarShowLabel: true,
//           tabBarStyle: {
//             backgroundColor: "white",
//             borderTopWidth: 2,
//             borderTopColor: "#3a5d4a",
//             height: 70,
//             paddingBottom: 5,
//           },
//           tabBarLabelStyle: {
//             fontSize: 12,
//             fontWeight: "600",
//           },
//         }}
//       >
//         <Tabs.Screen
//           name="index"
//           options={{
//             title: "Home",
//             tabBarIcon: ({ color, size }) => (
//               <Ionicons name="home" size={size} color={color} />
//             ),
//           }}
//         />

//         <Tabs.Screen
//           name="explore"
//           options={{
//             title: "Explore",
//             tabBarIcon: ({ color, size }) => (
//               <Entypo name="direction" size={size} color={color} />
//             ),
//           }}
//         />
//       </Tabs>
//     </>
//   );
// }