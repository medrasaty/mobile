import CenterPage from "@/components/CenterPage";
import Page from "@/components/Page";
import ReportDialog from "@/features/reports/components/ReportDialog";
import { useVisibleV2 } from "@/hooks/useVisible";
import { Button } from "react-native";

const Experments = () => {
  const [visible, show, hide] = useVisibleV2(false);
  return (
    <Page>
      <CenterPage>
        <Button onPress={show} title="report" />
        <ReportDialog
          onDismiss={hide}
          objectId="objectId"
          contentTypeId={4}
          visible={visible}
        />
      </CenterPage>
    </Page>
  );
};

export default Experments;

// import React, { useRef, useState } from "react";
// import {
//   View,
//   Text,
//   Animated,
//   StyleSheet,
//   TouchableOpacity,
//   Dimensions,
// } from "react-native";
// import PagerView from "react-native-pager-view";

// const HEADER_MAX_HEIGHT = 250;
// const HEADER_MIN_HEIGHT = 90;
// const PROFILE_IMAGE_MAX_SIZE = 80;
// const TABS_HEIGHT = 50;

// // Sample data
// const userData = {
//   name: "John Doe",
//   handle: "@johndoe",
//   coverImage: "https://example.com/cover.jpg",
//   profileImage: "https://example.com/profile.jpg",
// };

// const tabs = ["Tweets", "Replies", "Media", "Likes"];

// const tweetsData = Array(20)
//   .fill(null)
//   .map((_, index) => ({
//     id: `tweet-${index}`,
//     content: `Tweet ${index + 1}`,
//   }));

// const repliesData = Array(20)
//   .fill(null)
//   .map((_, index) => ({
//     id: `reply-${index}`,
//     content: `Reply ${index + 1}`,
//   }));

// const mediaData = Array(20)
//   .fill(null)
//   .map((_, index) => ({
//     id: `media-${index}`,
//     content: `Media ${index + 1}`,
//   }));

// const likesData = Array(20)
//   .fill(null)
//   .map((_, index) => ({
//     id: `like-${index}`,
//     content: `Like ${index + 1}`,
//   }));

// const ListItem = ({ item }) => (
//   <View style={styles.listItem}>
//     <Text>{item.content}</Text>
//   </View>
// );

// const App = () => {
//   const scrollY = useRef(new Animated.Value(0)).current;
//   const pagerRef = useRef(null);
//   const flatListRefs = useRef([]);
//   const [activeTab, setActiveTab] = useState(0);

//   // Animation interpolations
//   const headerTranslate = scrollY.interpolate({
//     inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
//     outputRange: [0, -(HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
//     extrapolate: "clamp",
//   });

//   const headerOpacity = scrollY.interpolate({
//     inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
//     outputRange: [1, 0],
//     extrapolate: "clamp",
//   });

//   const profileImageScale = scrollY.interpolate({
//     inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
//     outputRange: [1, 0.5],
//     extrapolate: "clamp",
//   });

//   const profileImageTranslateY = scrollY.interpolate({
//     inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
//     outputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
//     extrapolate: "clamp",
//   });

//   const onTabPress = (index) => {
//     setActiveTab(index);
//     pagerRef.current?.setPage(index);
//   };

//   const renderContent = (index) => {
//     const getData = () => {
//       switch (index) {
//         case 0:
//           return tweetsData;
//         case 1:
//           return repliesData;
//         case 2:
//           return mediaData;
//         case 3:
//           return likesData;
//         default:
//           return [];
//       }
//     };

//     const handleScroll = Animated.event(
//       [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//       { useNativeDriver: true }
//     );

//     return (
//       <Animated.FlatList
//         ref={(ref) => (flatListRefs.current[index] = ref)}
//         data={getData()}
//         renderItem={ListItem}
//         keyExtractor={(item) => item.id}
//         scrollEventThrottle={16}
//         onScroll={handleScroll}
//         contentContainerStyle={{
//           paddingTop: HEADER_MAX_HEIGHT + TABS_HEIGHT + 80, // Add extra padding for user info
//         }}
//         removeClippedSubviews={true}
//         showsVerticalScrollIndicator={false}
//         initialNumToRender={10}
//         maxToRenderPerBatch={10}
//         windowSize={10}
//       />
//     );
//   };

