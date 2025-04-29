import React, { useState, useEffect } from "react";
import Cards from "../components/Cards";
import Header from "../components/Header";
import {toast} from 'react-toastify';
import moment from 'moment';
import {useAuthState} from "react-firebase-hooks/auth";
import {addDoc,query, getDocs, collection} from "firebase/firestore"
import {auth, db} from "../firbase";
import AddExpenseModal from "../components/Modals/addExpense";
import AddIncomeModal from "../components/Modals/addIncome";
import TransactionsTable from "../components/TransactionsTable";

const DashboardPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

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
    date: values.date ? values.date.toISOString() : new Date().toISOString(),
    amount: parseFloat(values.amount),
    tag: values.tag,
    name: values.name,
   };
   addTransaction(newTransaction);
  }

  async function  addTransaction(transaction, many) {
    // Logic to add transaction to the state or database
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);

      if(!many) toast.success("Transaction Added!");
     
      setTransactions((prev) => [...prev, transaction]);
      calculateBalance();
    } catch (e) {
      console.error("Error adding document:" , e);
      if(!many)  toast.error("Couldn't add transaction");

    }
  }

  useEffect(() => {
    //get all docs from a collection
    if(user){
    fetchTransaction();
    }
  }, [user]);

useEffect(() => {
  calculateBalance();
}, [transactions]);

  function calculateBalance(){
    if(!transactions || transactions.length === 0){
    setIncome(0);
    setExpense(0);
    setTotalBalance(0);
    return;
    }
let incomeTotal = 0;
let exprenseTotal = 0;
 transactions.forEach((transaction) => {
  if(transaction.type === 'income'){
    incomeTotal += transaction.amount;
  }else{
    exprenseTotal += transaction.amount;
  }
 });
 setIncome(incomeTotal);
 setExpense(exprenseTotal);
 setTotalBalance(incomeTotal - exprenseTotal);
  }

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
        income={income}
        expense={expense}
        totalBalance={totalBalance}
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
      <TransactionsTable transactions={transactions} addTransaction={addTransaction} 
      fetchTransaction={fetchTransaction}
      />
        </>)}
    </div>
  );
};

export default DashboardPage;
