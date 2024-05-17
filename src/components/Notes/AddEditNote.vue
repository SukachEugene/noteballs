<template>
  <div class="card mb-5 p-4" :class="`has-background-${bgColor}-dark`">
  <label v-if="label" class="label has-text-white">{{ label }}</label>
    <div class="field">
      <div class="control">
        <textarea
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          class="textarea"
          :placeholder="placeholder"
          ref="textareaRef"
          maxlength="1000"
          v-autofocus
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
 import { vAutofocus } from "@/directives/vAutofocus";

/**
 * props
 */
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  bgColor: {
    type: String,
    default: 'success'
  },
  placeholder: {
    type: String,
    default: 'Type something...'
  },
  label: {
    type: String,
  }
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

/**
 * directives
 */
// const vAutofocus = {
//   mounted: (el) => {
//     el.focus();
//   }
// }
</script>

<style scoped>
.textarea {
  resize: none;
}
.textarea:focus {
  outline: 4px solid rgb(33, 150, 95);
}
</style>
