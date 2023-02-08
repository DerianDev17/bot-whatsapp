const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')


const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])

const flujoPagina = addKeyword(['pag', 'pagina', 'pages','Página']).addAnswer(
    [
        '📄 Aquí encontraras la pagina principal de Eus3 Preuniversitario',
        'https://eus3pre.com/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)
const flujoDireccion = addKeyword(['Direccion', 'direccion','address','Dirección']).addAnswer(
    [
        'Sede Norte : Av. América N29-106 y Acuña',
        'Sede Sur : Av. Maldonado S11-644 y pujili',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)
const flujoHola =addKeyword(['Hola','hola']).addAnswer('🙌 Hola bienvenido a este *Chatbot* de Eus3Preuniversitario').addAnswer(
    [
        'te comparto los siguientes links',
        '👉 *pagina* para ver la pagina principal de Eus3',
        '👉 *Dirección*  para ver la lista de sedes Disponibles',
    ],
    null,
    null,
    [flujoPagina, flujoDireccion]
)


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
