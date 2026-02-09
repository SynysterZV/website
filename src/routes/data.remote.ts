import { ModalValidator } from "$lib/schemas/modal"
import { form } from "$app/server"
import { SMTP2GO_USERNAME, SMTP2GO_PASSWORD } from "$env/static/private"
import nodemailer from "nodemailer"
import { v4 as uuidv4 } from "uuid"

const transporter = nodemailer.createTransport({
    host: 'mail.smtp2go.com',
    port: 465,
    secure: true,
    auth: {
        user: SMTP2GO_USERNAME,
        pass: SMTP2GO_PASSWORD
    }
})

async function sendMail(email: string, message: string) {
    const res = await transporter.sendMail({
        from: `"Website" <noreply@synzv.com>`,
        to: "me@synzv.com",
        subject: `Feedback from SynDev REF:${uuidv4()}`,
        text: `From ${email}\n${message}`,
        replyTo: email
    })

    return res.messageId || null
}

export const createContact = form(
    ModalValidator,
    async ({ email, message }) => {
        try {
            const res = await sendMail(email, message)

            if(res) {
                return {
                    success: true
                }
            }
        } catch (error) {
            return {
                error
            }
        }
    }
)