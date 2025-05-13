
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add dark mode class based on user preference
if (localStorage.getItem('app-theme') === 'dark' || 
    (!localStorage.getItem('app-theme') && 
     window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
}

createRoot(document.getElementById("root")!).render(<App />);
