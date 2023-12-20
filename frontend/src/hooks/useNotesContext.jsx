import { useContext } from "react";
import { NotesContext } from "../context/notesContext";

export const useNotesContext = () => {
    const context = useContext(NotesContext)
    
    if (!context) {
        throw Error('useNotesContext must be used inside an notesContextProvider.')   
    }
    
    return context
}