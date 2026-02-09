import * as z from "zod/mini"

export const ModalValidator = z.object({
    email: z.email({ error: "Must be a valid email" }),
    message: z.string().check(z.minLength(5, { error: "Must have content" }))
})