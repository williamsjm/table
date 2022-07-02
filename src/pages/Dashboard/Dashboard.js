import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useRouteMatch } from "react-router-dom";

import Timestamp from "react-timestamp";
import {
  Breadcrumb,
  Layout,
  Menu,
  Row,
  Col,
  Table,
  Input,
  Space,
  Button,
  List,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
const { Header, Content } = Layout;
const api = axios.create({
  baseURL: "https://serpindex-demo.svc.violetvault.com",
  mode: "no-cors",
  headers: {
    "Content-Type": "text/plain",
  },
});

const Dashboard = (props) => {
  const items = [{ label: "Table", key: "1" }];
  const [data, setData] = useState();
  const match = useRouteMatch();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 100,

      key: "id",
      render: (text, data) => {
        return (
          <Link to={"/" + data.id}>
            <span>{text}</span>
          </Link>
        );
      },
    },
    {
      title: "CreatedOn",
      dataIndex: "createdOn",
      key: "createdOn",
      render: (text, id) => {
        return (
          <Timestamp
            date={text}
            options={{ includeDay: true, twentyFourHour: true }}
          />
        );
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, data) => {
        return (
          <Link to={`${match.url}/` + data.id}>
            <span>{text}</span>
          </Link>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <div style={{ padding: 8 }}>
              <Input
                autoFocus
                placeholder="Type here"
                value={selectedKeys[0]}
                onChange={(e) => {
                  setSelectedKeys(e.target.value ? [e.target.value] : []);
                  confirm({ closeDropdown: false });
                }}
                onPressEnter={() => {
                  confirm();
                }}
                onBlur={() => {
                  confirm();
                }}
                style={{ marginBottom: 8, display: "block" }}
              />
              <Space>
                <Button
                  onClick={() => confirm()}
                  icon={<SearchOutlined />}
                  size="small"
                  style={{ width: 90, borderColor: "#000" }}
                >
                  Search
                </Button>
                <Button
                  danger
                  onClick={() => {
                    clearFilters();
                  }}
                  size="small"
                  style={{ width: 90 }}
                >
                  Reset
                </Button>
              </Space>
            </div>
          </>
        );
      },
      filterIcon: (filtered) => {
        return (
          <SearchOutlined
            style={{ fontSize: 16, color: filtered ? "#000" : undefined }}
          />
        );
      },
      onFilter: (value, record) => {
        return record.enquireName.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Domain",
      dataIndex: "domain",
      key: "domain",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <div style={{ padding: 8 }}>
              <Input
                autoFocus
                placeholder="Type here"
                value={selectedKeys[0]}
                onChange={(e) => {
                  setSelectedKeys(e.target.value ? [e.target.value] : []);
                  confirm({ closeDropdown: false });
                }}
                onPressEnter={() => {
                  confirm();
                }}
                onBlur={() => {
                  confirm();
                }}
                style={{ marginBottom: 8, display: "block" }}
              />
              <Space>
                <Button
                  onClick={() => confirm()}
                  icon={<SearchOutlined />}
                  size="small"
                  style={{ width: 90, borderColor: "#000" }}
                >
                  Search
                </Button>
                <Button
                  danger
                  onClick={() => {
                    clearFilters();
                  }}
                  size="small"
                  style={{ width: 90 }}
                >
                  Reset
                </Button>
              </Space>
            </div>
          </>
        );
      },
      filterIcon: (filtered) => {
        return (
          <SearchOutlined
            style={{ fontSize: 16, color: filtered ? "#000" : undefined }}
          />
        );
      },
      onFilter: (value, record) => {
        return record.enquireName.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Days until expired",
      dataIndex: "validUntil",
      key: "validUntil",
      render: (text, id) => {
        return (
          <Timestamp
            date={text}
            options={{ includeDay: true, twentyFourHour: true }}
          />
        );
      },
    },
    {
      title: "Indexed languages",
      dataIndex: "entries",
      key: "Indexed languages",
      render: (arr) => {
        // return arr.map((index) => {
        //   <>
        //     <span>{index.language}</span>
        //   </>;
        // });
        return (
          <>
            {arr.map((index) => {
              <span>{index.language}</span>;
            })}
          </>
        );
      },
    },
    {
      title: "Unindexed languages",
      dataIndex: "Unindexed languages",
      key: "Unindexed languages",
    },
  ];
  useEffect(() => {
    const init = async () => {
      try {
        const response = await api.get("/Index");

        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    init();
  }, []);

  return (
    <div className="container">
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items}
          />
        </Header>
        <Row justify="space-around" align="middle">
          <Col>
            <Content>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Table</Breadcrumb.Item>
              </Breadcrumb>
              <div className="site-layout-content">
                <Table
                  dataSource={data}
                  columns={columns}
                  rowKey={(record) => record.id}
                />
              </div>
            </Content>
          </Col>
        </Row>
      </Layout>
    </div>
  );
};

export default Dashboard;
