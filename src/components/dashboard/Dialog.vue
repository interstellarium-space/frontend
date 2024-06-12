<script>
  export default {
    props: {
      id: String
    },
    setup(props) {
      const id = props.id
      return { id }
    }
  }
</script>

<template>
  <Teleport to="body">
    <div :id="this.id" class="interstellarium-modal modal fade">
      <div class="interstellarium-dialog modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="interstellarium-dialog-content modal-content">
          <div class="interstellarium-dialog-header modal-header">
            <slot name="dialog-header"></slot>
          </div>
          <div class="interstellarium-dialog-body modal-body">
            <slot name="dialog-body"></slot>
          </div>
          <div class="interstellarium-dialog-footer modal-footer">
            <slot name="dialog-footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/dashboard.css";
</style>
