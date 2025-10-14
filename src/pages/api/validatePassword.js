const PASSWORD = "G5T8Q2"

export default function handler(req, res) {
    if (req.method === "POST") {
        const { password } = req.body
        if (password === PASSWORD) {
            res.status(200).json({ success: true })
        } else {
            res.status(401).json({ success: false })
        }
    }
}
