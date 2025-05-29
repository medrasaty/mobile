import { Appearance, StyleSheet, View } from "react-native";
import { Divider, IconButton, List, Menu, useTheme } from "react-native-paper";
import { Question } from "@/types/forum.types";
import useCurrentUser from "@/hooks/useCurrentUser";
import { router, useRouter } from "expo-router";
import Sheet, { useSheetRef } from "@components/Sheet";
import { t } from "i18next";
import { Ionicons } from "@expo/vector-icons";
import { path } from "@/lib/routing";
import { useBottomSheet } from "@gorhom/bottom-sheet";

const MoreOptions = ({
  question,
}: {
  ownerUsername: Question["owner"]["username"];
  questionId: Question["id"];
  question: Question;
  contentTypeId: number;
}) => {
  const theme = useTheme();
  const user = useCurrentUser();

  const sheetRef = useSheetRef();

  // new implementation will use sheet
  return (
    <>
      <IconButton
        icon={"dots-vertical"}
        onPress={() => sheetRef.current?.expand()}
      />
      <Sheet snapPoints={["50%"]} ref={sheetRef}>
        <View style={{ marginVertical: 8 }}>
          <List.Item
            title={t("bookmark")}
            left={(props) => (
              <List.Icon
                {...props}
                icon={(props) => (
                  <Ionicons {...props} name="bookmark-outline" />
                )}
              />
            )}
            onPress={() => {}}
          />
        </View>
        <Divider bold />
        {question.owner.id === user.id && (
          <View>
            <EditQuestionItem questionId={question.id} />
            <List.Item
              title={t("delete")}
              left={(props) => (
                <List.Icon
                  {...props}
                  color={theme.colors.error}
                  icon={(props) => <Ionicons {...props} name="trash-outline" />}
                />
              )}
              onPress={() => {}}
            />
          </View>
        )}
      </Sheet>
    </>
  );

  {
    /* 
  return (
    <Menu
      visible={visible}
      onDismiss={hide}
      anchorPosition="bottom"
      style={{ marginTop: 20 }}
      contentStyle={{
        backgroundColor: theme.colors.surface,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: theme.colors.primary,
      }}
      anchor={<IconButton icon={"dots-vertical"} onPress={show} />}
    >
      <BookmarkQuestionItem />
      <RegisterQuestionItem />
      <Divider />
      {ownerUsername === user.username ? (
        <>
          <Menu.Item
            style={styles.item}
            onPress={() => {}}
            trailingIcon={"delete"}
            title="delete"
          />
          <Menu.Item
            style={styles.item}
            onPress={() => {
              hide();
              router.push(editQuestion({ questionId: questionId }));
            }}
            trailingIcon={"circle"}
            title="edit"
          />
        </>
      ) : (
        <ReportQuestionMenuItem
          questionId={questionId}
          contentTypeId={contentTypeId}
        />
      )}
    </Menu>
  );
      */
  }
};

const EditQuestionItem = ({ questionId }: { questionId: Question["id"] }) => {
  const { close } = useBottomSheet();
  const router = useRouter();
  const handlePress = () => {
    close();
    router.push(path.questions.edit(questionId));
  };
  return (
    <List.Item
      title={t("edit")}
      left={(props) => <List.Icon {...props} icon="pencil" />}
      onPress={handlePress}
    />
  );
};

export const QUESTION_CARD_HEIGHT = 220;

const styles = StyleSheet.create({
  item: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default MoreOptions;
