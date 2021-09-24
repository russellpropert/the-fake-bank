function CreateAccount() {

  const context = useContext(Context);
  let formData = {};

  function handleCreate(event) {
    event.preventDefault();

    const {
      setShowForm,
      errorMessages,
      email,
      password,
      firstName,
      lastName
    } = formData;

    if (Object.keys(errorMessages).length) return;

    // Add user to system
    context.data.users.push(
      {
        userID: context.data.nextUserID, 
        firstName, 
        lastName, 
        email, 
        password, 
        balance: 0
      }
    );

    // Log user add
    createLog(context, 'Account Creation', context.data.nextUserID, null, 0);
    context.data.nextUserID++;
    setShowForm(false);
  }

  return (
    <Card 
      header="Create Account"
      body={
        <BankForm
          form="Create Account"
          onSubmit={handleCreate}
          formData={formData}
          successMessage1={`You have successfully created an account.`}
          successMessage2={`Would you like to create another account?`}
          successButton="Create Another Account"
        />
      }
    />
  );
  
}