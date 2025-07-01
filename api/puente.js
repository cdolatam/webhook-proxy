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
      'https://af92993d5bfcea58ae0f8592e5fe47.e7.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/7dd09755495a440d8189dd4468686915/triggers/manual/paths/invoke/?api-version=1&tenantId=tId&environmentId=af92993d-5bfc-ea58-ae0f-8592e5fe47e7&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=JXbU69T-K32qcupfqsqNV9VU3I43-D3aMr7jA55x7H4',
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
