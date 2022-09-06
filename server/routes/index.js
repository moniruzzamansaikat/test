import { Router } from 'express'

const router = Router();

router.get('/', (req, res) => {
  res.redirect('/api/contact');
})

export default router;
