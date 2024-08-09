// pages/api/matching/index.js
import matchingService from '../../../backend/matchingService';
import validate from '../../../middleware/validation';

export default async function handler(req, res) {
  console.log(`${req.method} request to /api/matching`);

  if (req.method === 'POST') {
    await validate(req, res);
    const { volunteer_id, event_id } = req.body;
    const result = await matchingService.matchVolunteer(volunteer_id, event_id);
    console.log('Match created:', result);
    return res.status(201).json(result);
  }

  res.status(405).json({ message: 'Not allowed' });
}
