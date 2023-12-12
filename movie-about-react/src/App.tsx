import { BrowserRouter } from 'react-router-dom'
import Main from './main-app'
import './global.css';
import { AuthProvider } from './store/AuthProvider';
import { DataProvider } from './store/DataProvider';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <Main />
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
