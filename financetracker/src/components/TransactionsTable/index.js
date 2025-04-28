import React from "react";
import { Table, Select, Radio, Button } from "antd";
import { UploadOutlined, DownloadOutlined } from "@ant-design/icons";

const TransactionsTable = ({ transactions }) => {
  const { Option } = Select;
  const [search, setSearch] = React.useState("");
  const [sortKey, setSortKey] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState("");

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Tag", dataIndex: "tag", key: "tag" },
    { title: "Type", dataIndex: "type", key: "type" },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => new Date(text).toLocaleDateString(),
    },
  ];

  const filteredTransactions = transactions.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      item.type.includes(typeFilter)
  );

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });

  return (
    <div>
    <h1 style={{alignItems: "center" , marginLeft: "40%" }} >My Transactions</h1>
    <div
      style={{
        width: "95%",
        maxWidth: "1200px",
        margin: "2rem auto",
        padding: "2rem",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      {/* Top Controls */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
          gap: "1rem",
        }}
      >
        {/* Left Controls */}
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          {/* Search */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#f5f5f5",
              padding: "0.5rem 0.75rem",
              borderRadius: "4px",
            }}
          >
            <img
              src="https://tse1.mm.bing.net/th/id/OIP.Wg7d9py54h7ViyCEq60PcgHaHa?rs=1&pid=ImgDetMain"
              width="16"
              alt="search"
              style={{ marginRight: "8px" }}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Name"
              style={{
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
                fontSize: "14px",
              }}
            />
          </div>

          {/* Import CSV */}
          <Button
            icon={<UploadOutlined />}
            style={{
              backgroundColor: "#1890ff",
              color: "#fff",
              border: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            Import CSV
          </Button>

          {/* Export CSV */}
          <Button
            icon={<DownloadOutlined />}
            style={{
              backgroundColor: "#52c41a",
              color: "#fff",
              border: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            Export CSV
          </Button>
        </div>

        {/* Right Controls */}
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          {/* Filter */}
          <Select
            onChange={(value) => setTypeFilter(value)}
            value={typeFilter}
            placeholder="Filter by Type"
            allowClear
            style={{ width: 150 }}
          >
            <Option value="">All</Option>
            <Option value="income">Income</Option>
            <Option value="expense">Expense</Option>
          </Select>

          {/* Sort */}
          <Radio.Group
            onChange={(e) => setSortKey(e.target.value)}
            value={sortKey}
          >
            <Radio.Button value="">No Sort</Radio.Button>
            <Radio.Button value="date">Sort by Date</Radio.Button>
            <Radio.Button value="amount">Sort by Amount</Radio.Button>
          </Radio.Group>
        </div>
      </div>

      {/* Transactions Table */}
      <Table
        dataSource={sortedTransactions}
        columns={columns}
        rowKey={(record, index) => index}
        pagination={{ pageSize: 8 }}
      />
    </div>
    </div>
  );
};

export default TransactionsTable;
