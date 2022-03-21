import './App.css';
import useLocalStorage from './Hooks/userLocalStorage';
import useUpdateLogger from './Hooks/useUpdateLogger';
import NavBar from './Components/NavBar';

function App() {
  const [name, setName] = useLocalStorage('name', () => '')
  useUpdateLogger(name)

  return (
    <>
    <NavBar />
    </>
    
  )
}

export default App;
