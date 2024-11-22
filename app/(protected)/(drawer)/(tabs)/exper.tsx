import React, { useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker"; // Assuming using Expo
import Page from "@components/Page";

// If not using Expo, you can use react-native-image-picker

// 1. Yup Validation Schema
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  profileImage: Yup.string().required("Profile image is required"),
  bio: Yup.string().max(200, "Bio must not exceed 200 characters"),
  categories: Yup.array()
    .min(1, "Select at least one category")
    .required("Categories are required"),
});

const ProfileForm = () => {
  // 2. Initial Form Values
  const initialValues = {
    username: "dany dan",
    email: "sol@gmail.shayea",
    phone: "39393939393",
    profileImage: "file:///some/path/to/cache/image.png",
    bio: "nothing is able to stop me",
    categories: [],
  };

  // 3. Image Picker Function
  const pickImage = async (setFieldValue) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFieldValue("profileImage", result.assets[0].uri);
    }
  };

  // 4. Categories Data
  const categoryOptions = [
    { id: 1, name: "Technology" },
    { id: 2, name: "Design" },
    { id: 3, name: "Business" },
    { id: 4, name: "Marketing" },
  ];

  return (
    <Page>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          // Handle form submission
          console.log(values);
          // You would typically send this to an API
          setSubmitting(false);
        }}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
          isSubmitting,
        }) => (
          <View style={styles.container}>
            {/* Profile Image */}
            <TouchableOpacity
              onPress={() => pickImage(setFieldValue)}
              style={styles.imageContainer}
            >
              {values.profileImage ? (
                <Image
                  source={{ uri: values.profileImage }}
                  style={styles.image}
                />
              ) : (
                <Text>Select Profile Image</Text>
              )}
            </TouchableOpacity>
            {touched.profileImage && errors.profileImage && (
              <Text style={styles.error}>{errors.profileImage}</Text>
            )}

            {/* Username Input */}
            <TextInput
              style={styles.input}
              onChangeText={handleChange("username")}
              value={values.username}
              placeholder="Username"
            />
            {touched.username && errors.username && (
              <Text style={styles.error}>{errors.username}</Text>
            )}

            {/* Email Input */}
            <TextInput
              style={styles.input}
              onChangeText={handleChange("email")}
              value={values.email}
              placeholder="Email"
              keyboardType="email-address"
            />
            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

            {/* Phone Input */}
            <TextInput
              style={styles.input}
              onChangeText={handleChange("phone")}
              value={values.phone}
              placeholder="Phone"
              keyboardType="phone-pad"
            />
            {touched.phone && errors.phone && (
              <Text style={styles.error}>{errors.phone}</Text>
            )}

            {/* Bio Input */}
            <TextInput
              style={[styles.input, styles.bioInput]}
              onChangeText={handleChange("bio")}
              value={values.bio}
              placeholder="Bio"
              multiline
              numberOfLines={4}
            />
            {touched.bio && errors.bio && (
              <Text style={styles.error}>{errors.bio}</Text>
            )}

            {/* Categories Selection */}
            <View style={styles.categoriesContainer}>
              {categoryOptions.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryButton,
                    values.categories.includes(category.id) &&
                      styles.selectedCategory,
                  ]}
                  onPress={() => {
                    const currentCategories = [...values.categories];
                    const index = currentCategories.indexOf(category.id);
                    if (index > -1) {
                      currentCategories.splice(index, 1);
                    } else {
                      currentCategories.push(category.id);
                    }
                    setFieldValue("categories", currentCategories);
                  }}
                >
                  <Text style={styles.categoryText}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {touched.categories && errors.categories && (
              <Text style={styles.error}>{errors.categories}</Text>
            )}

            <Button
              mode="elevated"
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </View>
        )}
      </Formik>
    </Page>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
  },
  bioInput: {
    textAlignVertical: "top",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  categoryButton: {
    padding: 10,
    margin: 5,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  selectedCategory: {
    backgroundColor: "#007AFF",
  },
  categoryText: {
    color: "#333",
  },
});
