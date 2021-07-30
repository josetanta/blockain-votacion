import { UserProvider } from './contexts/UserContext';
import Header from './Header';
import Container from './Container';
import './App.css';

function App() {
  return (
    <UserProvider>
      <Header />
      <Container />
    </UserProvider>
  );
}

export default App;
