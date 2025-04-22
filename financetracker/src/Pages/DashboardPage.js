import React, { useState, useEffect } from "react";
import Cards from "../components/Cards";
import Header from "../components/Header";
// import { Modal } from "antd";
import {toast} from 'react-toastify';
import moment from 'moment';
import {useAuthState} from "react-firebase-hooks/auth";
import {addDoc,query, getDocs, collection} from "firebase/firestore"
import {auth, db} from "../firbase";
import AddExpenseModal from "../components/Modals/addExpense";
import AddIncomeModal from "../components/Modals/addIncome";

const DashboardPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    //get all docs from a collection
    fetchTransaction();
  }, []);

  async function fetchTransaction() {
    setLoading(true);
    if(user){
      const  q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      toast.success("Transactions Fetched!");
    };
    setLoading(false);
  }
  return (
    <div>
      <Header />

      {loading ? (<p>Loading...</p>
      ):(
        <>
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
      handleIncomeCancel={handleIncomeCancel}
      onFinish={onFinish}
      />
        </>)}
    </div>
  );
};

export default DashboardPage;
