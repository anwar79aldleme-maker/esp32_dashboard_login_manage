
import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({ message:'Method not allowed' });

  const { device_id,pname,pmobile,spo2,heartrate } = req.body;

  await sql`
    INSERT INTO sensor_data(device_id,pname,pmobile,spo2,heartrate)
    VALUES(${device_id},${pname},${pmobile},${spo2},${heartrate})
  `;

  res.json({ success:true });
}

