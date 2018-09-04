const express = require ('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requestes to /products'
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST requestes to /products'
    });
});

router.get('/:productID', (req, res, next) => {
    const id = req.params.productID;
    if (id === 'special'){
        res.status(200).json({
            message: 'You discovered the Special ID'

        })
    } else {
        res.status(200).json({
            message: 'You passed an ID'

        })
    }

});

router.patch('/:productID', (req, res, next) => {
    res.status(200).json({
        message: 'Updated Product'
    });
});

router.delete('/:productID', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted Product'
    });
});

module.exports = router; 