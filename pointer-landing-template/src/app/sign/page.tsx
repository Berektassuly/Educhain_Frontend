'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { useToast } from '@/shared/hooks/use-toast';
import { signDocument } from '@/features/credentials/api/actions';
import { Copy } from 'lucide-react';

interface SignResponse {
  hash: string;
  tx_id: string;
  signature: string;
  issued_at: string;
}

export default function SignPage() {
  const [file, setFile] = useState<File | null>(null);
  const [issuerId, setIssuerId] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SignResponse | null>(null);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied to clipboard' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || !issuerId || !recipientId) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const result = await signDocument(file, issuerId, recipientId, serialNumber);
      setResult(result);
      toast({
        title: 'Success',
        description: 'Your document has been successfully signed.',
      });
      setFile(null);
      setIssuerId('');
      setRecipientId('');
      setSerialNumber('');
    } catch (err: any) {
      setError(err.message);
      toast({ title: 'Error', description: err.message || 'An unexpected error occurred.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign a New Document</CardTitle>
        <CardDescription>
          Upload a document and provide the necessary metadata to create a
          verifiable credential.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {!result ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="file-upload">Document</Label>
                <div className="flex items-center space-x-2">
                  <Input id="file-upload" type="file" onChange={handleFileChange} />
                  {file && (
                    <Button variant="outline" onClick={() => setFile(null)}>
                      Remove
                    </Button>
                  )}
                </div>
                {file && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {file.name} ({Math.round(file.size / 1024)} KB)
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="issuer-id">Issuer ID</Label>
                <Input
                  id="issuer-id"
                  placeholder="Enter the issuer ID"
                  value={issuerId}
                  onChange={(e) => setIssuerId(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recipient-id">Recipient ID</Label>
                <Input
                  id="recipient-id"
                  placeholder="Enter the recipient ID"
                  value={recipientId}
                  onChange={(e) => setRecipientId(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="serial-number">Serial Number (Optional)</Label>
                <Input
                  id="serial-number"
                  placeholder="Enter a serial number"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Document Hash</Label>
                <div className="flex items-center space-x-2">
                  <Input value={result.hash} readOnly />
                  <Button variant="outline" size="icon" onClick={() => handleCopyToClipboard(result.hash)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Transaction ID</Label>
                <div className="flex items-center space-x-2">
                  <Input value={result.tx_id} readOnly />
                  <Button variant="outline" size="icon" onClick={() => handleCopyToClipboard(result.tx_id)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Signature</Label>
                <div className="flex items-center space-x-2">
                  <Input value={result.signature} readOnly />
                  <Button variant="outline" size="icon" onClick={() => handleCopyToClipboard(result.signature)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Issued At</Label>
                <Input value={new Date(result.issued_at).toLocaleString()} readOnly />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {!result ? (
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Signing...' : 'Sign Document'}
            </Button>
          ) : (
            <Button onClick={() => setResult(null)}>Sign Another Document</Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
