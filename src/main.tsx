import './style.css'
import {createRoot} from "react-dom/client";
import App from "./app/app";
import {ContragentApiContextProvider} from "./app/hooks/ContragentApiProvider";

const rootElement = document.getElementById('root');

const root = createRoot(rootElement)
root.render(
    <ContragentApiContextProvider>
        <App/>
    </ContragentApiContextProvider>
);