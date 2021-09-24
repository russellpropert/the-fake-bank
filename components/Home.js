
function Home() {

  const context = useContext(Context);
  let userIndex;
  if (context.currentUser !== null) userIndex = context.data.users.findIndex(user => user.userID === context.currentUser.userID);

  return (
    <Card 
      bgColor="light"
      txtColor="dark"
      headerColor="primary"
      headerTxtColor="light"
      header="The Fake Bank"
      title={context.currentUser !== null ? `Welcome, ${context.currentUser.firstName} ${context.currentUser.lastName}` : "Welcome to The Fake Bank!"}
      text={context.currentUser !== null ?
         `Your current balance is $${context.data.users[userIndex].balance}. Click on Deposit to put money in your account and Withdraw
         to take some out. You can see all of the site's users and transactions in All Data.`:
        `This is page demonstrates a single page application created with React. Click on Create Account in the menu to create your account 
         and then log in. You’ll be given options to Deposit and Withdraw money and to view All Data to see all of the site's 
         users and transactions.`
      }

      body={<img src="bank.png" className="img-fluid mx-auto d-block" alt="bank image" style={{margin: '40px'}} />}
    />
  );
  
}


