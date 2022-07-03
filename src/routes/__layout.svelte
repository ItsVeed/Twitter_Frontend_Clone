<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous">
    import { user, authTokens } from "../stores";
    import { onMount } from "svelte";
    import jwt_decode from "jwt-decode";

    let hasMounted = false;

    onMount(async () => {
        let initTokens = null;
        let initUser = null;

        if (localStorage.getItem("authTokens") != null) {
            initTokens = JSON.parse(localStorage.getItem("authTokens"));
            initUser = jwt_decode(localStorage.getItem("authTokens"));
        }

        $authTokens = initTokens;
        $user = initUser;

        hasMounted = true;
    });

    const logoutUser = () => {
        $authTokens = null;
        $user = null;
        localStorage.removeItem("authTokens")
    };
</script>

<nav class="navbar navbar-expand-sm navbar-dark bg-primary">
    <div class="container-fluid ">
      <a class="navbar-brand " href="/">Twitter Clone</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul class="navbar-nav ">
            {#if $user}
                <p class="navbar-text px-3">Logged in as {$user.username}</p>
                <li class="nav-item">
                    <a class="nav-link float-end" href="/" on:click={logoutUser}>Logout</a>
                </li>
            {:else}
                <li class="nav-item">
                    <a class="nav-link float-end" href="/login/">Login</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link float-end" href="/register/">Register</a>
                </li>
            {/if}	
        </ul>		  
      </div>
    </div>
  </nav>

{#if hasMounted}
    <slot></slot>
{/if}

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">