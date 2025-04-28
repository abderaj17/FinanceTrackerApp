import React from "react";
import { Table, Select, Radio } from "antd";
// import search from "../../assets/search.svg";

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
    <div
    style={{
      width: "90vw",
      padding: "0rem 2rem",
    }}
    >
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "1rem",
        alignItems: "center",
        marginBottom: "1rem",
      }}>
      <div className="input-flex">
        <img src={"https://tse1.mm.bing.net/th/id/OIP.Wg7d9py54h7ViyCEq60PcgHaHa?rs=1&pid=ImgDetMain"} 
        width="16" alt=""
        />
         <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by Name"
      />
        </div>
     
      <Select
        className="select-input"
        onChange={(value) => setTypeFilter(value)}
        value={typeFilter}
        placeholder="Filter"
        allowClear
        style={{ marginLeft: "1rem", marginRight: "1rem" }}
      >
        <Option value="">All</Option>
        <Option value="income">Income</Option>
        <Option value="expense">Expense</Option>
      </Select>
      <Radio.Group
        className="input-radio"
        onChange={(e) => setSortKey(e.target.value)}
        value={sortKey}
      >
        <Radio.Button value="">No Sort</Radio.Button>
        <Radio.Button value="date">Sort by Date</Radio.Button>
        <Radio.Button value="amount">Sort by Amount</Radio.Button>
      </Radio.Group>
      <Table
        dataSource={sortedTransactions}
        columns={columns}
        rowKey={(record, index) => index}
      />
    </div>
    </div>
  );
};

export default TransactionsTable;
