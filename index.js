const { json } = require('express')
const express = require('express')
const app = express()
const db = require('./db')

app.listen(3000, () => {
    console.log('Servidor no ar!!!')
})

app.use(json())


//Consultar URL
app.get('/:url', async (req, res) => {

    const url = req.params['url']

    var [urlOriginal] = await db.consultarURL(url)

    res.send(urlOriginal.url_original)
})

//Encurtar URL
app.post('/', async (req, res) => {

    var { url } = req.body
    var shortUrl = encurtador()
    var validade = await db.urlValida()

    while (validade.some(el=>el==shortUrl) == true) {
        shortUrl = encurtador() 
    }
    
    await db.encurtarURL(url, shortUrl)
    
    res.send({
        newUrl: "http://localhost:3000/" + shortUrl
    }).status(201)

})

//Função que cria uma URL aleatória
function encurtador() {

    var caracteres = [
        ['a', 'e', 'i', 'o', 'u', 'q', 'w', 'e', 'r', 't'],
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    ]

    var comprimento = Math.random().toFixed(1) * 10

    do {
        comprimento = Math.random().toFixed(1) * 10
    } while (comprimento < 5 || comprimento > 10)

    var url = ''

    for (let i = 1; i <= comprimento; i++) {

        var index = (Math.random().toFixed(1) * 10) - 1
        do {
            (index = Math.random().toFixed(1) * 10) - 1
        } while (index < 0 || index >= 10)

        var index2 = Math.random().toFixed(1) * 10

        url += caracteres[index2 % 2][index]
    }

    return url

}

/*
-Teste unitários;
*/