/*
|--------------------------------------------------------------------------
| SMS Parser
|--------------------------------------------------------------------------
|
| Purpose:
| Detect the payment source (Bkash / Nagad / Rocket / Upay)
| and extract transaction information from incoming SMS text.
|
| Returns:
| {
|   trxId: string | null,
|   amount: number | null
| }
|
| Returns null values when parsing fails or the SMS format
| is unsupported.
|
| Currently Supported: 
|
| 1. Bkash —  (Send money to Merchant)
|
| Example:
|
| TrxID 9JK8L10P Successful.
| Tk 5000.00 received from 01712345678
| on 01/01/2024 at 12:34 PM.
| Your new Bkash balance is Tk 10000.00.
| Thank you for using Bkash.
|
| Extracted:
| trxId  → "9JK8L10P"
| amount → 5000
|
| TODO:
| - Add Nagad parser
| - Add Rocket parser
| - Add Upay parser
| - Support multiple SMS formats per provider
|
*/


interface ParsedMFS {
  trxId: string | null;
  amount: number | null;
}



export function parseIncomingSMS(
  sender: string,
  text: string
): ParsedMFS {
  const cleanSender = String(sender).toUpperCase();
  const cleanText = String(text).toUpperCase();


  let trxId: string | null = null;
  let amount: number | null = null;

  // RealTime SmS will from : 16247 for Bkash and 16247 for Nagad
  const isBkash = cleanSender.includes('16247') || cleanSender.includes('+8801571048224');
  const isNagad = cleanSender.includes('Nagad');
  const isRocket = cleanSender.includes('16216');
  const isUpay = cleanSender.includes('UPAY');

  if (isBkash) {
    const trxMatch = cleanText.match(/TrxID\s+([A-Z0-9]+)/i);

    // capture only received amount
    const amountMatch = cleanText.match(
      /received\s+Tk\s+([0-9,.]+)/i
    );

    if (trxMatch) {
      trxId = trxMatch[1].trim().toUpperCase();
    }

    if (amountMatch) {
      amount = parseFloat(
        amountMatch[1].replace(/,/g, '')
      );
    }
  }

  // else if (cleanSender.includes('NAGAD')) {
  //   const trxMatch = text.match(
  //     /(?:TxnID|TrxID)[:\s]+([A-Z0-9]+)/i
  //   );

  //   const amountMatch = text.match(
  //     /(?:Amount|Amt)[:\s]+(?:Tk\s+)?([0-9,.]+)/i
  //   );

  //   if (trxMatch) {
  //     trxId = trxMatch[1].trim().toUpperCase();
  //   }

  //   if (amountMatch) {
  //     amount = parseFloat(
  //       amountMatch[1].replace(/,/g, '')
  //     );
  //   }
  // }

  return { trxId, amount };
}