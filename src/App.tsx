import './styles.css'
import NavLayout from './components/NavLayout'
import AppLayout from './components/AppLayout'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
function App() {
  return (
    <div className="font-mono">
      <NavLayout>
        <DndProvider backend={HTML5Backend}>
          <AppLayout />
        </DndProvider>
      </NavLayout>
    </div>
  )
}

export default App
