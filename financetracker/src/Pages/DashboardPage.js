import React, { useState, useEffect } from "react";
import Cards from "../components/Cards";
import Header from "../components/Header";
import { toast } from "react-toastify";
import ChartComponent from "../components/Charts";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, query, getDocs, collection } from "firebase/firestore";
import { auth, db } from "../firbase";
import AddExpenseModal from "../components/Modals/addExpense";
import AddIncomeModal from "../components/Modals/addIncome";
import TransactionsTable from "../components/TransactionsTable";
// import NoTransactions from "../components/NoTransactions";
import NoTransactions from './../components/NoTransactions.js/index';



const DashboardPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const showExpenseModal = () => setIsExpenseModalVisible(true);
  const showIncomeModal = () => setIsIncomeModalVisible(true);
  const handleExpenseCancel = () => setIsExpenseModalVisible(false);
  const handleIncomeCancel = () => setIsIncomeModalVisible(false);

  const onFinish = (values, type) => {
    const newTransaction = {
      type,
      date: values.date ? values.date.toISOString() : new Date().toISOString(),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    addTransaction(newTransaction);
  };

  async function addTransaction(transaction, many = false) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      if (!many) toast.success("Transaction Added!");
      setTransactions((prev) => [...prev, transaction]);
      // calculateBalance([...transactions, transaction]);
    } catch (e) {
      console.error("Error adding document:", e);
      if (!many) toast.error("Couldn't add transaction");
    }
  }

  async function fetchTransactions() {
    setLoading(true);
    try {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      const transactionsArray = querySnapshot.docs.map((doc) => doc.data());
      setTransactions(transactionsArray);
      calculateBalance(transactionsArray);
      toast.success("Transactions Fetched!");
    } catch (e) {
      toast.error("Failed to fetch transactions");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  function calculateBalance(data = transactions) {
    let incomeTotal = 0;
    let expenseTotal = 0;

    data.forEach((transaction) => {
      if (transaction.type === "income") incomeTotal += transaction.amount;
      else expenseTotal += transaction.amount;
    });

    setIncome(incomeTotal);
    setExpense(expenseTotal);
    setTotalBalance(incomeTotal - expenseTotal);
  }

  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  // useEffect(() => {
  //   calculateBalance(transactions);
  // }, [transactions]);

  return (
    <div>
      <Header />
      {loading ? (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</p>
      ) : (
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
          <TransactionsTable
            transactions={transactions}
            addTransaction={addTransaction}
            fetchTransactions={fetchTransactions}
          />
        </>
      )}
    </div>
  );
};

export default DashboardPage;
