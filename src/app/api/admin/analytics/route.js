// /api/admin/analytics.js
router.get('/analytics', async (req, res) => {
  const userData = await getUserStats(); // implement your logic
  const revenueData = await getRevenueStats(); // implement this too
  res.json({ userData, revenueData });
});
