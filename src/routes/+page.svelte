<script lang="ts">
    import { Temporal } from "temporal-polyfill";

    import Discord from "~icons/line-md/discord"
    import Linkedin from "~icons/line-md/linkedin"
    import Email from "~icons/line-md/email"

    let age = Temporal.Now.plainDateISO()
        .since(
            Temporal.PlainDate.from({ year: 2003, month: 12, day: 3 }), 
            { smallestUnit: "years" }
        )
        .years
</script>

<div class="mt-30 sm:mt-50 flex flex-col justify-center items-center">
    <div class="icon-bar">
        <li><a href="https://discord.com/users/372516983129767938" target="_blank"><Discord viewBox="0 -2 24 24" /></a></li>
        <li><a href="https://linkedin.com/in/synzv" target="_blank"><Linkedin /></a></li>
        <li><a href="mailto:me@synzv.com"><Email viewBox="0 -2 24 24" /></a></li>
    </div>

    <h1 class="text-5xl sm:text-7xl md:text-8xl font-bold text-nowrap">
        Sup, I'm <span class="name">Jacob</span>
    </h1>

    <p class="mt-2 text-current/50 text-center">
        I'm a {age} year old full-stack developer and Systems Administrator
    </p>
</div>