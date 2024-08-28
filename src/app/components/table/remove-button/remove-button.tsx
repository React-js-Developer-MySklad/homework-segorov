import './remove-button.css';
import {MouseEventHandler} from 'react';

type RemoveButtonProps = {
    onClick: MouseEventHandler<HTMLButtonElement>;
};

const RemoveButton = ({onClick}: RemoveButtonProps) => {
    return(
        <button type="button" onClick={onClick}>remove</button>
    );
};

export default RemoveButton;