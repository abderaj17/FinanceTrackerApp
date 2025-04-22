import React, { useState } from "react";
import Cards from "../components/Cards";
import Header from "../components/Header";
// import { Modal } from "antd";
import {useAuthState} from "react-firebase-hooks/auth";
import {addDoc, collection} from "firebase/firestore"
import {auth, db} from "../firbase";
import AddExpenseModal from "../components/Modals/addExpense";
import AddIncomeModal from "../components/Modals/addIncome";

const DashboardPage = () => {
  const [user] = useAuthState(auth);
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

  const onFinish = (values, type) => {
   const newTransaction= {
    type:type,
    date:moment(values.date).format("YYYY-MM-DD"),
    amount: parseFloat(values.amount),
    tag: values.tag,
    name: values.name,
   };
   addTransaction(newTransaction);
  }

  async function  addTransaction(transaction) {
    // Logic to add transaction to the state or database
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transaction`),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);

      toast.success("Transaction Added!");
    } catch (e) {
      console.error("Error adding document:" , e);
        toast.error("Couldn't add transaction");

    }
  }
  return (
    <div>
      <Header />
      <Cards
        showExpenseModal={showExpenseModal}
        showIncomeModal={showIncomeModal}
      />

      <AddExpenseModal
      isExpenseModalVisible={isExpenseModalVisible}
      handleExpenseCancel={handleExpenseCancel}
      onFinish={onFinish}
      />
      <AddIncomeModal 
      isIncomeModalVisible={isIncomeModalVisible}
      handleExpenseCancel={handleIncomeCancel}
      onFinish={onFinish}
      />
    </div>
  );
};

export default DashboardPage;
