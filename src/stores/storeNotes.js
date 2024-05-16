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
            this.notes = this.notes.filter(note => { return note.id !== idToDelete })
        }
    }
})