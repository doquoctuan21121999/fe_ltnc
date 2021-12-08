import React from "react";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";
// reactstrap components
import {
  Button,
} from "reactstrap";

class Notifications extends React.Component {
  notify(type){
    let options = {
      place: "tc",
      message: (
        <div className="alert-text">
          <span className="alert-title" data-notify="title">
            
            Bootstrap Notify
          </span>
          <span data-notify="message">
            Turning standard Bootstrap alerts into awesome notifications
          </span>
        </div>
      ),
      type: type,
      icon: "ni ni-bell-55",
      autoDismiss: 7
    };
    this.refs.notificationAlert.notificationAlert(options);
  };
  render() {
    return (
      <>
        {/* <div className="rna-wrapper">
          <NotificationAlert ref="notificationAlert" />
        </div> */}
        {/* <Button
          color="default"
          onClick={() => this.notify("default")}
        >
          Default
        </Button>
        <Button color="info" onClick={() => this.notify("info")}>
          Info
        </Button>
        <Button
          color="success"
          onClick={() => this.notify("success")}
        >
          Success
        </Button>
        <Button
          color="warning"
          onClick={() => this.notify("warning")}
        >
          Warning
        </Button>
        <Button color="danger" onClick={() => this.notify("danger")}>
          Danger
        </Button> */}
      </>
    );
  }
}

export default Notifications;