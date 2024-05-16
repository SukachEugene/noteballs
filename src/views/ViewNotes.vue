<template>
  <div class="notes">
    <div class="card has-background-success-dark p-4 mb-5">
      <div class="field">
        <div class="control">
          <textarea
            v-model="newNote"
            class="textarea"
            placeholder="Add a new note"
            ref="newNoteRef"
          ></textarea>
        </div>
      </div>

      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button
            @click="addNote"
            :disabled="!newNote"
            class="button is-link has-background-success"
          >
            Add New Note
          </button>
        </div>
      </div>
    </div>

    <Note v-for="note in storeNotes.notes" :key="note.id" :note="note" />

  </div>
</template>

<script setup>
/**
 * imports
 */
import { ref } from "vue";
import Note from "@/components/Notes/Note.vue";
import { useStoreNotes } from "@/stores/storeNotes.js";

/**
 * store
 */
const storeNotes = useStoreNotes();


/**
 * notes
 */
const newNote = ref("");
const newNoteRef = ref(null);

const addNote = () => {
  storeNotes.addNote(newNote.value);
  // let currentDate = new Date().getTime();
  // let id = currentDate.toString();

  // let note = {
  //   id: id,
  //   content: newNote.value,
  // };

  // notes.value.unshift(note);
  newNote.value = "";
  newNoteRef.value.focus();
};
</script>

<style scoped>
.textarea {
  resize: none;
}
.textarea:focus {
  outline: 4px solid rgb(33, 150, 95);
}
</style>
