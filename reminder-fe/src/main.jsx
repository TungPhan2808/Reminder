import 'regenerator-runtime/runtime'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AppProvider from './store/AppProvider.jsx'
import { SnackbarProvider } from 'notistack'

ReactDOM.createRoot(document.getElementById('root')).render(
   <BrowserRouter>
      <AppProvider>
         <SnackbarProvider
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            autoHideDuration={3000}
         >
            <App />
         </SnackbarProvider>
      </AppProvider>
   </BrowserRouter>
)
