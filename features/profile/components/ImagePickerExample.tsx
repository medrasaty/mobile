import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Text, ActivityIndicator, Card, IconButton } from 'react-native-paper';
import { Image } from 'expo-image';
import useImagePicker from '@/hooks/useImagePicker';
import { useUpdateUserProfileMutation } from '../mutations';
import { fileUploadType } from '@/types';
import { useAuthSession } from '@/features/auth/store';
import { useSheetRef } from '@/components/Sheet';
import ImagePickerSheet from './ImagePickerSheet';
import { t } from 'i18next';

/**
 * Example component that demonstrates how to use the useImagePicker hook
 * with the profile update mutations.
 */
export function ImagePickerExample() {
  const user = useAuthSession(state => state.session?.user);
  const [selectedImages, setSelectedImages] = useState<{
    profilePicture?: fileUploadType;
    background?: fileUploadType;
  }>({});
  
  // Create sheet refs for each image picker
  const profilePickerSheetRef = useSheetRef();
  const backgroundPickerSheetRef = useSheetRef();
  
  // Create two separate instances of the image picker hook - one for each image type
  const profilePicker = useImagePicker();
  const backgroundPicker = useImagePicker();
  
  // Get the mutation hook for updating the profile
  const { mutate: updateProfile, isPending } = useUpdateUserProfileMutation(
    user?.pk || ""
  );

  // Handler for selecting a profile picture from library
  const handleSelectProfilePicture = async (source: 'library' | 'camera') => {
    const success = await profilePicker.pickImage({
      aspect: [1, 1],
      allowsEditing: true,
      quality: 0.7,
    }, source);
    
    if (success && profilePicker.fileUpload) {
      setSelectedImages(prev => ({
        ...prev,
        profilePicture: profilePicker.fileUpload,
      }));
    }
  };

  // Handler for selecting a background image
  const handleSelectBackground = async (source: 'library' | 'camera') => {
    const success = await backgroundPicker.pickImage({
      aspect: [16, 9],
      allowsEditing: true,
      quality: 0.7,
    }, source);
    
    if (success && backgroundPicker.fileUpload) {
      setSelectedImages(prev => ({
        ...prev,
        background: backgroundPicker.fileUpload,
      }));
    }
  };

  // Handler for saving both images at once
  const handleSaveImages = () => {
    const updateData: any = {};
    
    if (selectedImages.profilePicture) {
      updateData.profile_picture = selectedImages.profilePicture;
    }
    
    if (selectedImages.background) {
      updateData.profile = {
        background: selectedImages.background,
      };
    }
    
    if (Object.keys(updateData).length > 0) {
      updateProfile(updateData, {
        onSuccess: () => {
          setSelectedImages({});
          profilePicker.reset();
          backgroundPicker.reset();
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Update Profile Images" />
        <Card.Content>
          <View style={styles.imagePreviewRow}>
            <View style={styles.previewContainer}>
              <Text style={styles.previewLabel}>Profile Picture</Text>
              <TouchableOpacity 
                onPress={() => profilePickerSheetRef.current?.expand()}
                disabled={profilePicker.isLoading || isPending}
              >
                <Image
                  source={
                    profilePicker.fileUpload?.uri || 
                    user?.profile_picture || 
                    'https://via.placeholder.com/100'
                  }
                  style={styles.profilePreview}
                />
                {profilePicker.isLoading && (
                  <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="small" color="#fff" />
                  </View>
                )}
                <View style={styles.imageButtonOverlay}>
                  <IconButton
                    icon="camera-plus"
                    size={20}
                    iconColor="#fff"
                    onPress={() => profilePickerSheetRef.current?.expand()}
                    disabled={profilePicker.isLoading || isPending}
                  />
                </View>
              </TouchableOpacity>
              
              <ImagePickerSheet
                sheetRef={profilePickerSheetRef}
                title={t("Profile Picture")}
                onCameraPress={() => handleSelectProfilePicture('camera')}
                onGalleryPress={() => handleSelectProfilePicture('library')}
                isLoading={profilePicker.isLoading || isPending}
              />
            </View>
            
            <View style={styles.previewContainer}>
              <Text style={styles.previewLabel}>Background</Text>
              <TouchableOpacity 
                onPress={() => backgroundPickerSheetRef.current?.expand()}
                disabled={backgroundPicker.isLoading || isPending}
              >
                <Image
                  source={
                    backgroundPicker.fileUpload?.uri || 
                    user?.profile?.background || 
                    'https://via.placeholder.com/300x150'
                  }
                  style={styles.backgroundPreview}
                />
                {backgroundPicker.isLoading && (
                  <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="small" color="#fff" />
                  </View>
                )}
                <View style={styles.imageButtonOverlay}>
                  <IconButton
                    icon="camera-plus"
                    size={20}
                    iconColor="#fff"
                    onPress={() => backgroundPickerSheetRef.current?.expand()}
                    disabled={backgroundPicker.isLoading || isPending}
                  />
                </View>
              </TouchableOpacity>
              
              <ImagePickerSheet
                sheetRef={backgroundPickerSheetRef}
                title={t("Background Image")}
                onCameraPress={() => handleSelectBackground('camera')}
                onGalleryPress={() => handleSelectBackground('library')}
                isLoading={backgroundPicker.isLoading || isPending}
              />
            </View>
          </View>
          
          <Button 
            mode="contained" 
            onPress={handleSaveImages}
            loading={isPending}
            disabled={
              isPending ||
              profilePicker.isLoading ||
              backgroundPicker.isLoading ||
              (
                !selectedImages.profilePicture && 
                !selectedImages.background
              )
            }
            style={styles.saveButton}
          >
            Save Changes
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    marginVertical: 8,
  },
  imagePreviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  previewContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  previewLabel: {
    marginBottom: 8,
    opacity: 0.7,
  },
  profilePreview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
  },
  backgroundPreview: {
    width: 180,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  imageButtonOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 50,
  },
  saveButton: {
    marginTop: 16,
  },
}); 