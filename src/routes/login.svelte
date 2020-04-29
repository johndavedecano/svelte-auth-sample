<script context="module">
  export function preload({}, { token }) {
    if (token) {
      return this.redirect(302, "/");
    }
  }
</script>

<script>
  import { goto, stores } from "@sapper/app";

  import axios from "axios";

  const { session } = stores();

  const token = $session.token;

  if (token) {
    goto("/");
  } else {
    console.log("Save token somewhere");
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios.post("/login").then(response => {
      // writing to the session store on the client means
      // it's immediately available to the rest of the app,
      // without needing to reload the page
      $session.token = response.data;
      goto("/");
    });
  };
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>
<div class="container">
  <div class="row">
    <div class="col-md-3" />
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">Login</div>
        <div class="card-body">
          <form action="/login" method="POST" on:submit={handleSubmit}>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="text" class="form-control" name="email" />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" name="password" />
            </div>
            <div class="pt-2 pb-2">
              <button class="btn btn-primary btn-block">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="col-md-3" />
  </div>
</div>
