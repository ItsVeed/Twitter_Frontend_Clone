<script>
    import { user, tweets } from "../stores";
    import useAxios from "../lib/useAxios";
    import { onMount } from "svelte";

    export let tweet;

    let api;

    onMount(async () => {
        api = useAxios();
    });

    const deleteTweet = async () => {
        const response = await api.delete(`/tweet/${tweet.pk}/delete/`);
        console.log($tweets)
        $tweets = $tweets.filter(t => t != tweet);
    }

</script>

<div class="card">
    <div class="card-header">
      {tweet.user}
    </div>
    <div class="card-body">
        <p class="card-text">{tweet.tweet}</p>
        {#if tweet.user == $user.username}
            <button on:click={deleteTweet} class="btn btn-danger">Delete</button>
        {/if}
    </div>
  </div>

