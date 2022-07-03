
<script>
    import { user, authTokens} from "../stores.js"
    import { goto } from "$app/navigation"
    import jwt_decode from "jwt-decode"
    
    let username = '';
    let password = '';

    const loginUser = async () => {
        const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        const data = await response.json();

        if (response.status === 200) {
            $authTokens = data;
            $user = jwt_decode(data.access);
            localStorage.setItem("authTokens", JSON.stringify(data));
            goto("/");
        } else {
            alert("Something went wrong!")
        }
    };

</script>

<form on:submit|preventDefault={loginUser}>
    <input type="text" name="username" bind:value={username} />
    <input type="passsword" name="password" bind:value={password} />
    <button type="submit">Login</button>
</form>
