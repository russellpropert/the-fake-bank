function Withdraw() {

  const context = useContext(Context);
  let formData = {};
  const userIndex = context.userIndex;

  function handleWithdraw(event) {
    event.preventDefault();

    const {
      setShowForm,
      errorMessages,
      amount
    } = formData;

    if (errorMessages.withdraw) return;

    // Withdraw Money
    context.data.users[userIndex].balance -= Number(amount);;

    // Log Withdraw
    context.createLog(context, 'Withdraw', context.currentUser.userID, amount, context.data.users[userIndex].balance);

    setShowForm(false);
  }

  return (
    <Card
      header="Withdraw"
      body={
        <BankForm 
        form="Withdraw"
        errorName='withdraw'
        onSubmit={handleWithdraw}
        formData={formData}
        userIndex={userIndex}
        transactionMessage={context.data.users[userIndex].balance <= 0 ? 
          "You do not have anything to withdraw. Please deposit money first." :
          "Please enter an amount to withdraw from your account."}
        successMessage1="Your new ballance is: $"
        successMessage2="Would you like to make another withdraw?"
        successButton="Make Another Withdraw"
        />
      }
    />
  );

}