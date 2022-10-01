const express = require('express')

const app = express()

const passport = require('passport')

app.use('/',require('./authentification/authentification.router'))

app.use('/',require('./user/user.router'))

app.use('/',require('./produit/produit.router'))

app.use('/',require('./image/image.router'))


app.use('/',require('./forniseur/forniseur.router'))

app.use('/',require('./marque/marque.router'))

app.use('/',require('./description/description.router'))

app.use('/',require('./categorie/categorie.router'))

app.use('/',require('./sousCategorie/sousCategorie.router'))

app.use('/',require('./sousSousCategorie/sousSousCategorie.router'))

app.use('/api',require('./notification/app.notification.router'))


app.use('/',
    passport.authenticate('jwt',{session:false,failWithError:true}),
    require('./authorization/authorization.router'),
    function(err, req, res, next) {
        return res.status(401).send({ success: false, message: err })
    }
) 
 


module.exports=app