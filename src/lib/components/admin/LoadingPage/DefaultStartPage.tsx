import React, { useEffect, useState } from "react";
import DefaultPopupAdmin from "../PopupAdmin/DefaultPopupAdmin";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/state/store";

interface PropsDefaultLoading {
  children: React.ReactNode;
  animation: string;
}

const DefaultStartPage: React.FC<PropsDefaultLoading> = ({
  children,
  animation,
}) => {
  const { popup_loading_page_admin } = useSelector(
    (state: RootState) => state.popup
  );

  return (
    <>
      <DefaultPopupAdmin
        animation={animation}
        popupDefault={popup_loading_page_admin}
      />
      <>
        <div>{children}</div>
      </>
    </>
  );
};
export default DefaultStartPage;
