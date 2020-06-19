import React from "react";
import { useSelector } from "react-redux";

import Alert from "@material-ui/lab/Alert";

import { selectMessage } from "../../store/appState/selectors";

export default function MessageBox() {
  const message = useSelector(selectMessage);
  const showMessage = message !== null;
  if (!showMessage) return null;

  return (
    <Alert show={showMessage} severity="info">
      {message.text}
    </Alert>
  );
}
