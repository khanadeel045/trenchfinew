// /api/admin/badges.js

router.get('/badges', async (req, res) => {
  const requests = await BadgeRequest.find(); // Mongoose model
  res.json(requests);
});

router.post('/badges/:id/approved', async (req, res) => {
  await BadgeRequest.findByIdAndUpdate(req.params.id, { status: 'approved' });
  res.status(200).json({ message: 'Badge approved' });
});

router.post('/badges/:id/rejected', async (req, res) => {
  await BadgeRequest.findByIdAndUpdate(req.params.id, { status: 'rejected' });
  res.status(200).json({ message: 'Badge rejected' });
});
