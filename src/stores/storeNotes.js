import { defineStore } from 'pinia'
import { db } from '@/js/firebase';
import { collection, onSnapshot, doc, addDoc, deleteDoc, updateDoc, query, orderBy } from "firebase/firestore";
import { useStoreAuth } from '@/stores/storeAuth';

let notesCollectionRef = null;
let notesCollectionQuery = null;

let getNotesSnapshot = null;

export const useStoreNotes = defineStore('storeNotes', {
    state: () => {
        return {
            notes: [
                // {
                //     id: "id1",
                //     content:
                //         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut placeat quae hic ducimus quod laborum natus eius dolor error, commodi voluptates, enim labore ipsa maxime molestias illum incidunt fuga. Ut.",
                // },
                // {
                //     id: "id2",
                //     content: "Note #2",
                // },
            ],
            notesLoaded: false
        }
    },
    actions: {
        init() {
            const storeAuth = useStoreAuth();

            notesCollectionRef = collection(db, "users", storeAuth.user.id, 'notes');
            notesCollectionQuery = query(notesCollectionRef, orderBy("date", "desc"))
            this.getNotes();
        },
        async getNotes() {
            this.notesLoaded = false;

            if (getNotesSnapshot) {
                // unsubscribe from any active listener
                getNotesSnapshot();
            }
            getNotesSnapshot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
                let notes = []
                querySnapshot.forEach((doc) => {
                    let note = {
                        id: doc.id,
                        content: doc.data().content,
                        date: doc.data().date
                    }
                    notes.push(note);
                });

                this.notes = notes
                this.notesLoaded = true;
            }, error => {
                console.log(error.message);
            });
        },
        clearNotes() {
            this.notes = [];
            if (getNotesSnapshot) {
                // unsubscribe from any active listener
                getNotesSnapshot();
            }
        },
        async addNote(newNoteContent) {
            let currentDate = new Date().getTime();
            let date = currentDate.toString();

            // await setDoc(doc(notesCollectionRef, id), {
            //     id,
            //     content: newNoteContent
            // });

            await addDoc(notesCollectionRef, {
                content: newNoteContent,
                date
            });

        },
        async deleteNote(idToDelete) {
            // this.notes = this.notes.filter(note => note.id !== idToDelete);
            await deleteDoc(doc(notesCollectionRef, idToDelete));
        },
        async updateNote(id, content) {
            // let index = this.notes.findIndex(note => note.id === id);
            // this.notes[index].content = content;

            await updateDoc(doc(notesCollectionRef, id), {
                content: content
            });
        }
    },
    getters: {
        getNoteContent: (state) => {
            return (id) => {
                return state.notes.filter(note => { return note.id === id })[0].content;
            }
        },
        totalNotesCount: (state) => {
            return state.notes.length
        },
        totalCharactersCount: (state) => {
            let count = 0;
            state.notes.forEach(note => {
                count += note.content.length;
            });
            return count;
        }
    }
})