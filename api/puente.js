export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Only POST requests are allowed.');
  }

  const body = req.body;

  // Validar grupo exacto
  if (
    !body.group ||
    body.group.name !== 'Presencial - Congreso CDO LATAM 2025 Bogota'
  ) {
    return res.status(200).send('Evento ignorado: tipo o grupo no válido.');
  }

  const fields = body.subscriber?.fields || {};

  const mappedData = {
    "ID": body.subscriber?.id || '',
    "Company Size": fields.tamano_de_empresa || '',
    "Business Sector": fields.rubro_de_empresa || '',
    "Another Position": fields.position_add || '',
    "Position": fields.position || '',
    "Phone": fields.phone || '',
    "Other Business Sector": fields.otro_rubro || '',
    "Name": fields.name || '',
    "LinkedIn": fields.linkedin || '',
    "Last Name": fields.last_name || '',
    "Identify Document": fields.identify_document || '',
    "Country": fields.country || '',
    "Consentimiento Para Compartir Datos": fields.consentimiento_para_compartir_datos || '',
    "Company": fields.company || '',
    "¿Eres Asociado de CDO LATAM?": fields.asociado_cdo_latam || '',
    "Email": body.subscriber?.email || ''
  };

  try {
    const response = await fetch(
      'https://defaulte69929079be64dcba9310bbf893f6e.22.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/7758822e615547268445409218885942/triggers/manual/paths/invoke/?api-version=1&tenantId=tId&environmentName=Default-e6992907-9be6-4dcb-a931-0bbf893f6e22&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=DKby3gi8IRtoE74aY_8v1Ltui5XjzJzFDjKFU4tAbB4',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mappedData),
      }
    );

    const result = await response.text();
    res.status(200).send(`Webhook forwarded:\n${result}`);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Failed to forward to Power Automate');
  }
}
