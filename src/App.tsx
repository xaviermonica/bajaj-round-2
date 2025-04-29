import React, { useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import DynamicForm from './components/DynamicForm';
import { getForm } from './services/api';
import { User, FormResponse } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<FormResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleLoginSuccess = async (loggedInUser: User) => {
    setUser(loggedInUser);
    setLoading(true);
    setError('');

    try {
      const formResponse = await getForm(loggedInUser.rollNumber);
      setFormData(formResponse);
    } catch (err) {
      setError('Failed to fetch form data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dynamic Form Application</h1>
      </header>
      <main>
        {!user ? (
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        ) : (
          <div className="form-container">
            {loading && <div className="loading">Loading form...</div>}
            {error && <div className="error">{error}</div>}
            {formData && <DynamicForm formData={formData} />}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
