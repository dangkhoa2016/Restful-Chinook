<template>

  <div class='w-75 mw-md-50 text-center mx-auto'>
    <div class='users-loader-container'>
      <div class='line'></div>
      <div class='line d1'></div>
      <div class='line d2'></div>
      <div class='line d3'></div>
      <div class='line d4'></div>
      <div class='line d5'></div>
      <br>
      <div class='caption'>
        <p style='display:inline-block;'>Loading {{ message }}</p>
        <div class='dot'>.</div>
        <div class='dot'>.</div>
        <div class='dot'>.</div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'RecordLoader',

    props: {
      message: {
        type: String,
        default: 'records',
      },
    },
  };
</script>
