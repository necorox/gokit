'use client';

import { useState } from 'react';

export default function GreetPage() {
    const [name, setName] = useState('');
    const [greeting, setGreeting] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGreet = async () => {
        setLoading(true);
        setError('');

        try {
            // APIルートを介してgRPCサーバーにリクエストを送信
            const response = await fetch('/api/greet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
            });

            if (!response.ok) {
                throw new Error(`エラーが発生しました: ${response.status}`);
            }

            const data = await response.json();
            setGreeting(data.greeting);
        } catch (err) {
            setError(err instanceof Error ? err.message : '不明なエラーが発生しました');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">gRPC挨拶サービス</h1>

            <div className="mb-4">
                <label htmlFor="name" className="block mb-2">
                    名前:
                </label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="あなたの名前を入力してください"
                />
            </div>

            <button
                onClick={handleGreet}
                disabled={loading || !name}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
            >
                {loading ? '送信中...' : '挨拶を取得'}
            </button>

            {error && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}

            {greeting && (
                <div className="mt-4 p-3 bg-green-100 text-green-700 rounded">
                    {greeting}
                </div>
            )}
        </div>
    );
}