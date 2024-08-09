import { Parser } from 'json2csv';
import prisma from '../lib/prisma';

const generateCSV = (data, fields) => {
  const json2csvParser = new Parser({ fields });
  return json2csvParser.parse(data);
};

const fetchData = async (type) => {
  if (type === 'volunteers') {
    return await prisma.userProfile.findMany({
      include: {
        user: true, // Include the related user data
      },
    });
  } else if (type === 'events') {
    return await prisma.eventDetails.findMany({
      include: {
        volunteerHistory: true, // Include the related volunteer history
      },
    });
  }
  return [];
};

const generateReport = async (type) => {
  const data = await fetchData(type);

  const fields = Object.keys(data[0]);
  return {
    contentType: 'text/csv',
    data: generateCSV(data, fields),
  };
};

export default generateReport;
