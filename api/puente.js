export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Only POST requests are allowed.');
  }

  try {
    console.log('Body recibido:', req.body); // LOG del cuerpo entrante

    const response = await fetch(
      'https://defaulte69929079be64dcba9310bbf893f6e.22.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/7758822e615547268445409218885942/triggers/manual/paths/invoke/?api-version=1&tenantId=tId&environmentName=Default-e6992907-9be6-4dcb-a931-0bbf893f6e22&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=DKby3gi8IRtoE74aY_8v1Ltui5XjzJzFDjKFU4tAbB4',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      }
    );

    const result = await response.text();
    res.status(200).send(`Webhook forwarded:\n${result}`);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Failed to forward to Power Automate');
  }
}
