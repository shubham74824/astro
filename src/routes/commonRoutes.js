import express from 'express';

const router = express.Router();


router.get('/about', (req, res) => {
    return res.json("<div>About Page</div>");
});
router.get('/terms', (req, res) => {
    return res.json("<div>Terms Page</div>");
});
router.get('/privacy', (req, res) => {
    return res.json("<div>Privacy Page</div>");
});
router.get('/feedback', (req, res) => {
    return res.json("<div>Feedback Page</div>");
});


export default router;