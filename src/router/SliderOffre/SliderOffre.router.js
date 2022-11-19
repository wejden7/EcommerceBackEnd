const router = require('express').Router()

const { SliderOffre,SliderOffreById} = require('../../controller/SliderOffre.controller')

router.get('/slider-offre',SliderOffre)
router.get('/slider-offre/:id',SliderOffreById)

 

module.exports=router   