import { defineStore } from 'pinia'

export const useStoreNotes = defineStore('storeNotes', {
    state: () => {
        return {
            notes: [
                {
                    id: "id1",
                    content:
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut placeat quae hic ducimus quod laborum natus eius dolor error, commodi voluptates, enim labore ipsa maxime molestias illum incidunt fuga. Ut.",
                },
                {
                    id: "id2",
                    content: "Note #2",
                },
            ]
        }
    },
    actions: {
        addNote(newNoteContent) {
            let currentDate = new Date().getTime();
            let id = currentDate.toString();

            let note = {
                id: id,
                content: newNoteContent,
            };

            this.notes.unshift(note);

        },
        deleteNote(idToDelete) {
            this.notes = this.notes.filter(note => note.id !== idToDelete);
        },
        updateNote(id, content) {
            let index = this.notes.findIndex(note => note.id === id);
            this.notes[index].content = content;
        }
    },
    getters: {
        getNoteContent: (state) => {
            return (id) => {
                return state.notes.filter(note => {return note.id === id})[0].content;
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