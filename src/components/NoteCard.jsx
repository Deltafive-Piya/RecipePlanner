import {
    useRef, //? reference dom elements w/o rerendering
    useEffect,//? called every livecycle update (for AutoGrow to ensure Card is updating)
    useState
} from "react";
import { db } from "../appwrite/databases";
// import Trash from "../icons/Trash"; within DeleteButton
import DeleteButton from './DeleteButton';
import Spinner from "../icons/Spinner";
import { setNewOffset, autoGrow, setZIndex, bodyParser } from "../utils";
import { useContext } from "react";
import { NotesContext } from "../context/NoteContext";

const NoteCard = ({ note }) => {
    const [saving, setSaving] = useState(false);
    const keyUpTimer = useRef(null);

    const { setSelectedNote } = useContext(NotesContext);
    // const body = JSON.parse(note.body);
    const body = bodyParser(note.body);
    const [position, setPositon] = useState(JSON.parse(note.position))
    const colors = JSON.parse(note.colors);

    let mouseStartPos = { x: 0, y: 0 };
    const cardRef = useRef(null);

    const textAreaRef = useRef(null)

    useEffect(() => {
        autoGrow(textAreaRef)
        setZIndex(cardRef.current); //? zIndex setter for new Instance as soon as the note is rendered out
    }, [])//? empty dependency array; only want one call @first render

    const mouseDown = (e) => { //? Calculating the current card position to the next//
        if (e.target.className === "card-header") { //? only for header will the save trigger
            setZIndex(cardRef.current);
            setSelectedNote(note); //? selected it with the entry-properties attached

            //console.log('mouseDown: saving-trigger check') //? trigger check
            mouseStartPos.x = e.clientX
            mouseStartPos.y = e.clientY

            document.addEventListener('mousemove', mouseMove)
            document.addEventListener('mouseup', mouseUp)
        }
    };

    const mouseUp = () => {
        //console.log('mouseUp: saving-trigger check') //? trigger check
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);

        const newPosition = setNewOffset(cardRef.current); //{x,y}
        saveData("position", newPosition);
    };

    const saveData = async (key, value) => {
        const payload = { [key]: JSON.stringify(value) };
        try {
            await db.notes.update(note.$id, payload);
        } catch (error) {
            console.error(error);
        }
        setSaving(false);  //! As you were
    };

    const handleKeyUp = async () => {
        //? 1 - begin "saving" status
        setSaving(true);  //! Fall in

        //? 2 - If we have a timer id, clear to make room for new timer
        if (keyUpTimer.current) {
            clearTimeout(keyUpTimer.current);
        }

        //? 3 - Set new 2 sec save timer
        keyUpTimer.current = setTimeout(() => {
            saveData("body", textAreaRef.current.value);
        }, 2000);
    };

    const mouseMove = (e) => {
        //1 - Calculate move direction
        let mouseMoveDir = {
            x: mouseStartPos.x - e.clientX,
            y: mouseStartPos.y - e.clientY,
        };

        // console.log('mouseMoveDir:', mouseMoveDir) //trigger check

        //2 - Update start position for next move.
        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;

        const newPosition = setNewOffset(cardRef.current, mouseMoveDir)

        //3 - Update card top and left position.
        setPositon(newPosition);
    }

    return (
        <div
            ref={cardRef}
            className="card"
            style={{
                backgroundColor: colors.colorBody,
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}>
            <div
                onMouseDown={mouseDown}
                className="card-header"
                style={{ backgroundColor: colors.colorHeader }}
            >
                <DeleteButton noteId={note.$id}/>
                {/** -----------------  'Saving' indicator  ----------------- */}
                {saving && (
                <div className="card-saving">
                    <Spinner color={colors.colorText}/>
                    <span style={{ color: colors.colorText }}>AutoSaving...</span>
                </div>
                )};
                {/* -----------------  /'Saving' indicator  ----------------- */}
            </div>

            <div className="card-body">
                <textarea
                    onKeyUp={handleKeyUp}
                    ref={textAreaRef} //? reference it with above textAreaRef.current//
                    style={{ color: colors.colorText }}
                    defaultValue={body}
                    onInput={() => { autoGrow(textAreaRef) }}
                    onFocus={() => { //? textareaZindex
                        setSelectedNote(note);
                        setZIndex(cardRef.current)
                    }}
                ></textarea>
            </div>
        </div>
    );
};

export default NoteCard;
