function AllData() {

  const context = useContext(Context);

  return (
    <Card
      header="All Data"
      body={
        <div className="contianer">

          {/* Users */}
          <h4>List Of Users</h4>
          {context.data.users.map(user => 
            <div key={user.userID}>
              <h5>User ID: {user.userID}</h5>
              <ul style={{listStyleType: "none", paddingLeft: "10px"}}>
                <li>First Name: {user.firstName}</li>
                <li>Last Name: {user.lastName}</li>
                <li>Email Address: {user.email}</li>
                <li>Password: {user.password}</li>
                <li>Balance: ${user.balance}</li>
              </ul>
            </div>
          )}
          <br />
          
          {/* logs */}
          <h4>Transaction logs</h4>
          {context.data.logs.map(logs => 
            <div key={logs.transactionID}>
              <h5>Transaction Number: {logs.transactionID}</h5>
              <ul style={{listStyleType: "none", paddingLeft: "10px"}}>
                <li>Date: {logs.transactionDate}</li>
                <li>Time: {logs.transactionTime}</li>
                <li>Transaction Type: {logs.transactionType}</li>
                <li>User ID: {logs.userID}</li>
                {(logs.transactionType === 'Deposit' || logs.transactionType === 'Withdraw') && 
                  <li>Amount: ${logs.amount}</li>}
                {(logs.transactionType === 'Deposit' || logs.transactionType === 'Withdraw' || logs.transactionType === 'Account Creation') && 
                  <li>Balance: ${logs.balance}</li>}
              </ul>
            </div>
          )}          

        </div>
      }
    />
  );

}