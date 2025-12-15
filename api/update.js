import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL);

export default async function handler(req,res){
  const { id, spo2, heartrate } = req.body;
  await sql`
    UPDATE sensor_data
    SET spo2=${spo2}, heartrate=${heartrate}
    WHERE id=${id}
  `;
  res.json({ success:true });
}

