interface ParsedMFS {
  trxId: string | null;
  amount: number | null;
}

export function parseIncomingSMS(
  sender: string,
  text: string
): ParsedMFS {
  const cleanSender = sender.toUpperCase();

  let trxId: string | null = null;
  let amount: number | null = null;

  if (cleanSender.includes('BKASH')) {
    const trxMatch = text.match(/TrxID\s+([A-Z0-9]+)/i);

    // capture only received amount
    const amountMatch = text.match(
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

  } else if (cleanSender.includes('NAGAD')) {
    const trxMatch = text.match(
      /(?:TxnID|TrxID)[:\s]+([A-Z0-9]+)/i
    );

    const amountMatch = text.match(
      /(?:Amount|Amt)[:\s]+(?:Tk\s+)?([0-9,.]+)/i
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

  return { trxId, amount };
}