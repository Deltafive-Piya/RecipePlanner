//? Component- Delete Button provides the Card with delete functionality (shown via Trash Icon) and handling (via handleDelete)

import Trash from "../icons/Trash";
import { db } from "../appwrite/databases";
import { useContext } from "react";
import { NotesContext } from "../context/NoteContext";

const DeleteButton = ({ noteId }) => { //?What note are we deleting?

    const {setNotes} = useContext(NotesContext)

    const handleDelete = async () => {
        db.notes.delete(noteId); //? db delete handler
        console.log('Delete Clicked'); //? troubleshooter
        setNotes((prevState) =>
            prevState.filter((note) => note.$id !== noteId)
        );
    };

    return (
        <div onClick={handleDelete}>
            <Trash />
        </div>
    );
};

export default DeleteButton;