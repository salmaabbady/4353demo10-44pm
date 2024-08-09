// pages/api/history/index.js
import historyService from '../../../backend/historyService';
import validate from '../../../middleware/validation';

export default async function handler(req, res) {
  console.log(`${req.method} request to /api/history`);

  if (req.method === 'GET') {
    const history = await historyService.getHistory();
    console.log('GET history:', history);
    return res.status(200).json(history);
  }

  if (req.method === 'POST') {
    await validate(req, res);
    const record = req.body;
    const result = await historyService.addHistory(record);
    console.log('History record added:', result);
    return res.status(201).json(result);
  }

  res.status(405).json({ message: 'Not allowed' });
}
