import { NextRequest, NextResponse } from "next/server";

import { createPDF } from "@/services/product.service";

export async function POST(
    req: NextRequest
) {
    try {
        const body = await req.json();

        const { title, price, filePath, } = body;

        if (!title || !price || !filePath) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "title, price and filePath required",
                },
                {
                    status: 400,
                }
            );
        }

        const product = await createPDF({
            title,
            price: Number(price),
            filePath,
        });

        return NextResponse.json(
            {
                success: true,
                product,
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "create failed",
            },
            {
                status: 500,
            }
        );
    }
}