function NavBar() {
  const [urlHash, setUrlHash] = useState(window.location.hash);
  const context = useContext(Context);

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">

      {/* Home */}
      <a 
        className="navbar-brand" 
        href="#/" 
        onClick={() => setUrlHash('#/')} 
        data-toggle="tooltip" 
        data-placement="bottom" 
        title="Home page for The Fake Bank."
        style={{marginLeft: "10px"}}
        >The Fake Bank</a>

      <button 
        className="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarSupportedContent" 
        aria-controls="navbarSupportedContent" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav flex-row flex-wrap me-auto mb-2 mb-md-0">

          {/* Home */}
          <li className="nav-item col-6 col-md-auto">
            <a 
              className={urlHash === "#/" ? "nav-link active" : "nav-link"} 
              href="#/" 
              onClick={() => setUrlHash('#/')} 
              data-toggle="tooltip" 
              data-placement="bottom" 
              title="Home page for The Fake Bank."
              >Home</a>
          </li>

          {/* Deposit */}
          {context.currentUser !== null && (
            <li className="nav-item col-6 col-md-auto">
              <a 
                className={urlHash === "#/Deposit" ? "nav-link active" : "nav-link"} 
                href="#/Deposit" 
                onClick={() => setUrlHash('#/Deposit')} 
                data-toggle="tooltip" 
                data-placement="bottom" 
                title="Deposit money into your account."
              >Deposit</a>
            </li>
          )}

          {/* Withdraw */}
          {context.currentUser !== null && (
            <li className="nav-item col-6 col-md-auto">
              <a 
                className={urlHash === "#/Withdraw" ? "nav-link active" : "nav-link"} 
                href="#/Withdraw" 
                onClick={() => setUrlHash('#/Withdraw')} 
                data-toggle="tooltip" 
                data-placement="bottom" 
                title="Withdraw money from your account."
              >Withdraw</a>
            </li>
          )}

          {/* All Data */}
          {context.currentUser !== null && (
            <li className="nav-item col-6 col-md-auto">
              <a 
                className={urlHash === "#/AllData" ? "nav-link active" : "nav-link"} 
                href="#/AllData" 
                onClick={() => setUrlHash('#/AllData')} 
                data-toggle="tooltip" 
                data-placement="bottom" 
                title="Show all user data for this site."
              >All Data</a>
            </li>
          )}
        </ul>

        <hr className="d-md-none" />
        <ul className="navbar-nav flex-row flex-wrap ms-auto mb-2 mb-md-0">

          {/* Create Account */}
          {context.currentUser === null ? (
          <li className="nav-item col-6 col-md-auto">
            <a 
              className={urlHash === "#/CreateAccount" ? "nav-link active" : "nav-link"} 
              href="#/CreateAccount" 
              onClick={() => setUrlHash('#/CreateAccount')} 
              data-toggle="tooltip" 
              data-placement="bottom" 
              title="Create a user account to log in with."
            >Create Account</a>
          </li>
          ) : (
            <li className="nav-item col-6 col-md-auto">
              <div className="navbar-text" style={{paddingRight: "10px"}}>Welcome, {context.currentUser.firstName}</div>
            </li>
          )}

          {/* Login/Logout */}
          {context.currentUser === null ? (
            <li className="nav-item col-6 col-md-auto">
              <a 
                className={urlHash === "#/Login" ? "nav-link active" : "nav-link"} 
                href="#/Login" 
                onClick={() => setUrlHash('#/Login')} 
                data-toggle="tooltip" 
                data-placement="bottom" 
                title="Log into an account."
              >Login</a>
            </li>
          ) : (
            <li className="nav-item col-6 col-md-auto">
              <a 
                className="nav-link" 
                href="#/Login" 
                onClick={() => {
                  context.createLog(context, 'Logout', context.currentUser.userID, null, null)
                  context.setCurrentUser(null);
                  setUrlHash('#/Login')
                }} 
                data-toggle="tooltip" 
                data-placement="bottom" 
                title="Log out of this account."
              >Logout</a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
  
}