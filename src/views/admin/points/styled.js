import styled from "styled-components";
import { Layout } from "antd";
export const Content = styled(Layout.Content)`
  padding: 20px 10px;
  .content {
    background-color: white;
    padding: 10px 10px 0 10px;
    .head-content {
      display: flex;
      justify-content: space-between;
      padding: 10px 5px;
    }
  }
`;
