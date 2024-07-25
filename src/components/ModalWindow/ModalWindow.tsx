import classes from './ModalWindow.module.scss'

import closeImg from './cancel.png'

interface IModalWindowProps {
    visible : boolean;
    setVisible : React.Dispatch<React.SetStateAction<boolean>>;
    children : React.ReactNode
}
export default function ModalWindow({ visible, setVisible, children}: IModalWindowProps) {

    let rootClasses = [classes.ModalWindow];

    if (visible) {
        rootClasses.push(classes.active)
    }
    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={classes.modalContent} onClick={(event) => { event.stopPropagation() }}>
                <img src={closeImg} className={classes.modalContent_visible} onClick={() => setVisible(false)} />
                {
                    children
                }
            </div>
        </div>
    );
}