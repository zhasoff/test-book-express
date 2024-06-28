import nodemailer from "nodemailer"

const mailConfig = {
    service: process.env.MAIL_MAILER,
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT),
    secure: true,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
}

const transporter = nodemailer.createTransport(mailConfig);

const sendEmail = async ({to, html}) => {
    try {
        const message = {
            from: process.env.MAIL_FROM_ADDRESS,
            to,
            subject: 'Вы зарегестрировались на нашем Библиотеке. Прошу продолжить регистрацию',
            html,
        };

        const info = await transporter.sendMail(message);
        console.log('Email sent: %s', info.messageId);

        return { success: true, message: 'Email sent successfully.' };
    } catch (error) {
        console.error('Error sending email:', error.message);
        return { success: false, message: 'Failed to send email.' };
    }
};

export default { sendEmail }