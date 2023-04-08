<template>
  <div class="flex items-center">
    <span :class="`material-icons ${transClass}`">{{ transIcon }}</span>
    <p>{{ transText }}</p>
  </div>
  <div class="flex items-center">
    <p :style="'margin-right:10px; color: ' + transColor">{{ transType }} {{ transCurrent }}</p>
    <button :id="transId" class="transaction__bin" @click="deleteTrans($event)">
      <span class="material-icons">delete</span>
    </button>
  </div>
</template>

<script>
export default {
  /* eslint-disable */
  name: "Transaction",
  props: {
    transClass: {
      type: String,
      default: "",
    },
    transIcon: {
      type: String,
      default: "",
    },
    transColor: {
      type: String,
      default: "",
    },
    transType: {
      type: String,
      default: "",
    },
    transCurrent: {
      type: Number,
      default: 0.00,
    },
    transText: {
      type: String,
      default: "",
    },
    transId: {
      type: Number,
      default: null,
    },
  },
  methods: {
    deleteTrans(e) {
      this.$emit("deleteTransaction", e.target.parentElement.id);
    },
  },
};
</script>