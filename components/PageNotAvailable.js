function PageNotAvailable() {

  const location = window.location.hash;

  return (
    <Card
      header={location === "#/CreateAccount" ? 
        "Please log out" : 
        "Please log in"}
      body={location === "#/CreateAccount" ? 
        "This page is not available while logged in. Please log out to create an account." : 
        "You must log into the site before using this page."}
    />
  );
  
}