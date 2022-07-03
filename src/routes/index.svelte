<script>
    import { user, tweets } from "../stores";
    import useAxios from "../lib/useAxios";
    import { onMount } from "svelte";
    import TweetItem from "../components/TweetItem.svelte"

    onMount(async () => {
        
        const api = useAxios();
        const response = await api.get("/tweet/")
        $tweets = response.data
    });

</script>

<div class="contianer-fluid">
    {#if $user}
        {#each $tweets as t}
            <TweetItem tweet={t} />
        {/each}
    {:else}
        <p>You are not logged in</p>
    {/if}
    <div class="position-absolute bottom-0 end-0 p-4">
        <a href="/tweet/create/">
            <button class="btn btn-outline-primary btn-lg">Tweet</button>
        </a>
    </div>
</div>
