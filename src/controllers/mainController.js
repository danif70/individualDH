
const index = (req, res)=> {
    res.send('<h1>Bienvenid@</h1>')
}

const about = (req, res)=> {
    res.send('Trabajo para practicar')
}


module.exports = {
index,
about
}