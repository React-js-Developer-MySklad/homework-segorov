import './style.css'
import {createRoot} from "react-dom/client";
import Button from './components/button/button';

const rootElement = document.getElementById('root');

const root = createRoot(rootElement)
root.render(
 <div className='layout'>
    <Button/>
 </div>
);