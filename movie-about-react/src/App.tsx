import { BrowserRouter } from 'react-router-dom'
import Main from './main-app'
import './global.css';
import { AuthProvider } from './store/AuthProvider';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
