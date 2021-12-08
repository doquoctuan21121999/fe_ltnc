import styled from "styled-components";
import { Layout, Menu } from "antd";

const { Header } = Layout;
const { Item } = Menu;

export const Head = styled.div`
  height: 72px;
  padding: 5px 50px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 1px 1px 15px #aaa;
  font-family: "Nunito Sans";
  .box-user-info {
    display: flex;

    .name {
      margin-right: 25px;
      .fullname {
        font-weight: bold;
        font-size: 16px;
        color: #172b4d;
      }
      .username{
        color: #999;
      }
    }

    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
`;

export const ItemMenu = styled(Item)`
  padding: 0.5rem 1rem;
  font-size: 16px;
  i {
    margin-right: 1rem;
    font-size: 1rem;
    vertical-align: -17%;
  }
`;
