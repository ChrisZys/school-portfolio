import fs from "fs"
import path from "path"

export default function handler(req, res) {
    if (req.method === "GET") {
        const fileName = req.query.file

        if (!fileName) {
            return res.status(400).json({ error: 'Nombre de archivo requerido' });
        }

        if (!fileName.endsWith('.pdf')) {
            return res.status(400).json({ error: 'Solo se permiten archivos PDF' });
        }

        const filePath = path.join(process.cwd(), 'src', 'data', 'files', fileName);

        try {
            if (!fs.existsSync(filePath)) {
                return res.status(404).json({ error: 'Archivo no encontrado' });
            }
            const fileBuffer = fs.readFileSync(filePath);

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `inline; filename="${fileName}"`);
            res.setHeader('Cache-Control', 'public, max-age=31536000');

            res.send(fileBuffer);
        } catch (error) {
            console.error('Error al servir PDF:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ error: `Método ${req.method} no permitido` });
    }
}
