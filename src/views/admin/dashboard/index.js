import dashboardProvider from "@data-access/dashboard";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Content } from "@containers/Content";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let year = new Date().getFullYear();
    dashboardProvider.getDashboardData(year).then((json) => {
      if (json.code === 200) {
        setData(json.data);
      } else if (json && json.code === 401) {
        window.location.href = "/login";
      } else {
        toast.error("Đã xảy ra lỗi!");
      }
    });
  };

  return (
    <Content>
      <div className="content">
        <div className="head-content d-flex justify-space-between">
          <div className="a">
            <h2>
              <b style={{ color: "#27DDF5" }}>Thống kê</b>
            </h2>
          </div>
        </div>
        <div style={{ alignContent: "center" }}>
          <LineChart
            width={1200}
            height={500}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" padding={{ left: 30, right: 30 }} />
            <YAxis yAxisId="left" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="total"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              name="Biểu đồ thống kê số sinh viên đăng ký"
            />
          </LineChart>
        </div>
      </div>
    </Content>
  );
};

export default Dashboard;
