import React from "react";
import CenterPage from "@components/CenterPage";
import Page from "@components/Page";
import { ThemedText } from "@components/ThemedText";

const Exper = () => {
  return (
    <Page container>
      <CenterPage style={{ gap: 20 }}>
        <ThemedText>{"Solo is exper"}</ThemedText>
      </CenterPage>
    </Page>
  );
};

export default Exper;
