const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message:'this is a get request'
    })
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message:'this is a post request'
    })
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if (id === 'special'){
        res.status(200).json({
            message: 'you found special id',
            id:id
        });
    } else {
        res.status(200).json({
            message:'thats ordinary'
        });
    }
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message:'product updated'
    })
});


router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message:'product deleted'
    })
});


module.exports = router;