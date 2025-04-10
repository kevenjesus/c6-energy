import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs/promises';
import leadsService from '@/app/services/leads'; // ajuste o path se necessário

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const form = formidable({ multiples: true });

  const [fields, files] = await new Promise<any>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve([fields, files]);
    });
  });

  // Normalizando os valores (formidable retorna array em cada campo)
  const id = fields.id?.[0];
  const document = fields.document?.[0];
  const zipcode = fields.zipcode?.[0];
  const address = fields.address?.[0];
  const number = fields.number?.[0];
  const complement = fields.complement?.[0];
  const neighborhood = fields.neighborhood?.[0];
  const isCompany = fields.is_company?.[0]; // 'true' ou 'false'

  const invoiceEnergy = files.invoice_energy?.[0];
  const documentFile = files.document_file?.[0];

  // Atualiza lead
  const updateResponse = await leadsService.updateLead({
    id,
    document,
    zipcode,
    address,
    number,
    complement,
    neighborhood,
    is_company: isCompany,
  });

  if (updateResponse.error) {
    return res.status(400).json({ error: updateResponse.message });
  }

  // Upload do arquivo document_file (apenas uma vez)
  const documentUpload = documentFile
    ? await leadsService.upload(
        new Blob([await fs.readFile(documentFile.filepath)]),
        `uploads/${Date.now()}-${documentFile.originalFilename}`
      )
    : null;

  // Upload do arquivo invoice_energy (se existir)
  const invoiceUpload = invoiceEnergy
    ? await leadsService.upload(
        new Blob([await fs.readFile(invoiceEnergy.filepath)]),
        `invoice_energy/${Date.now()}-${invoiceEnergy.originalFilename}`
      )
    : null;

  // Cria proposta com base no tipo de pessoa
  console.log('invoice_energy path:', invoiceUpload?.data);

  const insertProposalRes = await leadsService.insertProposal({
    user: id,
    invoice_energy: invoiceUpload?.data ?? null,
    document: isCompany === 'false' ? documentUpload?.data ?? null : null,
    social_contract: isCompany === 'true' ? documentUpload?.data ?? null : null,
  });

  if (insertProposalRes.error) {
    return res.status(400).json({ error: insertProposalRes.message });
  }

  return res.status(200).json({ data: insertProposalRes.data, message: 'Lead e proposta atualizados com sucesso!' });
}
