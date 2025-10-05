import { getMetadata } from "./metadata"

export default async function Results({
  searchParams
}) {
  const params = await searchParams

  const position = params.position ? JSON.parse(decodeURIComponent(params.position)) : null
  const date = params.date ? new Date(decodeURIComponent(params.date)) : null

  const metadata = await getMetadata(position, date)

  return (
    <div className="text-white">
      <h1>Results</h1>
      <p>{JSON.stringify(position)}</p>
      <p>{date.toISOString()}</p>
      <p>{JSON.stringify(metadata)}</p>
    </div>
  )
}