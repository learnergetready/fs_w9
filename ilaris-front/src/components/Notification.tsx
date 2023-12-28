import { Alert } from "@mui/material";

const Notification = ({message}: {message: string}) => {

  if (message) {
    return <Alert severity="error">{message}</Alert>;
  } else {
    return null;
  }

};

export default Notification;