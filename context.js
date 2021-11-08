const {HashRouter, Link, Route} = ReactRouterDOM;
const {createContext, useContext, useState, useEffect} = React;

const Context = createContext(null);

let data = {
  nextUserID: 2,
  users: [
    {
      userID: 0,
      firstName: 'Tester',
      lastName: 'Lastname',
      email: 'tester@test.com',
      password: 'tester1234',
      balance: 0
    },
    {
      userID: 1,
      firstName: 'User',
      lastName: 'Lastname',
      email: 'user@test.com',
      password: 'user1234',
      balance: 0
    }
  ],
  nextTransactionID: 2,
  logs: [
    {
      transactionID: 0,
      transactionDate: '2021-09-22',
      transactionTime: '12:59:23',
      transactionType: 'Account Creation',
      userID: 0,
      amount: null,
      balance: 0
    },
    {
      transactionID: 1,
      transactionDate: '2021-09-22',
      transactionTime: '13:05:52',
      transactionType: 'Account Creation',
      userID: 1,
      amount: null,
      balance: 0
    }    
  ]
}


function createLog(context, transactionType, userID, amount, balance) {
  const dateTime = new Date();
  context.data.logs.push(
    {
      transactionID: context.data.nextTransactionID,
      transactionDate: `${dateTime.getMonth() + 1}/${dateTime.getDate()}/${dateTime.getFullYear()}`,
      transactionTime: `${`0${dateTime.getHours()}`.slice(-2)}:${`0${dateTime.getMinutes()}`.slice(-2)}:${`0${dateTime.getSeconds()}`.slice(-2)}`,
      transactionType: transactionType,
      userID: userID,
      amount: amount,
      balance: balance
    }
  );

  context.data.nextTransactionID++;
}

function Card(props) {

  function headerClasses() {
    const bg = props.headerColor ? ` bg-${props.headerColor}` : ' bg-primary';
    const txt = props.headerTxtColor ? ` text-${props.headerTxtColor}` : ' text-light';
    return `card-header${bg}${txt}`
  }

  function mainClasses() {
    const bg = props.bgColor ? ` bg-${props.bgcClor}` : ' bg-white';
    const txt = props.txtColor ? ` text-${props.txtColor}` : ' text-black';
    return `card mb-3${bg}${txt}`
  }

  return (
    <div className={mainClasses()} style={{maxWidth: "800px", margin: "40px auto 0"}}>
      <div className={headerClasses()}>{props.header}</div>
      <div className="card-body">
        {props.title && (<h5 className="card-title">{props.title}</h5>)}
        {props.text && (<h5 className="card-text">{props.text}</h5>)}
        {props.body}
      </div>
    </div>
  );
}

