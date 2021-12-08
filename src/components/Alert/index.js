import React from "react";
// react component used to create sweet alerts
import ReactBSAlert from "react-bootstrap-sweetalert";
// reactstrap components
import { Button } from "reactstrap";

class SweetAlerts extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      alert: (
        <ReactBSAlert
          style={{ position: "fixed", display: "block", marginTop: "-100px" }}
          title="Here's a message!"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          btnSize=""
          text="A few words about this sweet alert ..."
        >
          A few words about this sweet alert ...
        </ReactBSAlert>
      ),
    };
    if (prop.type === "basic") {
      this.basicAlert();
      console.log(prop.type);
    }
  }

  basicAlert = () => {
    return {
      alert: (
        <ReactBSAlert
          style={{ position: "fixed", display: "block", marginTop: "-100px" }}
          title="Here's a message!"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          btnSize=""
          text="A few words about this sweet alert ..."
        >
          A few words about this sweet alert ...
        </ReactBSAlert>
      ),
    };
  };
  infoAlert = () => {
    return {
      alert: (
        <ReactBSAlert
          info
          style={{ position: "fixed", display: "block", marginTop: "-100px" }}
          title="Info"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnBsStyle="info"
          confirmBtnText="Ok"
          btnSize=""
        >
          A few words about this sweet alert ...
        </ReactBSAlert>
      ),
    };
  };
  successAlert = () => {
    return {
      alert: (
        <ReactBSAlert
          success
          style={{ position: "fixed", display: "block", marginTop: "-100px" }}
          title="Success"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnBsStyle="success"
          confirmBtnText="Ok"
          btnSize=""
        >
          A few words about this sweet alert ...
        </ReactBSAlert>
      ),
    }
  };
  warningAlert = () => {
    return {
      alert: (
        <ReactBSAlert
          warning
          style={{ position: "fixed", display: "block", marginTop: "-100px" }}
          title="Warning"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnBsStyle="warning"
          confirmBtnText="Ok"
          btnSize=""
        >
          A few words about this sweet alert ...
        </ReactBSAlert>
      ),
    }
  };
  questionAlert = () => {
    return {
      alert: (
        <ReactBSAlert
          custom
          style={{ position: "fixed", display: "block", marginTop: "-100px" }}
          title="Question"
          customIcon={
            <div
              className="swal2-icon swal2-question swal2-animate-question-icon"
              style={{ display: "flex" }}
            >
              <span className="swal2-icon-text">?</span>
            </div>
          }
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnBsStyle="default"
          confirmBtnText="Ok"
          btnSize=""
        >
          A few words about this sweet alert ...
        </ReactBSAlert>
      ),
    }
  };
  hideAlert = () => {
    this.setState({
      alert: null,
    });
  };

  render() {
      console.log("0");
    return (
      <>
        {this.state.alert}
        {/* <Button color="primary" onClick={this.basicAlert}>
          Basic alert
        </Button>
        <Button color="info" onClick={this.infoAlert}>
          Info alert
        </Button>
        <Button color="success" onClick={this.successAlert}>
          Success alert
        </Button>
        <Button color="warning" onClick={this.warningAlert}>
          Warning alert
        </Button>
        <Button color="default" onClick={this.questionAlert}>
          Question
        </Button> */}
      </>
    );
  }
}

export default SweetAlerts;
