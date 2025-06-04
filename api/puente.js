export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Only POST requests are allowed.');
  }

  // Mostrar el contenido recibido en los logs de Vercel
  console.log("BODY RECIBIDO:", JSON.stringify(req.body, null, 2));

  try {
    const response = await fetch(
      "https://defaulte69929079be64dcba9310bbf893f6e.22.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/9167a9c6b7954a3ca34ee739f99b8e05/triggers/manual/paths/invoke/?api-version=1&tenantId=tId&environmentName=Default-e6992907-9be6-4dcb-a931-0bbf893f6e22",
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
    console.error("ERROR AL ENVIAR A POWER AUTOMATE:", error);
    res.status(500).send("Error al reenviar a Power Automate");
  }
}

Agrego log para inspeccionar body del webhook de MailerLite
