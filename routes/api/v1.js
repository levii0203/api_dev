const express = require('express')
const version = require('../../middleware/version/apiversioning') 
const apiRateLimiter = require('../../middleware/rate_limiter/apiRateLimiter')
const logger = require('../../utils/winston/logger')

const router = express.Router();

router.use(version.apiVersionHeader('v1'));
router.use(apiRateLimiter())


router.route('/')
.get((req, res) => {
    logger.success('/api/v1')
    // get token with req.token
    res.status(200).json({ message: 'API v1 endpoint' });
});

module.exports = router
