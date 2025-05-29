import React, { useState, useRef } from 'react';
import { StyleSheet, Pressable, Dimensions, View } from 'react-native';
import { Portal } from '@gorhom/portal';
import { Image } from 'expo-image';
import Gallery from 'react-native-awesome-gallery';
import { debugStyle } from '@/constants/styels';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ResizableImageProps {
  uri: string;
  width?: number;
  height?: number;
  style?: any;
  galleryProps?: Partial<typeof Gallery>;
  imageProps?: React.ComponentProps<typeof Image>;
}

export const ResizableImage: React.FC<ResizableImageProps> = ({
  uri,
  width,
  height,
  style,
  galleryProps,
  imageProps,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePress = () => {
    setIsExpanded(!isExpanded);
  };

  const renderGalleryItem = ({ item }: { item: string }) => (
    <View style={{ flex: 1, justifyContent: "center"}}>
      <Image
        source={{ uri: item }}
        contentFit="fill"
        {...imageProps}
      />
    </View>
  );

  return (
    <>
      <Pressable 
        onPress={handlePress} 
        style={[
          style,
          { width, height }
        ]}
      >
        <Image
          source={{ uri }}
          style={[styles.image, { width, height }]}
          contentFit="cover"
          {...imageProps}
        />
      </Pressable>

      {isExpanded && (
        <Portal>
          <View style={styles.backdrop}>
            <Gallery
              data={[uri]}
              // renderItem={renderGalleryItem}
              keyExtractor={(item) => item}
              initialIndex={0}
              onTap={handlePress}
              doubleTapScale={2.5}
              maxScale={5}
              style={{backgroundColor: 'transparent' }}
              onSwipeToClose={handlePress}
              pinchEnabled={true}
              {...galleryProps}
            />
          </View>
        </Portal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    backgroundColor: '#f0f0f0',
  },
  galleryImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 999,
  }
});

export default ResizableImage; 