async function connect() {

    const mysql = require('mysql2/promise')
    
    require('dotenv').config()
    
    const connection = await mysql.createConnection({
        user: process.env.USER_DB,
        password: process.env.PASSWORD_DB,
        host: process.env.HOST_DB,
        port:process.env.PORT_DB,
        database: process.env.DATABASE
    })

    
    global.connection = connection

    return connection
}

//Insert no banco de dados
async function encurtarURL(url, urlEncurtada) {

    try {
        const conn = await connect()
        const sql = 'INSERT INTO urls VALUES (?,?, DATE_ADD(CURDATE(),INTERVAL 15 DAY))'
        const values = [url, urlEncurtada]
        
        await conn.query(sql, values)

        conn.end()
    } catch (error) {
        console.log(`Algo deu errado: ${error}`)
    }


}

//Consulta no BD 
async function consultarURL(req) {
    try {
        const conn = await connect()
        const sql = 'SELECT url_original FROM urls WHERE url_curta = ?'
        const values = [req]

        var [url] = await conn.query(sql, values)

        conn.end()

        return url

    } catch (error) {
        console.log(`Algo deu errado \n ${error}`)
    }
}

//Validar URL
async function urlValida() {

    const conn = await connect()
    const [urls] = await conn.query('SELECT * FROM urls;')
    var url = urls.map(el => el.url_curta)
    conn.end()

    return url
}

module.exports = { encurtarURL, consultarURL, urlValida }

