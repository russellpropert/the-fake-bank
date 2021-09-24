function Login() {

  const [errorMessages, setErrorMessages]   = useState({});
  const [email, setEmail]                   = useState('');
  const [password, setPassword]             = useState('');
  const context = useContext(Context);

  let errorMessagesFromValidate = {};

  function createError(name, message) {
    errorMessagesFromValidate[name] = message;
  }

  function clearForm() {
    setEmail('');
    setPassword('');
  }

  function handleLogin(event) {
    event.preventDefault();

    // Set current user
    const user = context.data.users.find(user => user.email === email && user.password === password);
    context.setCurrentUser(user ? user : null);

    // Log if successful
    if (user) {
      context.createLog(context, 'Login', user.userID, null, null);
    }

    // Set error if user does not exist
    if (!user) {
      createError('authenticationFail', 'The email or password is invalid.');
      setErrorMessages(errorMessagesFromValidate);
      setTimeout(() => setErrorMessages({}), 3000);
      clearForm();
      return;
    }

    clearForm();
    setErrorMessages(false);
  }

  return (
    <Card 
      header="Login"
      body={context.currentUser === null ? (
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input
            className="form-control"
            // required
            autoFocus
            type="email"
            name="email"
            id="email"
            value={email}
            autoComplete="email"
            onChange={(event) => setEmail(event.currentTarget.value)}
          ></input>
          <div className="error-message">&nbsp;</div>

          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            // requird
            type="password"
            name="current-password"
            id="current-password"
            value={password}
            autoComplete="current-password"
            onChange={(event) => setPassword(event.currentTarget.value)}
          ></input>
          <div className="error-message">&nbsp;</div>

          <div>
            <button style={{display: "inline-block"}}
              type="submit"
              className={(!email || !password) ? "btn btn-primary disabled" : 'btn btn-primary'}
            >Login</button>
            {errorMessages.authenticationFail ? <div style={{display: "inline-block", margin: "0 20px"}} className="error-message align-middle">{errorMessages.authenticationFail}</div> : <div style={{display: "inline-block"}} className="error-message">&nbsp;</div>}
          </div>
        </form>
      ) : (
          <h5>Welcome, {context.currentUser.firstName}. You are now logged in.</h5>
      )}
    />
  );
  
}