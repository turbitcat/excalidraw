import React from "react";
import { useI18n } from "../../packages/excalidraw/i18n";
import { WelcomeScreen } from "../../packages/excalidraw/index";
import { isExcalidrawPlusSignedUser } from "../app_constants";
import { POINTER_EVENTS } from "../../packages/excalidraw/constants";

export const AppWelcomeScreen: React.FC<{
  setCollabDialogShown: (toggle: boolean) => any;
  isCollabEnabled: boolean;
}> = React.memo((props) => {
  const { t } = useI18n();
  let headingContent;

  if (isExcalidrawPlusSignedUser) {
    headingContent = t("welcomeScreen.app.center_heading_plus")
      .split(/(Excalidraw\+)/)
      .map((bit, idx) => {
        if (bit === "Excalidraw+") {
          return (
            <a
              style={{ pointerEvents: POINTER_EVENTS.inheritFromUI }}
              href={`${
                import.meta.env.VITE_APP_PLUS_APP
              }?utm_source=excalidraw&utm_medium=app&utm_content=welcomeScreenSignedInUser`}
              key={idx}
            >
              Excalidraw+
            </a>
          );
        }
        return bit;
      });
  } else {
    headingContent = t("welcomeScreen.app.center_heading");
  }

  return (
    <WelcomeScreen>
      <WelcomeScreen.Hints.MenuHint>
        {t("welcomeScreen.app.menuHint")}
      </WelcomeScreen.Hints.MenuHint>
      <WelcomeScreen.Hints.ToolbarHint />
      <WelcomeScreen.Hints.HelpHint />
      <WelcomeScreen.Center>
        <WelcomeScreen.Center.Logo />
        <WelcomeScreen.Center.Heading>
          {headingContent}
        </WelcomeScreen.Center.Heading>
        <WelcomeScreen.Center.Menu>
          <WelcomeScreen.Center.MenuItemLoadScene />
          <WelcomeScreen.Center.MenuItemHelp />
          {props.isCollabEnabled && (
            <WelcomeScreen.Center.MenuItemLiveCollaborationTrigger
              onSelect={() => props.setCollabDialogShown(true)}
            />
          )}
        </WelcomeScreen.Center.Menu>
      </WelcomeScreen.Center>
    </WelcomeScreen>
  );
});
