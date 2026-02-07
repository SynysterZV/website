<script lang="ts">
    import { onMount } from "svelte";
    import { isConnected, userData } from "$lib/stores/lanyard";

    const userId = "372516983129767938"

    onMount(async () => {
        if (window) {
            if($isConnected) return
            let socket = new WebSocket(`wss://api.lanyard.rest/socket`)

            socket.addEventListener('open', () => {
                $isConnected = true
                console.log("Lanyard socket opened")
            })

            socket.addEventListener('message', (event) => {
                const data = JSON.parse(event.data)

                console.log(data)

                switch (data.op) {
                    case 0:
                        if(data.t == "PRESENCE_UPDATE") {
                            $userData[userId] = data.d
                        } else {
                            $userData = data.d
                        }
                        break;
                    case 1:
                        socket.send(JSON.stringify({
                            op: 2,
                            d: {
                                subscribe_to_ids: [userId]
                            }
                        }))

                        setInterval(() => {
                            socket.send(JSON.stringify({ op: 3 }))
                        }, data.d.heartbeat_interval)
                }
            })

            socket.addEventListener('close', () => {
                $isConnected = false
                console.log('Lanyard socket closed')
            })
        }
    })

</script>

{#if $userData[userId]}
    <div class="card bg-base-200 w-96 shadow-sm items-center self-center">
        <div class="avatar mt-4">
            <div class="{
                    $userData[userId].discord_status == "online"
                    ? "ring-green-500"
                    : $userData[userId].discord_status == "idle"
                    ? "ring-yellow-500"
                    : "ring-gray-500"
                } ring-offset-base-200 w-24 rounded-full ring-2 ring-offset-2">
                <img 
                src="https://cdn.discordapp.com/avatars/{userId}/{$userData[userId].discord_user.avatar}.png"
                alt="Discord Avatar"
                class="rounded-full"
                />
            </div>
        </div>
        <div class="card-body">
            <h2 class="card-title">{$userData[userId].discord_user.username}</h2>
        </div>
    </div>
{/if}