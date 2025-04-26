import React, { useContext } from 'react';

function Home() {
  // const { sessionId } = useContext(SessionContext); // Uncomment if you're using context
 // Log sessionId for debugging

  return (
    <>
      <h1>{localStorage.getItem('session_user_id')}</h1>
    </>
  );
}

export default Home;
