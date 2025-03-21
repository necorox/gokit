import { NextRequest, NextResponse } from 'next/server';
import { GreetService } from '../../../rpc/greet/v1/greet_pb';
import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";


// gRPCサーバーのアドレス
const GRPC_SERVER_URL = 'http://backend:8080';

// gRPCクライアントの設定
const transport = createConnectTransport({
    baseUrl: GRPC_SERVER_URL,
});

// gRPCクライアントの作成
const client = createClient(GreetService, transport);

// 明示的に POST メソッドをエクスポート
export async function POST(request: NextRequest) {
    try {
        // リクエストボディからnameを取得
        const body = await request.json();
        const { name } = body;

        if (!name) {
            return NextResponse.json(
                { error: '名前は必須です' },
                { status: 400 }
            );
        }

        // gRPCサーバーにリクエストを送信する
        try {
            const response = await client.greet({ name });
            return NextResponse.json({ greeting: response.greeting + " grpc" });
        } catch (connectError) {
            console.error('gRPCクライアントエラー:', connectError);

            const fallbackResponse = await fetch(
                `${GRPC_SERVER_URL}/greet.v1.GreetService/Greet`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name }),
                }
            );

            if (!fallbackResponse.ok) {
                throw new Error(`gRPCサーバーエラー: ${fallbackResponse.status}`);
            }

            return NextResponse.json(await fallbackResponse.json());
        }
    } catch (error) {
        console.error('gRPCリクエストエラー:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : '不明なエラーが発生しました' },
            { status: 500 }
        );
    }
}