export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Only POST requests are allowed.');
  }

  try {
    const powerAutomateResponse = await fetch(
      'https://defaulte69929079be64dcba9310bbf893f6e.22.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/9167a9c6b7954a3ca34ee739f99b8e05/triggers/manual/paths/invoke/?api-version=1&tenantId=tId&environmentName=Default-e6992907-9be6-4dcb-a931-0bbf893f6e22', // usa aquí la URL exacta de tu flujo
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      }
    );

    const result = await powerAutomateResponse.text();

    res.status(200).send(`Webhook forwarded:\n${result}`);
  } catch (error) {
    console.error('Error sending to Power Automate:', error);
    res.status(500).send('Failed to forward to Power Automate');
  }
}
