import styled from "styled-components";
import { Modal as MD } from "antd";
import { Content as CT } from "@containers/Content";

export const Content = styled(CT)`
  padding-bottom: 10px;
  p {
    margin-bottom: 15px;
    line-height: 1;
  }
  .info {
    border: 1px solid #eee;
    padding: 15px;
  }
  .i-edit {
    font-size: 20px;
    margin-right: 10px;
  }
`;

export const Modal = styled(MD)`
  width: 700px !important;
  .head {
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
  }
  .footer {
    padding: 10px;
    background-color: white;
  }
`;
