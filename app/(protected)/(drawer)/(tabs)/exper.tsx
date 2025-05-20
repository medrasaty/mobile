import React from "react";
import CenterPage from "@components/CenterPage";
import Page from "@components/Page";
import { ImagePickerExample } from "@features/profile/components/ImagePickerExample";

const Exper = () => {
  // refs
  return (
    <Page container>
      <CenterPage>
        <ImagePickerExample />
      </CenterPage>
    </Page>
  );
};

export default Exper;