//   return (
//     <View style={styles.container}>
//       {/* Animated Header */}
//       <Animated.View
//         style={[
//           styles.header,
//           {
//             transform: [{ translateY: headerTranslate }],
//           },
//         ]}
//       >
//         <Animated.View
//           style={[
//             styles.coverImage,
//             {
//               opacity: headerOpacity,
//             },
//           ]}
//         />
//         <Animated.View
//           style={[
//             styles.profileImage,
//             {
//               transform: [
//                 { scale: profileImageScale },
//                 { translateY: profileImageTranslateY },
//               ],
//             },
//           ]}
//         />
//       </Animated.View>

//       {/* User Info Section */}
//       <Animated.View
//         style={[
//           styles.userInfoContainer,
//           {
//             transform: [{ translateY: headerTranslate }],
//           },
//         ]}
//       >
//         <View style={styles.userInfo}>
//           <Text style={styles.userName}>{userData.name}</Text>
//           <Text style={styles.userHandle}>{userData.handle}</Text>
//         </View>
//       </Animated.View>

//       {/* Tabs */}
//       <Animated.View
//         style={[
//           styles.tabsContainer,
//           {
//             transform: [{ translateY: headerTranslate }],
//             zIndex: 1,
//           },
//         ]}
//       >
//         {tabs.map((tab, index) => (
//           <TouchableOpacity
//             key={index}
//             style={[styles.tab, activeTab === index && styles.activeTab]}
//             onPress={() => onTabPress(index)}
//           >
//             <Text
//               style={[
//                 styles.tabText,
//                 activeTab === index && styles.activeTabText,
//               ]}
//             >
//               {tab}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </Animated.View>

//       {/* Content */}
//       <PagerView
//         ref={pagerRef}
//         style={styles.pagerView}
//         initialPage={0}
//         onPageSelected={(e) => setActiveTab(e.nativeEvent.position)}
//       >
//         {tabs.map((_, index) => (
//           <View key={index} style={styles.page}>
//             {renderContent(index)}
//           </View>
//         ))}
//       </PagerView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//   },
//   header: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     height: HEADER_MAX_HEIGHT,
//     zIndex: 1000,
//     backgroundColor: "white",
//   },
//   coverImage: {
//     width: "100%",
//     height: HEADER_MAX_HEIGHT - 50,
//     backgroundColor: "#1DA1F2", // Placeholder color for cover image
//   },
//   profileImage: {
//     position: "absolute",
//     bottom: 0,
//     left: 10,
//     width: PROFILE_IMAGE_MAX_SIZE,
//     height: PROFILE_IMAGE_MAX_SIZE,
//     borderRadius: PROFILE_IMAGE_MAX_SIZE / 2,
//     backgroundColor: "#657786", // Placeholder color for profile image
//     borderWidth: 4,
//     borderColor: "white",
//   },
//   userInfoContainer: {
//     position: "absolute",
//     top: HEADER_MAX_HEIGHT,
//     left: 0,
//     right: 0,
//     zIndex: 999,
//     backgroundColor: "white",
//   },
//   userInfo: {
//     padding: 15,
//   },
//   userName: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   userHandle: {
//     fontSize: 16,
//     color: "#657786",
//     marginTop: 2,
//   },
//   tabsContainer: {
//     position: "absolute",
//     top: HEADER_MAX_HEIGHT + 80,
//     left: 0,
//     right: 0,
//     height: TABS_HEIGHT,
//     flexDirection: "row",
//     backgroundColor: "white",
//     borderBottomWidth: 1,
//     borderBottomColor: "#E1E8ED",
//   },
//   tab: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     height: TABS_HEIGHT,
//   },
//   activeTab: {
//     borderBottomWidth: 2,
//     borderBottomColor: "#1DA1F2",
//   },
//   tabText: {
//     color: "#657786",
//   },
//   activeTabText: {
//     color: "#1DA1F2",
//     fontWeight: "bold",
//   },
//   pagerView: {
//     flex: 1,
//   },
//   page: {
//     flex: 1,
//   },
//   listItem: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#E1E8ED",
//   },
// });

// export default App;
