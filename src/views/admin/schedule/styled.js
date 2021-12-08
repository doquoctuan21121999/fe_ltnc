import styled from "styled-components";
import { Modal as MD } from "antd";

export const Screen = styled.div`
  background-color: white;
`;

export const Modal = styled(MD)`
  width: 1000px !important;
  max-width: 1500px !important;
  .head {
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
  }
  .footer {
    padding: 10px;
    background-color: white;
  }
`;
