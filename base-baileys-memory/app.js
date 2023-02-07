const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flujoHola =addKeyword(['Hola','hola']).addAnswer('🙌 Hola bienvenido a este *Chatbot* de Eus3Preuniversitario ¿Cual es tu nombre?',{capture:true}, (resp)=>{
    console.log('Respuesta :',resp.body)
})
.addAnswer('Gracias Por la información')


const flujoAdios = addKeyword(['Gracias','gracias','Adiós','adios']).addAnswer('Muchas Gracias Por preferir a Eus3Preuniversitario✨');


const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flujoHola, flujoAdios])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
