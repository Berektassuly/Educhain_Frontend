const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://educhain.fly.dev';

export async function signDocument(file: File, issuerId: string, recipientId: string, serialNumber: string) {
  const formData = new FormData();
  formData.append('file', file);

  const data = {
    issuer_id: issuerId,
    recipient_id: recipientId,
    ...(serialNumber && { serial: serialNumber }),
  };

  formData.append('data', JSON.stringify(data));

  const response = await fetch(`${API_BASE_URL}/issue`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
