import { redis } from '@/lib/redis'
import { Elysia, t } from 'elysia'
import { nanoid } from 'nanoid'

const ROOM_TTL_SECONDS = 60 * 10

// this will create a new api route /room
const rooms = new Elysia({ prefix: '/room' })
.post('/create', async () => {
    const roomId = nanoid()

    await redis.hset(`meta:${roomId}`, {
        connected: [],
        createdAt: Date.now(),
    })

    await redis.expire(`meta:${roomId}`, ROOM_TTL_SECONDS)

    return { roomId }
})

export const app = new Elysia({ prefix: '/api' })
.use(rooms) // localhost:3000/api/room

export const GET = app.fetch
export const POST = app.fetch