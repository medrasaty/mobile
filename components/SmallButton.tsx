import * as React from "react";
import {
  Animated,
  GestureResponderEvent,
  Platform,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

import color from "color";

import { getButtonColors } from "react-native-paper/src/components/Button/utils";
import { useInternalTheme } from "react-native-paper/src/core/theming";
import { forwardRef } from "react-native-paper/src/utils/forwardRef";
import hasTouchHandler from "react-native-paper/src/utils/hasTouchHandler";
import { splitStyles } from "react-native-paper/src/utils/splitStyles";
import {
  ButtonProps,
  Text,
  ActivityIndicator,
  Surface,
} from "react-native-paper";
import Icon from "react-native-paper/src/components/Icon";
import TouchableRipple from "react-native-paper/src/components/TouchableRipple/TouchableRipple";
import { debugStyle } from "@/constants/styels";

/**
 * A small button is a for of react-native-paper button that provide small version of it.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Button } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <SmallButton icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
 *     Press me
 *   </SmallButton>
 * );
 *
 * export default MyComponent; ```
 */

type ButtonMode =
  | "text"
  | "outlined"
  | "contained"
  | "elevated"
  | "contained-tonal"
  | "ripple";

type SmallButtonProps = {
  mode?: ButtonMode;
  lableSmall?: boolean;
} & Omit<ButtonProps, "mode">;
const SmallButton = (
  {
    disabled,
    compact,
    mode = "text",
    dark,
    loading,
    icon,
    buttonColor: customButtonColor,
    textColor: customTextColor,
    rippleColor: customRippleColor,
    children,
    accessibilityLabel,
    accessibilityHint,
    accessibilityRole = "button",
    onPress,
    onPressIn,
    onPressOut,
    onLongPress,
    delayLongPress,
    style,
    theme: themeOverrides,
    uppercase: uppercaseProp,
    contentStyle,
    labelStyle,
    testID = "button",
    accessible,
    background,
    lableSmall = true,
    maxFontSizeMultiplier,
    ...rest
  }: SmallButtonProps,
  ref: React.ForwardedRef<View>
) => {
  const theme = useInternalTheme(themeOverrides);

  const isMode = React.useCallback(
    (modeToCompare: ButtonMode) => {
      // Ripple mode only changes background color.
      if (mode === "ripple" && modeToCompare == "text") return true;
      return mode === modeToCompare;
    },
    [mode]
  );
  const { roundness, isV3, animation } = theme;
  const uppercase = uppercaseProp ?? !theme.isV3;

  const hasPassedTouchHandler = hasTouchHandler({
    onPress,
    onPressIn,
    onPressOut,
    onLongPress,
  });

  const isElevationEntitled =
    !disabled && (isV3 ? isMode("elevated") : isMode("contained"));
  const initialElevation = isV3 ? 1 : 2;
  const activeElevation = isV3 ? 2 : 8;

  const { current: elevation } = React.useRef<Animated.Value>(
    new Animated.Value(isElevationEntitled ? initialElevation : 0)
  );

  React.useEffect(() => {
    elevation.setValue(isElevationEntitled ? initialElevation : 0);
  }, [isElevationEntitled, elevation, initialElevation]);

  const handlePressIn = (e: GestureResponderEvent) => {
    onPressIn?.(e);
    if (isV3 ? isMode("elevated") : isMode("contained")) {
      const { scale } = animation;
      Animated.timing(elevation, {
        toValue: activeElevation,
        duration: 200 * scale,
        useNativeDriver:
          Platform.OS === "web" ||
          Platform.constants.reactNativeVersion.minor <= 72,
      }).start();
    }
  };

  const handlePressOut = (e: GestureResponderEvent) => {
    onPressOut?.(e);
    if (isV3 ? isMode("elevated") : isMode("contained")) {
      const { scale } = animation;
      Animated.timing(elevation, {
        toValue: initialElevation,
        duration: 150 * scale,
        useNativeDriver:
          Platform.OS === "web" ||
          Platform.constants.reactNativeVersion.minor <= 72,
      }).start();
    }
  };

  const flattenedStyles = (StyleSheet.flatten(style) || {}) as ViewStyle;
  const [, borderRadiusStyles] = splitStyles(
    flattenedStyles,
    (style) => style.startsWith("border") && style.endsWith("Radius")
  );

  const borderRadius = (isV3 ? 5 : 1) * roundness;
  const iconSize = isV3 ? 12 : 10;

  const { backgroundColor, borderColor, textColor, borderWidth } =
    getButtonColors({
      customButtonColor,
      customTextColor,
      theme,
      mode,
      disabled,
      dark,
    });

  const rippleColor =
    customRippleColor || color(textColor).alpha(0.12).rgb().string();

  const touchableStyle = {
    ...borderRadiusStyles,
    borderRadius: borderRadiusStyles.borderRadius ?? borderRadius,
  };

  const buttonStyle = {
    backgroundColor,
    borderColor,
    borderWidth,
    ...touchableStyle,
  };

  const { color: customLabelColor, fontSize: customLabelSize } =
    StyleSheet.flatten(labelStyle) || {};

  const font = isV3 ? theme.fonts.labelLarge : theme.fonts.medium;

  const textStyle = {
    color: textColor,
    ...font,
  };

  const iconStyle =
    StyleSheet.flatten(contentStyle)?.flexDirection === "row-reverse"
      ? [
          styles.iconReverse,
          isV3 && styles[`md3IconReverse${compact ? "Compact" : ""}`],
          isV3 &&
            isMode("text") &&
            styles[`md3IconReverseTextMode${compact ? "Compact" : ""}`],
        ]
      : [
          styles.icon,
          isV3 && styles[`md3Icon${compact ? "Compact" : ""}`],
          isV3 &&
            isMode("text") &&
            styles[`md3IconTextMode${compact ? "Compact" : ""}`],
        ];

  return (
    <Surface
      {...rest}
      ref={ref}
      testID={`${testID}-container`}
      style={
        [
          styles.button,
          compact && styles.compact,
          buttonStyle,
          style,
          !isV3 && !disabled && { elevation },
        ] as ViewStyle
      }
      {...(isV3 && { elevation: elevation })}
    >
      <TouchableRipple
        borderless
        background={background}
        onPress={onPress}
        onLongPress={onLongPress}
        onPressIn={hasPassedTouchHandler ? handlePressIn : undefined}
        onPressOut={hasPassedTouchHandler ? handlePressOut : undefined}
        delayLongPress={delayLongPress}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityRole={accessibilityRole}
        accessibilityState={{ disabled }}
        accessible={accessible}
        disabled={disabled}
        rippleColor={rippleColor}
        style={touchableStyle}
        testID={testID}
        theme={theme}
      >
        <View
          style={[
            styles.content,
            contentStyle,
            isMode("ripple") && { backgroundColor: rippleColor },
          ]}
        >
          {icon && loading !== true ? (
            <View style={iconStyle} testID={`${testID}-icon-container`}>
              <Icon
                source={icon}
                size={customLabelSize ?? iconSize}
                color={
                  typeof customLabelColor === "string"
                    ? customLabelColor
                    : textColor
                }
              />
            </View>
          ) : null}
          {loading ? (
            <ActivityIndicator
              size={customLabelSize ?? iconSize}
              color={
                typeof customLabelColor === "string"
                  ? customLabelColor
                  : textColor
              }
              style={iconStyle}
            />
          ) : null}
          <Text
            variant="labelSmall"
            selectable={false}
            numberOfLines={1}
            testID={`${testID}-text`}
            style={[
              styles.label,
              !isV3 && styles.md2Label,
              isV3 &&
                (isMode("text")
                  ? icon || loading
                    ? styles.md3LabelTextAddons
                    : styles.md3LabelText
                  : styles.md3Label),
              compact && styles.compactLabel,
              uppercase && styles.uppercaseLabel,
              textStyle,
              labelStyle,
              lableSmall && { fontSize: 12 },
            ]}
            maxFontSizeMultiplier={maxFontSizeMultiplier}
          >
            {children}
          </Text>
        </View>
      </TouchableRipple>
    </Surface>
  );
};

const styles = StyleSheet.create({
  button: {
    minWidth: 64,
    borderStyle: "solid",
  },
  compact: {
    minWidth: "auto",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginLeft: 12,
    marginRight: -4,
  },
  iconReverse: {
    marginRight: 12,
    marginLeft: -4,
  },
  /* eslint-disable react-native/no-unused-styles */
  md3Icon: {
    marginLeft: 16,
    marginRight: -16,
  },
  md3IconCompact: {
    marginLeft: 8,
    marginRight: 0,
  },
  md3IconReverse: {
    marginLeft: -16,
    marginRight: 16,
  },
  md3IconReverseCompact: {
    marginLeft: 0,
    marginRight: 8,
  },
  md3IconTextMode: {
    marginLeft: 12,
    marginRight: -8,
  },
  md3IconTextModeCompact: {
    marginLeft: 6,
    marginRight: 0,
  },
  md3IconReverseTextMode: {
    marginLeft: -8,
    marginRight: 12,
  },
  md3IconReverseTextModeCompact: {
    marginLeft: 0,
    marginRight: 6,
  },
  /* eslint-enable react-native/no-unused-styles */
  label: {
    textAlign: "center",
    marginVertical: 2,
    marginHorizontal: 16,
  },
  md2Label: {
    letterSpacing: 1,
  },
  compactLabel: {
    marginHorizontal: 8,
  },
  uppercaseLabel: {
    textTransform: "uppercase",
  },
  md3Label: {
    marginVertical: 2,
    marginHorizontal: 18,
  },
  md3LabelText: {
    marginHorizontal: 18,
  },
  md3LabelTextAddons: {
    marginHorizontal: 16,
  },
});

export default forwardRef(SmallButton);
