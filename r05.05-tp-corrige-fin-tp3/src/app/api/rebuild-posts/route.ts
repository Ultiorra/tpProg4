import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"


export async function POST(req : Request) {
    console.log(Array.from(req.headers))
    const webhookKey = process.env.SUPABASE_WEBHOOK_KEY
    const apiKEY = req.headers.get("api-key")
    if (apiKEY === null) {
        return new Response('"API-Key" header is missing', {
            status: 401
        })
    } else if (apiKEY !== webhookKey) {
        return new Response("API Key is not valid", {
            status: 403
        })
    }
    console.log("rebuilding products...")
    revalidatePath('/[categorySlug]/[productSlug]')
    return NextResponse.json({
        "revalidated":true,
        "date":new Date().toISOString()
    })
}