import React from 'react';

const NoTransactions = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flexDirection: "column",
        marginBottom: "2rem",
      }}
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
        alt="No Transactions"
        style={{ width: "300px", margin: "4rem", opacity: 0.8 }}
      />
      <p style={{ textAlign: "center", fontSize: "1.2rem" }}>
        You Have No Transactions Currently
      </p>
    </div>
  );
};

export default NoTransactions;

