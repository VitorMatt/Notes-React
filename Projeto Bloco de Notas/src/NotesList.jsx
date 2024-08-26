import { useState, useEffect } from 'react';
import Icon from './assets/icon notes.webp';
import SecondIcon from './assets/SecondIcon notes.png'
import IconChecked from './assets/checked.png';
import './NotesList.css';

function NotesList() {
    
    const notesLocalStorage = JSON.parse(localStorage.getItem('Notes'));

    const [notes, setNotes] = useState(notesLocalStorage ? notesLocalStorage : []);
    const [newNote, setNewNote] = useState('');

    useEffect(()=>{

        localStorage.setItem('Notes', JSON.stringify(notes));
    }, [notes]);

    function updateNotes(form) {

        form.preventDefault();

        if (!newNote) {

            return;
        }

        setNotes([...notes, {description: newNote, isDone: false}]);
        setNewNote('');
        document.getElementById('inpt').focus();
    }

    function markDone(index) {

        const notesAux = [...notes];
        notesAux[index].isDone = !notesAux[index].isDone;
        setNotes(notesAux);
    }

    function deleteNote(index) {

        const notesAux = [...notes];
        notesAux.splice(index, 1);
        setNotes(notesAux);
    }

    function deleteAll() {

        setNotes([]);
    }

    return(

        <>
        <div>
            <div className="title">
                <img className="icon" src={Icon} />
                <h1>Notes</h1>
            </div>
            <form onSubmit={updateNotes}>
                <input 
                    type="text" 
                    id="inpt"
                    value={newNote}
                    onChange={(e)=> { setNewNote(e.target.value) }}
                    placeholder="Adicione uma nota"
                />

                <button type="submit">Add</button>
            </form>
            <div className="allNotes">
            {
                notes.length < 1
                ?
                <div className="notes">
                    <img src={SecondIcon} />
                    <span>Ainda não há notas</span>
                </div>
                :
                notes.map((item, index)=>(

                    <div
                        key={index}
                        className={item.isDone ? "noteDone" : "note"}
                        >
                        
                        <span>{item.description}</span>
                        {
                            !item.isDone
                            ?
                            <button onClick={()=> markDone(index)}>Done</button>
                            :
                            <img onClick={()=>markDone(index)} src={IconChecked} />
                        }
                        <button onClick={()=> deleteNote(index)}>Delete</button>
                    </div>
                ))
            }
            {
                notes.length > 1 &&
                <button className="deleteAll" onClick={()=>deleteAll()}>Delete All</button>
            }
            </div>
        </div>
        </>
    );
}

export default NotesList;