function BankForm(props) {

  const [showForm, setShowForm]             = useState(true);
  const [errorMessages, setErrorMessages]   = useState({});

  const [email, setEmail]                   = useState('');
  const [password, setPassword]             = useState('');
  const [firstName, setFirstName]           = useState('');
  const [lastName, setLastName]             = useState('');

  const [amount, setAmount]                 = useState('');

  props.formData.setShowForm = setShowForm;
  props.formData.errorMessages = errorMessages;
  props.formData.email = email;
  props.formData.password = password;
  props.formData.firstName = firstName;
  props.formData.lastName = lastName;
  props.formData.amount = amount;
  

  let errorMessagesFromValidate = {};

  function createError(name, message) {
    errorMessagesFromValidate[name] = message;
  }

  function validate(field, name) {
    if (name === 'password' && field.length < 8) createError(name, 'Choose a password with at least 8 characters.');
    if ((name === 'firstName' || name === 'lastName') && field.length < 2) createError(name, 'Names must have at least two characters.');
    if ((name === 'firstName' || name === 'lastName') && !field.match(/^[A-Za-z\s]+$/)) createError(name, 'Names can only contain letters. Spaces are allowed.');
    if (name === 'email' && !field.match(/^.+[@]/)) createError(name, 'Please include the @ symbol.');
    if (name === 'email' && field.match(/^[@]/)) createError(name, 'Cannot begin with @.');
    if (name === 'email' && field.match(/^.+[@]$/)) createError(name, 'Please include a domain.');
    if (name === 'email' && data.users.find(user => user.email === field)) createError(name, 'An account with that email already exists.');
    if ((name === 'email' || name === 'password' || name === 'firstName' || name === 'lastName') && !field) createError(name, 'This field cannot be blank.');

    if ((name === 'deposit' || name === 'withdraw') && isNaN(Number(field))) createError(name, 'Only numbers can be endered');
    if ((name === 'deposit' || name === 'withdraw') && field < 1) createError(name, 'At least one dollar needs to be entered.');
    if ((name === 'withdraw') && amount > data.users[props.userIndex].balance) createError(name, 'The amount you have entered exceeds your account balance.');
    if ((name === 'deposit' || name === 'withdraw') && !field) createError(name, false);

  }

  useEffect (() => {
    validate(email, 'email');
    validate(password, 'password');
    validate(firstName, 'firstName');
    validate(lastName, 'lastName');
    validate(amount, props.errorName)
    setErrorMessages(errorMessagesFromValidate);
  }, [email, password, firstName, lastName, amount]);

  function isError (field) {
    if(field === 'email' && errorMessages.email) return true;
    if(field === 'password' && errorMessages.password) return true;
    if(field === 'firstName' && errorMessages.firstName) return true;
    if(field === 'lastName' && errorMessages.lastName) return true;
    if(field === 'deposit' && errorMessages.deposit) return true;
    if(field === 'withdraw' && errorMessages.withdraw) return true;
    return false;
  }

  function inputDisabled () {
    if (props.form === 'Withdraw' && data.users[props.userIndex].balance <= 0) return true;
    return false;
  }

  function buttonDisabled() {
    if (props.form === 'Create Account' && Object.keys(errorMessages).length) return true;
    if (props.form === 'Deposit' && (!amount || errorMessages.deposit)) return true;
    if (props.form === 'Withdraw' && (!amount || errorMessages.withdraw || data.users[props.userIndex].balance <= 0)) return true;
    return false;
  }

  function clearForm() {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setAmount('')
    setErrorMessages(false);
    setShowForm(true);
  }

  return (
    <>
      {showForm ? (
        <form onSubmit={props.onSubmit}>

          {props.form === 'Create Account' &&
            <>
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                autoFocus
                // required
                type="email"
                name="email"
                id="email"
                value={email}
                autoComplete="email"
                onChange={(event) => setEmail(event.currentTarget.value)}
              ></input>
              {isError('email') ? <div className="message">{errorMessages.email}</div> : <div className="message">&nbsp;</div>}
            </>
          }

          {props.form === 'Create Account' &&
            <>
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                // required
                type="password"
                name="new-password"
                id="new-password"
                value={password}
                autoComplete="new-password"
                onChange={(event) => setPassword(event.currentTarget.value)}
              ></input>
              {isError('password') ? <div className="message">{errorMessages.password}</div> : <div className="message">&nbsp;</div>}
            </>
          }

          {props.form === 'Create Account' &&
            <>
              <label>First Name</label>
              <input
                className="form-control"
                // required
                type="text"
                name="firstName"
                id="firstName"
                value={firstName}
                onChange={(event) => setFirstName(event.currentTarget.value)}
              ></input>
              {isError('firstName') ? <div className="message">{errorMessages.firstName}</div> : <div className="message">&nbsp;</div>}
            </>
          }

          {props.form === 'Create Account' &&
            <>
              <label>Last Name</label>
              <input
                className="form-control"
                // required
                type="text"
                name="lastName"
                id="lastName"
                id="lastName"
                value={lastName}
                onChange={(event) => setLastName(event.currentTarget.value)}
              ></input>
              {isError('lastName') ? <div className="message">{errorMessages.lastName}</div> : <div className="message">&nbsp;</div>}
            </>
          }

          {(props.form === 'Deposit' || props.form === 'Withdraw') &&
            <>
              <h5>Your total balance is ${data.users[props.userIndex].balance}</h5>
              <h5>{props.transactionMessage}</h5>

              <label htmlFor="depositAmount">{props.form} Amount</label>
              <input
                className="form-control"
                autoFocus
                // required
                type="text"
                name="amount"
                id="amount"
                value={amount}
                onChange={(event) => setAmount(event.currentTarget.value)}
                disabled={inputDisabled()}
              />
              {isError(props.errorName) ? <div className='error-message margin-bottom'>{errorMessages[props.errorName]}</div> : <div className='error-message margin-bottom'>&nbsp;</div>}
            </>
          }

          <button
            type="submit"
            className={buttonDisabled() ? "btn btn-primary disabled" : "btn btn-primary"}
          >{props.form}</button>
        </form>

      ) : (

        <>
          {props.form === 'Deposit' || props.form === 'Withdraw' ? 
            <h5>{props.successMessage1 + data.users[props.userIndex].balance}</h5> :
            <h5>{props.successMessage1}</h5>}
          <h5>{props.successMessage2}</h5>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={clearForm}
          >{props.successButton}</button>
        </>
        
      )}
    </>
  );

}