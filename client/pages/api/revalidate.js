export default async function handler(req, res) {
  const id = req.query.id
  try {
    await res.unstable_revalidate(`/product/${id}`)
    return res.json({ revalidated: true })
  } catch (err) {
    return res.status(500).send('Error revalidating')
  }
}
