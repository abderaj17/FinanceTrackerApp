import React, { useState } from "react";
import Cards from "../components/Cards";
import Header from "../components/Header";
import { Modal } from "antd";

const DashboardPage = () => {
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };
  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };
  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };
  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };
  return (
    <div>
      <Header />
      <Cards
        showExpenseModal={showExpenseModal}
        showIncomeModal={showIncomeModal}
      />
      <Modal 
      style={{fontWeight: 600}}
      title="Add Expense"
      visible={isIncomeModalVisible}
      onCancel={handleIncomeCancel}
      footer={null}
      >Income</Modal>
      <Modal 
      style={{fontWeight: 600}}
      title="Add Income"
      visible={isExpenseModalVisible}
      onCancel={handleExpenseCancel}
      footer={null}  
      >Expense</Modal>
    </div>
  );
};

export default DashboardPage;
