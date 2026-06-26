

import * as React from 'react'
import { getPublishedPDFs } from "@/services/product.service";


export default async function PDFPage() {
  const pdfs = await getPublishedPDFs ();

  return (
    <div className="container mx-auto py-8">
        {/* Create PDF   */}
        <div>

        </div>
      <h1 className="text-3xl font-bold mb-6">Available PDFs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pdfs.map((pdf) => (
          <div key={pdf._id} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold">{pdf.title}</h2>
            <p className="text-lg font-bold">${pdf.price.toFixed(2)}</p>
            <a
              href={`/private-pdf/${pdf.filePath}`}
              download
              className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Download PDF
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
