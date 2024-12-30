import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";

const { Navigator } = createMaterialTopTabNavigator();

/**
 * Top Tabs layout that can be used with expo router.
 */
const TopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default TopTabs;

/*
 * custom tabs
 */
// import * as React from 'react';
// import {
//   Animated,
//   View,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
// } from 'react-native';
// import { TabView, SceneMap } from 'react-native-tab-view';

// const FirstRoute = () => (
//   <View style={[styles.container, { backgroundColor: '#ff4081' }]} />
// );
// const SecondRoute = () => (
//   <View style={[styles.container, { backgroundColor: '#673ab7' }]} />
// );

// export default class TabViewExample extends React.Component {
//   state = {
//     index: 0,
//     routes: [
//       { key: 'first', title: 'First' },
//       { key: 'second', title: 'Second' },
//     ],
//   };

//   _handleIndexChange = (index) => this.setState({ index });

//   _renderTabBar = (props) => {
//     const inputRange = props.navigationState.routes.map((x, i) => i);

//     return (
//       <View style={styles.tabBar}>
//         {props.navigationState.routes.map((route, i) => {
//           const opacity = props.position.interpolate({
//             inputRange,
//             outputRange: inputRange.map((inputIndex) =>
//               inputIndex === i ? 1 : 0.5
//             ),
//           });

//           return (
//             <TouchableOpacity
//               style={styles.tabItem}
//               onPress={() => this.setState({ index: i })}>
//               <Animated.Text style={{ opacity }}>{route.title}</Animated.Text>
//             </TouchableOpacity>
//           );
//         })}
//       </View>
//     );
//   };

//   _renderScene = SceneMap({
//     first: FirstRoute,
//     second: SecondRoute,
//   });

//   render() {
//     return (
//       <TabView
//         navigationState={this.state}
//         renderScene={this._renderScene}
//         renderTabBar={this._renderTabBar}
//         onIndexChange={this._handleIndexChange}
//         tabBarPosition={"bottom"}
//       />
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   tabBar: {
//     flexDirection: 'row',
//     paddingTop: StatusBar.currentHeight,
//   },
//   tabItem: {
//     flex: 1,
//     alignItems: 'center',
//     padding: 16,
//   },
// });
