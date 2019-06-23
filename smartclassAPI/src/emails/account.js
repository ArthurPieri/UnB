const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'smartclass@arthurpieri.com',
        subject: 'Seja bem vindo ao Smartclass',
        text: `Olá ${name}, Seja bem vindo ao smartclass, esperamos que você goste da sua experiência`
    })
}

const sendFarewellEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'smartclass@arthurpieri.com',
        subject: 'Que pena que você está indo embora',
        text: `${name}, que pena que não fomos bons o suficiente para você! Por favor conte-nos o que podemos melhorar para você voltar`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendFarewellEmail
}