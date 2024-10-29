// import { fakeData as notes } from "../assets/fakeData.js";
// import { db } from "../appwrite/databases";
import NoteCard from "../components/NoteCard";
import { useState, useEffect } from "react";
import Controls from "../components/Controls";
import { useContext } from "react";
import  {NotesContext}  from "../context/NoteContext";

const NotesPage = () => {
    const { notes } = useContext(NotesContext);
    return (
        <div>

            {/* QUERY- SELECT * from Recipes */}
            {notes.map((note) => (
                <NoteCard note={note} key={note.$id} />
            ))}

            <Controls />
        </div>
    );
};

export default NotesPage;

// ! Appwrite has a Paywall for >1 DB user