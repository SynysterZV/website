<script lang="ts">
    import { createContact } from "./data.remote";
    import { page } from "$app/state";
    import { pushState } from "$app/navigation";
    import { ModalValidator } from "$lib/schemas/modal";
    import { toasts } from "$lib/stores/toasts";
    import { Temporal } from "temporal-polyfill";

    import Discord from "~icons/line-md/discord"
    import Linkedin from "~icons/line-md/linkedin"
    import Email from "~icons/line-md/email"

    let { email, message } = createContact.fields

    let showModal = () => {
        pushState('', {
            showModal: true
        })
    }

    let hideModal = () => {
        history.back()
        document.getElementById("message")?.setAttribute('style', '')
    }

    let age = Temporal.Now.plainDateISO()
        .since(
            Temporal.PlainDate.from({ year: 2003, month: 12, day: 3 }), 
            { smallestUnit: "years" }
        )
        .years
</script>

<svelte:head>
    <title>Home</title>
</svelte:head>

<div class="mt-30 sm:mt-50 flex flex-col justify-center items-center">
    <div class="icon-bar">
        <li><a rel="external" href="https://discord.com/users/372516983129767938" target="_blank"><Discord viewBox="0 -2 24 24" /></a></li>
        <li><a rel="external" href="https://linkedin.com/in/synzv" target="_blank"><Linkedin /></a></li>
        <li><button onclick={showModal}><Email viewBox="0 -2 24 24" /></button></li>
    </div>

    <h1 class="text-5xl sm:text-7xl md:text-8xl font-bold text-nowrap">
        Sup, I'm <span class="name">Jacob</span>
    </h1>

    <p class="mt-2 text-current/50 text-center">
        I'm a {age} year old full-stack developer and Systems Administrator
    </p>
</div>

<dialog open={page.state.showModal} id="contact" class="modal" onclose={hideModal}>
    <div class="modal-box">
        <h1>Contact</h1>
        <form 
            class="mt-2 space-y-2" 
            onfocusout={() => createContact.validate()} 
            {...createContact.preflight(ModalValidator).enhance(async ({ form, submit}) => {
                try {
                    await submit();
                    form.reset();

                    if(createContact.result?.success) {
                        toasts.success("Successfully submitted your response", "bottom", "right", 3000)
                    } else {
                        throw new Error("")
                    }
                } catch (e) {
                    toasts.error("Something went Wrong!", "bottom", "right", 3000)
                }
            })}
        >
            <label class="floating-label">
                <span>Your Email</span>
                <input {...email.as("email")} placeholder="mail@example.com" class="input w-full validator"/>
                {#each email.issues() as issue}
                    <p class="validator-hint">{issue.message}</p>
                {/each}
            </label>
            <label class="floating-label">
                <span>Your message</span>
                <textarea id="message" {...message.as("text")} placeholder="Message" class="textarea field-sizing-content w-full validator"></textarea>
                {#each message.issues() as issue}
                    <p class="validator-hint">{issue.message}</p>
                {/each}
            </label>
            <button class="btn btn-primary">Submit</button>
        </form>
    </div>
    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog>