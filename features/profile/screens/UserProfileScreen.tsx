import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import {
  Avatar,
  Text,
  Card,
  Title,
  Paragraph,
  List,
  Divider,
  useTheme,
  Button,
  Appbar,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useProfile from "../hooks/useProfile";
import { BaseUser } from "@/types/user.types";
import UserProfileScreenLoading from "../components/UserProfileScreenLoading";
import UserProfileScreenError from "../components/UserProfileScreenError";
import { UserProfile } from "../types";
import { ThemedText } from "@/components/ThemedText";
import Page from "@/components/Page";
import { SafeAreaView } from "@/components/styled";
import { ProfileBackgroundImage } from "../components/Profile";
import ProfileInfo from "../components/ProfileInfo";
import { LinearGradient } from "expo-linear-gradient";

import { StatusBar } from "expo-status-bar";
type UserProfileScreenProps = {
  username: BaseUser["username"] | undefined;
};

const UserProfileScreen = ({ username }: UserProfileScreenProps) => {
  // REFACTORME
  if (!username) return <UserProfileScreenError />;

  const q = useProfile(username);

  if (q.isPending) return <UserProfileScreenLoading />;
  if (q.isError) return <UserProfileScreenError />;

  return <UserProfileScreenContent profile={q.data} />;
};

interface UserProfileScreenContentProps {
  profile: UserProfile;
}

export const UserProfileScreenContent = ({
  profile,
}: UserProfileScreenContentProps) => {
  const theme = useTheme();
  return (
    <Page>
      <ProfileBackgroundImage url={profile.background_picture} />
      <ProfileInfo profile={profile} />
    </Page>
  );
};

export default UserProfileScreen;

// // Mock data - replace with actual data in a real app
// const user = {
//   name: 'Jane Doe',
//   username: 'jane_coder',
//   avatar: 'https://i.pravatar.cc/300',
//   reputation: 1234,
//   answers: 42,
//   questions: 15,
//   recentActivity: [
//     { type: 'answer', title: 'How to center a div?', date: '2 days ago' },
//     { type: 'question', title: 'Best practices for React hooks', date: '1 week ago' },
//     { type: 'answer', title: 'Difference between let and const', date: '2 weeks ago' },
//   ],
// };

// export default function ProfileScreen() {
//   const theme = useTheme();

//   return (
//     <ScrollView style={styles.container}>
//       <Card style={styles.headerCard}>
//         <Card.Content style={styles.headerContent}>
//           <Avatar.Image size={80} source={{ uri: user.avatar }} />
//           <View style={styles.headerText}>
//             <Title>{user.name}</Title>
//             <Paragraph>@{user.username}</Paragraph>
//           </View>
//         </Card.Content>
//       </Card>

//       <Card style={styles.statsCard}>
//         <Card.Content style={styles.statsContent}>
//           <View style={styles.statItem}>
//             <Title>{user.reputation}</Title>
//             <Paragraph>Reputation</Paragraph>
//           </View>
//           <View style={styles.statItem}>
//             <Title>{user.answers}</Title>
//             <Paragraph>Answers</Paragraph>
//           </View>
//           <View style={styles.statItem}>
//             <Title>{user.questions}</Title>
//             <Paragraph>Questions</Paragraph>
//           </View>
//         </Card.Content>
//       </Card>

//       <Card style={styles.activityCard}>
//         <Card.Content>
//           <Title style={styles.activityTitle}>Recent Activity</Title>
//           {user.recentActivity.map((activity, index) => (
//             <React.Fragment key={index}>
//               <List.Item
//                 title={activity.title}
//                 description={activity.date}
//                 left={props =>
//                   <List.Icon
//                     {...props}
//                     icon={activity.type === 'question' ? 'help-circle' : 'message-reply'}
//                     color={activity.type === 'question' ? theme.colors.primary : theme.colors.secondary}
//                   />
//                 }
//               />
//               {index < user.recentActivity.length - 1 && <Divider />}
//             </React.Fragment>
//           ))}
//         </Card.Content>
//       </Card>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f0f0f0',
//   },
//   headerCard: {
//     margin: 16,
//     elevation: 4,
//   },
//   headerContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   headerText: {
//     marginLeft: 16,
//   },
//   statsCard: {
//     margin: 16,
//     marginTop: 0,
//     elevation: 4,
//   },
//   statsContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   statItem: {
//     alignItems: 'center',
//   },
//   activityCard: {
//     margin: 16,
//     marginTop: 0,
//     elevation: 4,
//   },
//   activityTitle: {
//     marginBottom: 8,
//   },
// });

// // export default Profile;

// import React from "react";
// import { StyleSheet, View, ScrollView, Image, Dimensions } from "react-native";
// import {
//   Avatar,
//   Button,
//   Card,
//   Title,
//   Paragraph,
//   Text,
//   Chip,
//   useTheme,
//   Appbar,
// } from "react-native-paper";
// import { MaterialCommunityIcons } from "@expo/vector-icons";

// const { width } = Dimensions.get("window");
// const imageSize = width / 3 - 2;

// const ProfileScreen = () => {
//   const theme = useTheme();

//   // Mock data
//   const user = {
//     name: "Emma Watson",
//     username: "emma_watson",
//     avatar: "https://randomuser.me/api/portraits/women/44.jpg",
//     bio: "Computer Science Teacher | AI Enthusiast",
//     reputation: 15342,
//     type: "Teacher",
//     badges: ["Gold", "Silver", "Bronze"],
//     stats: {
//       answers: 523,
//       questions: 48,
//       reached: "1.5m",
//     },
//   };

//   const renderBadge = (type) => {
//     const colors = { Gold: "#FFD700", Silver: "#C0C0C0", Bronze: "#CD7F32" };
//     return (
//       <MaterialCommunityIcons
//         name="medal"
//         size={24}
//         color={colors[type]}
//         style={styles.badge}
//       />
//     );
//   };

//   return (
//     <ScrollView
//       style={[styles.container, { backgroundColor: theme.colors.background }]}
//     >
//       <View style={styles.header}>
//         <Avatar.Image
//           size={100}
//           source={{ uri: user.avatar }}
//           style={styles.avatar}
//         />
//         <Title style={styles.name}>{user.name}</Title>
//         <Paragraph style={styles.username}>@{user.username}</Paragraph>

//         <View style={styles.typeAndRep}>
//           <Chip icon="school" style={styles.typeChip}>
//             {user.type}
//           </Chip>
//           <View style={styles.reputation}>
//             <MaterialCommunityIcons
//               name="star"
//               size={24}
//               color={theme.colors.primary}
//             />
//             <Text style={styles.repText}>
//               {user.reputation.toLocaleString()} reputation
//             </Text>
//           </View>
//         </View>

//         <Paragraph style={styles.bio}>{user.bio}</Paragraph>

//         <View style={styles.statsContainer}>
//           <View style={styles.statsItem}>
//             <Title>{user.stats.answers}</Title>
//             <Text>Answers</Text>
//           </View>
//           <View style={styles.statsItem}>
//             <Title>{user.stats.questions}</Title>
//             <Text>Questions</Text>
//           </View>
//           <View style={styles.statsItem}>
//             <Title>{user.stats.reached}</Title>
//             <Text>Reached</Text>
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     alignItems: "center",
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: "#e0e0e0",
//   },
//   avatar: {
//     marginBottom: 10,
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   username: {
//     fontSize: 16,
//     color: "#666",
//   },
//   typeAndRep: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 10,
//   },
//   typeChip: {
//     marginRight: 10,
//   },
//   reputation: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   repText: {
//     marginLeft: 5,
//     fontWeight: "bold",
//   },
//   bio: {
//     marginTop: 10,
//     textAlign: "center",
//   },
//   badgesContainer: {
//     flexDirection: "row",
//     marginTop: 10,
//   },
//   badge: {
//     marginHorizontal: 5,
//   },
//   statsContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     width: "100%",
//     marginTop: 20,
//     marginBottom: 20,
//   },
//   statsItem: {
//     alignItems: "center",
//   },
//   editProfileButton: {
//     marginTop: 10,
//     width: "80%",
//   },
//   postsSection: {
//     padding: 10,
//   },
//   postsSectionHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   postsSectionTitle: {
//     marginLeft: 10,
//   },
//   postsGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   postImage: {
//     width: imageSize,
//     height: imageSize,
//     marginBottom: 2,
//     borderRadius: 8,
//   },

const user = {
  name: "Jane Doe",
  username: "jane_coder",
  avatar: "https://i.pravatar.cc/300",
  backgroundImage: "https://picsum.photos/800/400",
  reputation: 1234,
  answers: 42,
  questions: 15,
  badges: { gold: 3, silver: 7, bronze: 12 },
  recentActivity: [
    {
      type: "answer",
      title: "How to center a div?",
      date: "2 days ago",
      votes: 15,
    },
    {
      type: "question",
      title: "Best practices for React hooks",
      date: "1 week ago",
      votes: 8,
    },
    {
      type: "answer",
      title: "Difference between let and const",
      date: "2 weeks ago",
      votes: 22,
    },
  ],
};

const HEADER_HEIGHT = Dimensions.get("window").height * 0.4;

function ProfileScreen() {
  const theme = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={{ uri: user.backgroundImage }}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay} />
        <View style={styles.headerContent}>
          <Avatar.Image
            size={120}
            source={{ uri: user.avatar }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.username}>@{user.username}</Text>
          <View style={styles.badgeContainer}>
            <BadgeIcon type="gold" count={user.badges.gold} />
            <BadgeIcon type="silver" count={user.badges.silver} />
            <BadgeIcon type="bronze" count={user.badges.bronze} />
          </View>
        </View>
      </ImageBackground>

      <Card style={styles.statsCard}>
        <Card.Content style={styles.statsContent}>
          <StatItem icon="star" value={user.reputation} label="Reputation" />
          <StatItem
            icon="comment-question"
            value={user.questions}
            label="Questions"
          />
          <StatItem icon="comment-check" value={user.answers} label="Answers" />
        </Card.Content>
      </Card>

      <Card style={styles.activityCard}>
        <Card.Content>
          <Title style={styles.activityTitle}>Recent Activity</Title>
          {user.recentActivity.map((activity, index) => (
            <React.Fragment key={index}>
              <List.Item
                title={activity.title}
                description={`${activity.date} • ${activity.votes} votes`}
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon={
                      activity.type === "question"
                        ? "help-circle"
                        : "message-reply"
                    }
                    color={
                      activity.type === "question"
                        ? theme.colors.primary
                        : theme.colors.secondary
                    }
                  />
                )}
                right={(props) => (
                  <Text {...props} style={{ alignSelf: "center" }}>
                    {activity.votes}
                  </Text>
                )}
              />
              {index < user.recentActivity.length - 1 && (
                <Divider style={styles.divider} />
              )}
            </React.Fragment>
          ))}
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        style={styles.editButton}
        labelStyle={styles.editButtonLabel}
        onPress={() => console.log("Edit profile")}
      >
        Edit Profile
      </Button>
    </ScrollView>
  );
}

