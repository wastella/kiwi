export async function GET(req) {
  const body = await req.json()
  const { position, date } = body

  return Response.json(
    await getMetadata(position, date)
  )
}