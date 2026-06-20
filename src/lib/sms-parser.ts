export function parseSMS(
    text: string
) {

    const tnx =
        text.match(
            /tnxID[: ]*([a-z0-9]+)/i
        )?.[1];

    const amount =
        text.match(
            /tk[ .]*(\d+)/i
        )?.[1];

    const provider =
        text
            .toLowerCase()
            .includes("nagad")
            ?
            "NAGAD"
            :
            "BKASH";

    return {

        tnxId: tnx,
        amount: Number(amount),
        provider
    };

}