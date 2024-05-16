<template>
  <div class="card has-background-success-dark p-4 mb-5">
    <div class="field">
      <div class="control">
        <textarea
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          class="textarea"
          placeholder="Add a new note"
          ref="textareaRef"
        ></textarea>
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot name="buttons"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * imports
 */
 import { ref } from "vue";

/**
 * props
 */
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

/**
 * emits
 */
const emit = defineEmits(['update:modelValue'])

/**
 * focus textarea
 */
const textareaRef = ref(null)

const focusTextarea = () => {
  textareaRef.value.focus();
}

defineExpose({
  focusTextarea
})
</script>

<style scoped>
.textarea {
  resize: none;
}
.textarea:focus {
  outline: 4px solid rgb(33, 150, 95);
}
</style>
