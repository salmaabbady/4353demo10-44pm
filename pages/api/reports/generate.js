import authMiddleware from '../../../middleware/authMiddleware';
import generateReport from '../../../services/reportService';

const handler = async (req, res) => {
  await authMiddleware(req, res, async () => {
    const { type } = req.query;

    try {
      const report = await generateReport(type);
      res.setHeader('Content-Type', report.contentType);
      res.setHeader('Content-Disposition', `attachment; filename=${type}_report.csv`);
      res.send(report.data);
    } catch (error) {
      console.error('Error generating report:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
};

export default handler;
