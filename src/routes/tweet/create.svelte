<script>
    import useAxios from "$lib/useAxios";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    
    
    let tweet = '';
    let api;

    onMount(async () => {
        api = useAxios();
    });

    const createTweet = async () => {
        const response = await api.post("/tweet/",{
         "tweet": tweet,
        });

        if (response.status === 201) {
            goto("/")
        } else {
            // throw error
        }
    }

</script>

<form on:submit|preventDefault={createTweet}>
    <input type="text" name="username" bind:value={tweet} />
    <button type="submit">Post</button>
</form>