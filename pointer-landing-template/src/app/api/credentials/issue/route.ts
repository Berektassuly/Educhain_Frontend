import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.formData();
  const file = data.get('file');
  const issuerId = data.get('issuerId');
  const recipientId = data.get('recipientId');
  const serialNumber = data.get('serialNumber');

  console.log('Received data:', { file, issuerId, recipientId, serialNumber });

  // In a real application, you would process the file and interact with a backend service to issue the credential.

  return NextResponse.json({ success: true, message: 'Document signing request received.' });
}
