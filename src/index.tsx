/* @refresh reload */
import { render } from 'solid-js/web'
import './index.css'
import App from './App.tsx'

const root = document.getElementById('root')
if (root) {
  root.className = 'min-h-screen bg-neutral-900 w-full'
  document.body.className = 'bg-neutral-900 min-h-screen'
  document.documentElement.className = 'bg-neutral-900 min-h-screen overscroll-y-none'
}

render(() => <App />, root!)
