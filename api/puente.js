export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Only POST requests are allowed.');
  }

  try {
    console.log('✅ Webhook recibido');
    console.log('🔹 Cuerpo completo recibido:', JSON.stringify(req.body, null, 2));

    const grupo = req.body.group?.name;
    if (grupo !== "Presencial - Congreso CDO LATAM 2025 Bogota") {
      console.log(`⛔ Evento ignorado. Grupo recibido: ${grupo}`);
      return res.status(200).send("Evento ignorado: tipo o grupo no válido.");
    }

    const fields = req.body.fields;
    console.log('🔸 Campos enviados a Power Automate:', JSON.stringify(fields, null, 2));

    const powerAutomateResponse = await fetch(
      'https://defaulte69929079be64dcba9310bbf893f6e.22.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/7758822e615547268445409218885942/triggers/manual/paths/invoke/?api-version=1&tenantId=tId&environmentName=Default-e6992907-9be6-4dcb-a931-0bbf893f6e22&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=DKby3gi8IRtoE74aY_8v1Ltui5XjzJzFDjKFU4tAbB4',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fields),
      }
    );

    const result = await powerAutomateResponse.text();
    console.log('✅ Respuesta de Power Automate:', result);
    res.status(200).send(`Webhook forwarded:\n${result}`);
  } catch (error) {
    console.error('❌ Error al enviar a Power Automate:', error);
    res.status(500).send('Failed to forward to Power Automate');
  }
}
