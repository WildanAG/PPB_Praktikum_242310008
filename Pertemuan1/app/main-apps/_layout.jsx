// import { Ionicons } from "@expo/vector-icons";
// import AntDesign from "@expo/vector-icons/AntDesign";
// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import { Tabs, usePathname, useRouter, useSegments } from "expo-router";
// import { useEffect, useRef } from "react";
// import { Alert, BackHandler, StatusBar } from "react-native";
// import "react-native-reanimated";
// import { color_list } from "../../components/e-catalogs/styles/StyleApps";

// export default function TabLayout() {
//   const router = useRouter();
//   const segments = useSegments();
//   const pathname = usePathname();
//   const backPressCount = useRef(0);
//   const backPressTimer = useRef(null);

//   useEffect(() => {
//     const backAction = () => {
//       const isOnHomeTab =
//         pathname === "/main-apps" ||
//         pathname === "/main-apps/" ||
//         (segments.length === 1 && segments[0] === "main-apps") ||
//         (segments.length === 2 &&
//           segments[0] === "main-apps" &&
//           segments[1] === "index");
//       if (isOnHomeTab) {
//         // Double tap to exit
//         if (backPressCount.current === 0) {
//           backPressCount.current = 1;

//           Alert.alert(
//             "Exit App",
//             "Press back again to exit",
//             [{ text: "OK" }],
//             { cancelable: true },
//           );

//           backPressTimer.current = setTimeout(() => {
//             backPressCount.current = 0;
//           }, 2000);

//           return true;
//         } else {
//           BackHandler.exitApp();
//           return true;
//         }
//       }
//       return false;
//     };

//     const backHandler = BackHandler.addEventListener(
//       "hardwareBackPress",
//       backAction,
//     );

//     return () => {
//       backHandler.remove();
//       if (backPressTimer.current) {
//         clearTimeout(backPressTimer.current);
//       }
//     };
//   }, [router]);

//   return (
//     <>
//       <StatusBar style="auto" barStyle={"dark-content"} hidden={false} />
//       <Tabs
//         screenOptions={{
//           headerShown: false,
//           tabBarActiveTintColor: color_list.green,
//           tabBarInactiveTintColor: "gray",
//           tabBarShowLabel: true,
//           tabBarStyle: {
//             backgroundColor: color_list.white,
//             borderTopWidth: 2,
//             borderTopColor: color_list.green_dark,
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
//               <Ionicons name="book" size={size} color={color} />
//             ),
//           }}
//         />
//         <Tabs.Screen
//           name="explore"
//           options={{
//             title: "Explore",
//             href: "/explore",
//             tabBarIcon: ({ color, size }) => (
//               <Ionicons name="navigate-circle" size={size} color={color} />
//             ),
//           }}
//         />
//         <Tabs.Screen
//           name="mylibrary"
//           options={{
//             title: "My Library",
//             tabBarIcon: ({ color, size }) => (
//               <MaterialCommunityIcons
//                 name="bookshelf"
//                 size={size}
//                 color={color}
//               />
//             ),
//           }}
//         />
//         <Tabs.Screen
//           name="account"
//           options={{
//             title: "Account",
//             tabBarIcon: ({ color, size }) => (
//               <AntDesign name="user" size={size} color={color} />
//             ),
//           }}
//         />
//       </Tabs>
//     </>
//   );
// }

import { Entypo, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StatusBar } from "react-native";
import "react-native-reanimated";

export default function TabLayout() {
  return (
    <>
      <StatusBar style="auto" barStyle={"dark-content"} hidden={false} />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#49745e",
          tabBarInactiveTintColor: "gray",
          tabBarShowLabel: true,
          tabBarStyle: {
            backgroundColor: "white",
            borderTopWidth: 2,
            borderTopColor: "#3a5d4a",
            height: 70,
            paddingBottom: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            tabBarIcon: ({ color, size }) => (
              <Entypo name="direction" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}