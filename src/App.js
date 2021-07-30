import { UserProvider } from './contexts/UserContext';
import Header from './components/Header';
import Container from './components/Container';
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
