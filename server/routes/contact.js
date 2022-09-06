import { Router } from 'express'
import db from '../config.js'
const router = Router();

router.get('/', async (req, res) => {
  await db.read();
  const { messages } = db.data;

  res.render('contact', {
    messages
  });
})


router.post('/', async (req, res) => {
  const errors = [];
  const { firstName, lastName, email, postalCode, message } = req.body;

  if (!firstName?.trim()) errors.push('First name is required');
  if (!lastName?.trim()) errors.push('Last name is required');
  if (!email?.trim()) errors.push('Email is required');
  if (!postalCode?.trim()) errors.push('Postal code is required');
  if (!message?.trim()) errors.push('Message is required');
  if (errors.length > 0) return res.status(403).json({ success: false, errors });


  await db.read();
  db.data.messages.push({
    firstName, lastName, email, postalCode, message, date: new Date(),
  })
  await db.write();

  // now save the message
  res.json('ok');
})

export default router;
