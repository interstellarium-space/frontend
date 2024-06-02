<script>
  export default {
    props: {
      unitClassName: String
    },
    
    setup(props) {
      let unitClassName = props.unitClassName
      return { unitClassName }
    },
    
    methods: {
      createUnit() {
        this.$router.push({ name: `Create${this.unitClassName}` })
      }
    }
  }
</script>

<template>
  <a @click="this.createUnit()" class="btn btn-interstellarium interstellarium-create-unit mx-2">
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-plus-lg interstellarium-create-unit-icon" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
    </svg>
  </a>
</template>

<style scoped>
.interstellarium-create-unit {
    max-width: 3rem;
    max-height: 3rem;
    height: 3rem;
    width: 3rem;
    min-width: 3rem;
    min-height: 3rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.interstellarium-create-unit-icon {
    width: 1.5rem;
    height: 1.5rem;
}
</style>
