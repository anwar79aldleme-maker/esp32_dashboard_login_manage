
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string'
      ? JSON.parse(req.body)
      : req.body;

   // const {  device_id,heartrate, spo2, pname, pmobile } = body || {};
const {  device_id, heartrate, spo2 } = body || {};
    if (
      heartrate === undefined ||
      spo2 === undefined ||
      !device_id
    ) {
      return res.status(400).json({
        message: 'Missing sensor data',
        received: body
      });
    }

    await sql`
      INSERT INTO sensor_data
      (device_id, heartrate, spo2)
      VALUES
      (${device_id}  , ${heartrate}, ${spo2})
       `;
      //(device_id, pname, pmobile, heartrate, spo2)
     // (${device_id}, ${pname || ''}, ${pmobile || ''}, ${heartrate}, ${spo2})
   

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Database insert failed',
      detail: err.message
    });
  }
}
