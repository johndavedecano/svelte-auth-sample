<script context="module">
  export function preload({}, { token }) {
    if (!token) {
      return this.redirect(302, "login");
    }
  }
</script>

<script>
  import { goto, stores } from "@sapper/app";

  const { session } = stores();

  const token = $session.token;

  if (!token) {
    goto("/login");
  } else {
    console.log("Save token somewhere");
  }
</script>

<slot />
