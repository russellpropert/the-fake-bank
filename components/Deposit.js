function Deposit() {

  const context = useContext(Context);
  let formData = {};
  const userIndex = context.userIndex;

  function handleDeposit(event) {
    event.preventDefault();

    const {
      setShowForm,
      errorMessages,
      amount
    } = formData;

    if (errorMessages.deposit) return;

    // Deposit Money
    context.data.users[userIndex].balance += Number(amount);

    // Log Withdraw
    context.createLog(context, 'Deposit', context.currentUser.userID, amount, context.data.users[userIndex].balance);

    setShowForm(false);
  }

  return (
    <Card
      header="Deposit"
      body={
        <BankForm 
        form="Deposit"
        errorName='deposit'
        onSubmit={handleDeposit}
        formData={formData}
        userIndex={userIndex}
        transactionMessage="Please enter an amount to deposit into your account."
        successMessage1="Your new ballance is: $"
        successMessage2="Would you like to make another deposit?"
        successButton="Make Another Deposit"
        />
      }
    />
  );
  
}