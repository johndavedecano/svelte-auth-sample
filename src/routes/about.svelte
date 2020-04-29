<script>
  import RequireAuth from "./_auth.svelte";
</script>

<svelte:head>
  <title>About</title>
</svelte:head>

<RequireAuth>
  <h1>About this site</h1>
  <p>This is the 'about' page. There's not much here.</p>
</RequireAuth>
