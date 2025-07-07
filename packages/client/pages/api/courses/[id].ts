// pages/api/courses/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'PUT') {
        const courseId = req.query.id as string;

        try {
            const response = await axios.put(
                `http://localhost:3001/courses/user/${courseId}`,
                req.body,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Cookie: req.headers.cookie || '',
                    },
                }
            );

            res.status(200).json(response.data);
        } catch (error: any) {
            console.error(error.response?.data || error.message);
            res.status(error.response?.status || 500).json({
                message: 'Update failed',
                error: error.response?.data || error.message,
            });
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}