const BadgeIcon = ({ type, count }) => (
  <View style={styles.badgeIcon}>
    <MaterialCommunityIcons
      name="medal"
      size={20}
      color={
        type === "gold" ? "#FFD700" : type === "silver" ? "#C0C0C0" : "#CD7F32"
      }
    />
    <Text style={styles.badgeCount}>{count}</Text>
  </View>
);

const StatItem = ({ icon, value, label }) => (
  <View style={styles.statItem}>
    <MaterialCommunityIcons name={icon} size={24} color="#6200ee" />
    <Title style={styles.statValue}>{value}</Title>
    <Paragraph style={styles.statLabel}>{label}</Paragraph>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    height: HEADER_HEIGHT,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  headerContent: {
    alignItems: "center",
    paddingBottom: 20,
  },
  avatar: {
    marginBottom: 10,
    borderWidth: 4,
    borderColor: "white",
  },
  name: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  username: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 16,
    marginBottom: 10,
  },
  badgeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  badgeIcon: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
  },
  badgeCount: {
    color: "white",
    marginLeft: 4,
    fontWeight: "bold",
  },
  statsCard: {
    margin: 16,
    marginTop: -40,
    elevation: 4,
    borderRadius: 12,
  },
  statsContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    marginTop: 4,
    fontSize: 20,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
  activityCard: {
    margin: 16,
    marginTop: 0,
    elevation: 4,
    borderRadius: 12,
  },
  activityTitle: {
    marginBottom: 16,
    fontSize: 20,
    fontWeight: "bold",
  },
  divider: {
    marginVertical: 8,
  },
  editButton: {
    margin: 16,
    marginTop: 0,
    borderRadius: 8,
  },
  editButtonLabel: {
    fontSize: 16,
    paddingVertical: 4,
  },
});
