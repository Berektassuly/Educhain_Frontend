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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Textarea } from '@/shared/components/ui/textarea';
import { useToast } from '@/shared/hooks/use-toast';

export default function IssueCredentialPage() {
  const [file, setFile] = useState<File | null>(null);
  const [recipientId, setRecipientId] = useState('');
  const [credentialType, setCredentialType] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file || !recipientId || !credentialType) {
      toast({ title: 'Error', description: 'Please fill all required fields.' });
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    // The backend expects issuer_id, not issuerId
    formData.append('recipient_id', recipientId);
    formData.append('serial', serialNumber);

    try {
      const response = await fetch('/api/credentials/issue', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Your credential has been successfully issued.',
        });
        setFile(null);
        setRecipientId('');
        setCredentialType('');
        setSerialNumber('');
        setExpirationDate('');
        setDescription('');
      } else {
        toast({ title: 'Error', description: result.message || 'An error occurred.' });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'An unexpected error occurred.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Issue a New Credential</CardTitle>
        <CardDescription>
          Upload a document and provide the necessary metadata to issue a
          verifiable credential.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="file-upload">Credential Document</Label>
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
          <Label htmlFor="recipient-id">Recipient ID</Label>
          <Input
            id="recipient-id"
            placeholder="Enter the recipient ID"
            value={recipientId}
            onChange={(e) => setRecipientId(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="credential-type">Credential Type</Label>
          <Select onValueChange={setCredentialType} value={credentialType}>
            <SelectTrigger>
              <SelectValue placeholder="Select a credential type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="diploma">Diploma</SelectItem>
              <SelectItem value="certificate">Certificate</SelectItem>
              <SelectItem value="badge">Badge</SelectItem>
            </SelectContent>
          </Select>
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
        <div className="space-y-2">
          <Label htmlFor="expiration-date">Expiration Date (Optional)</Label>
          <Input
            id="expiration-date"
            type="date"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description/Notes (Optional)</Label>
          <Textarea
            id="description"
            placeholder="Enter a description or notes"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Issuing...' : 'Issue Credential'}
        </Button>
      </CardFooter>
    </Card>
  );
}
