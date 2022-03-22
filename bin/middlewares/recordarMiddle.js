
function recordarMiddle (req,res,next){
    if((req.cookies.recordame != undefined) && 
       (req.session.usuarioLog == undefined)) {
           req.cookies.recordame = req.session.usuarioLog
       } 
       /* aquí está faltando comparar con lo que tengo en archivo */
}
module.exports = recordarMiddle