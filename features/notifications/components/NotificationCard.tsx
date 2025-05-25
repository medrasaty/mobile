import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Notification, NotificationType } from "@/types/notifications.type";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { StyleSheet, Pressable, View } from "react-native";
import { Avatar, Card, Surface, useTheme } from "react-native-paper";
import { parseNotificationRef } from "../lib/utils";
import { questionDetail } from "@/lib/routing";
import { d } from "@/lib/dates";
import useStore from "@/store";

/**
 * A modern, clean notification card component
 */
const NotificationCard: React.FC<{ notification: Notification }> = ({ notification }) => {
  const router = useRouter();
  const theme = useTheme();
  const setActiveNotificationDetails = useStore(state => state.setActiveNotificationDetails);
  
  const { is_read, notification: notificationData, created } = notification;
  
  // Format the created date
  const formattedDate = useMemo(() => {
    if (!created) return "";
    return d(created).fromNow();
  }, [created]);
  
  // Card background based on read status
  const cardStyle = useMemo(() => ({
    backgroundColor: is_read ? theme.colors.surface : theme.colors.primaryContainer,
    borderLeftWidth: is_read ? 0 : 4,
    borderLeftColor: is_read ? 'transparent' : theme.colors.primary,
  }), [is_read, theme.colors]);
  
  // Handle notification tap
  const handlePress = () => {
    const ref = parseNotificationRef(notification);
    
    // Set the notification details in the store before navigation
    setActiveNotificationDetails({
      type: notificationData.type as any, // Cast to the expected type
      question: ref.question,
      answer: ref.answer || null,
      reply: ref.reply || null
    });
    
    // Navigate to the question detail page
    router.push(
      questionDetail({
        questionId: ref.question,
      })
    );
  };

  return (
      <Card
        onPress={handlePress}
        style={[styles.card, cardStyle]} 
        elevation={0}
      >
        <View style={styles.contentContainer}>
          <NotificationTypeAvatar type={notificationData.type} />
          
          <View style={styles.textContainer}>
            <ThemedText 
              variant="titleSmall" 
              style={[
                styles.title, 
                is_read ? styles.readTitle : { color: theme.colors.primary }
              ]}
              numberOfLines={1}
            >
              {notificationData.title.toUpperCase()}
            </ThemedText>
            
            <View style={styles.bodyContainer}>
              <ThemedText 
                variant="bodyMedium" 
                style={[styles.body, is_read && styles.readText]}
                numberOfLines={2}
              >
                {notificationData.body}
              </ThemedText>
            </View>
            
            <ThemedText 
              variant="labelSmall" 
              style={styles.timestamp}
            >
              {formattedDate}
            </ThemedText>
          </View>
        </View>
      </Card>
  );
};

/**
 * Avatar component that displays an icon based on notification type
 */
const NotificationTypeAvatar: React.FC<{ type: NotificationType }> = ({ type }) => {
  const theme = useTheme();
  
  // Get avatar configuration based on notification type
  const avatarConfig = useMemo(() => {
    const configs = {
      [NotificationType.Question]: {
        icon: "crosshairs-question",
        backgroundColor: theme.colors.primary,
        iconType: "community",
      },
      [NotificationType.Answer]: {
        icon: "question-answer",
        backgroundColor: theme.colors.secondary,
        iconType: "material",
      },
      [NotificationType.Reply]: {
        icon: "comment-text-outline",
        backgroundColor: theme.colors.tertiary,
        iconType: "community",
      },
      [NotificationType.Other]: {
        icon: "bell-outline",
        backgroundColor: theme.colors.surfaceVariant,
        iconType: "community",
      },
    };
    
    return configs[type] || configs[NotificationType.Other];
  }, [type, theme.colors]);
  
  // Render the appropriate icon
  const renderIcon = () => {
    if (avatarConfig.iconType === "material") {
      return (
        <MaterialIcons
          name={avatarConfig.icon as any}
          size={20}
          color="white"
        />
      );
    }
    
    return (
      <MaterialCommunityIcons
        name={avatarConfig.icon as any}
        size={20}
        color="white"
      />
    );
  };
  
  return (
    <Avatar.Icon 
      size={40} 
      icon={renderIcon}
      style={{ backgroundColor: avatarConfig.backgroundColor }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginHorizontal: 12,
    borderRadius: 12,
    marginVertical: 6,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
    gap: 4,
  },
  title: {
    fontWeight: "700",
    letterSpacing: 0.5,
    fontSize: 12,
    marginBottom: 4,
  },
  readTitle: {
    opacity: 0.7,
  },
  bodyContainer: {
    marginVertical: 2,
  },
  body: {
    lineHeight: 20,
  },
  readText: {
    opacity: 0.7,
  },
  timestamp: {
    marginTop: 4,
    opacity: 0.6,
    fontSize: 10,
  },
});

export default NotificationCard;
