import React, { useState } from "react";
import CenterPage from "@components/CenterPage";
import Page from "@components/Page";
import { useAuthSession } from "@features/auth/store";
import ResizableImage from "@components/ResizableImage";

const Exper = () => {
  const [expand, setExpand] = useState(false);

  const background = useAuthSession(
    (state) => state.session?.user.profile.background || ""
  );

  return (
    <Page container>
      <CenterPage>
        <ResizableImage uri={background} />
      </CenterPage>
    </Page>
  );
};

export default Exper;
