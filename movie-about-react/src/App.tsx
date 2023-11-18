import { BrowserRouter } from 'react-router-dom'
import Main from './main-app'
import './global.css';

function App() {

  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  )
}

export default App
