export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Only POST requests are allowed.');
  }

  try {
    const { type, data } = req.body;

    // Validar tipo de evento y nombre del grupo
    const groupName = data?.group?.name || '';
    if (
      type !== 'subscriber.added_to_group' ||
      groupName !== 'Presencial - Congreso CDO LATAM 2025 Bogota'
    ) {
      return res.status(200).send('Evento ignorado: tipo o grupo no válido.');
    }

    const fields = data.fields || {};

    // Construir el cuerpo para Power Automate
    const payload = {
      "Name": fields["Name"] || '',
      "Last Name": fields["Last Name"] || '',
      "Email": data.email || '',
      "Company": fields["Company"] || '',
      "Position": fields["Position"] || '',
      "Another Position": fields["Position Add"] || '',
      "Phone": fields["Phone"] || '',
      "Country": fields["Country"] || '',
      "Business Sector": fields["Rubro De Empresa"] || '',
      "Other Business Sector": fields["Otro Rubro"] || '',
      "Company Size": fields["Tamano De Empresa"] || '',
      "LinkedIn": fields["Linkedin"] || '',
      "Identify Document": fields["Identity Document"] || '',
      "¿Eres Asociado de CDO LATAM?": fields["Asociado Cdo Latam"] || '',
      "Consentimiento Para Compartir Datos": fields["Consentimiento Para Compartir Datos"] || ''
    };

    const response = await fetch(
      'https://defaulte69929079be64dcba9310bbf893f6e.22.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/7758822e615547268445409218885942/triggers/manual/paths/invoke/?api-version=1&tenantId=tId&environmentName=Default-e6992907-9be6-4dcb-a931-0bbf893f6e22&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=DKby3gi8IRtoE74aY_8v1Ltui5XjzJzFDjKFU4tAbB4',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }
    );

    const result = await response.text();
    res.status(200).send(`Webhook forwarded:\n${result}`);
  } catch (error) {
    console.error('Error forwarding webhook:', error);
    res.status(500).send('Internal Server Error');
  }
}
