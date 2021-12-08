import styled from "styled-components";
import { Modal as MD } from "antd";

export const Screen = styled.div``;

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