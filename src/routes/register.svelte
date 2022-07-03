<script>
    import { goto } from "$app/navigation"

    let username = '';
    let password = '';
    let password2 = '';

    const registerUser = async () => {
        const response = await fetch("http://127.0.0.1:8000/api/auth/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password,
                password2
            })
        });

        if (response.status === 201) {
            goto("/login/")
        } else {
            console.log(response.status)
            alert("Something went wrong!")
        }
    };
</script>

<form on:submit|preventDefault={registerUser}>
    <input type="text" name="username" bind:value={username} />
    <input type="passsword" name="password" bind:value={password} />
    <input type="passsword2" name="password2" bind:value={password2} />
    <button type="submit">Login</button>
</form>