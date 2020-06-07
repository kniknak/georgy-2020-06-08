import express, { Request, Response } from "express";
import fileUpload, { UploadedFile } from "express-fileupload";
import cors from "cors";
import bodyParser from "body-parser";
import Nedb from "nedb";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import FileType, { FileTypeResult } from "file-type";
import fs from "fs-extra";

const uploadDir = path.resolve(__dirname + "/../uploads/");
const db = new Nedb();

if (!fs.pathExistsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
    fs.chmod(uploadDir, "0700");
}

fs.emptyDir(uploadDir);

const app = express();

//add other middleware
app.use(cors({
    origin: "http://localhost:3000",
}));

app.use(fileUpload({
    createParentPath: true,
    safeFileNames: true,
    abortOnLimit: true,
    preserveExtension: 4,
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
    limitHandler: (req, res) => {
        res.status(413).send({
            status: false,
            message: "File is too big",
        });
    }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//start app
const port = process.env.PORT || 3003;

app.listen(port, () =>
    console.log(`App is listening on port ${port}.`),
);

interface FileInfo {
    filename: string
    originalName: string
    fileType: FileTypeResult
    size: number
    createdAt: number
    _id: string
}

const allowedMimeTypes = ["image/png", "image/jpeg"];

const uploadFile = async (file: UploadedFile) => {
    const ext = path.extname(file.name);
    const filename = `${uuidv4()}${ext}`;

    const fileType = await FileType.fromBuffer(file.data);

    if (!fileType) {
        throw new Error("Can not detect type of file");
    }

    if (!allowedMimeTypes.includes(fileType.mime)) {
        throw new Error("Unsupported content type");
    }

    if (file.mimetype !== fileType.mime) {
        throw new Error("Content type mismatch");
    }

    const uploadPath = path.join(uploadDir, filename);

    await file.mv(uploadPath);

    fs.chmodSync(uploadPath, "0600");

    const document: Omit<FileInfo, "_id"> = {
        filename,
        originalName: String(file.name),
        fileType,
        size: Number(file.size),
        createdAt: Date.now(),
    };

    return new Promise((resolve, reject) => {
        db.insert(document, (error, newDocument) => {
            if (error) {
                return reject(error);
            }

            resolve(newDocument);
        });
    });
};

const handleError = (req: Request, res: Response, error: Error, defaultError: string) => {
    console.error(error);
    res.status(500).send({
        status: false,
        message: error.message || defaultError,
    });
};
app.post("/files", async (req, res) => {
    try {
        if (!req.files || !req.files.upload) {
            throw new Error("No file uploaded");
        } else {
            const files = Array.isArray(req.files.upload) ? req.files.upload : [req.files.upload];

            if (!files.length) {
                throw new Error("No file uploaded");
            }

            const data = await Promise.all(files.map(file => uploadFile(file)));

            res.send({
                status: true,
                message: "Files are uploaded",
                data,
            });
        }
    } catch (error) {
        handleError(req, res, error, "Files are not uploaded or uploaded partially");
    }
});
// Pick<FileInfo, "originalName" | "size" | "_id" | "createdAt">
app.get("/files", (req: Request<never, unknown, never, { search?: string }>, res) => {
    try {
        const query: any = {};

        if (req.query.search) {
            const search = String(req.query.search);
            if (!search.match(/^[0-9a-zA-Z.]([\s0-9a-zA-Z.]*[0-9a-zA-Z.])?$/)) {
                throw new Error("Incorrect search");
            }
            query.originalName = { $regex: new RegExp(`.*${search}.*`, "i") };
        }
        db
            .find(query, {
                originalName: 1,
                size: 1,
                _id: 1,
                createdAt: 1,
            })
            .sort({ createdAt: 1 })
            .exec((error, data) => {
                res.send({
                    data,
                    status: true,
                });
            });
    } catch (error) {
        handleError(req, res, error, "Error with fetch");
    }
});

app.delete("/files/:id", (req: Request<{ id: string }>, res) => {
    try {
        if (!req.params.id.match(/^[0-9a-zA-Z]+$/)) {
            throw new Error("Incorrect id");
        }

        db
            .findOne({ _id: req.params.id }, (error, file: FileInfo | null) => {
                if (!file) {
                    throw new Error("File not found");
                }

                fs.unlinkSync(path.join(uploadDir, file.filename));

                db.remove({ _id: req.params.id }, (error, data) => {
                    if (error) {
                        throw error;
                    }

                    res.send({
                        status: true,
                    });
                });
            });
    } catch (error) {
        handleError(req, res, error, "File is not deleted");
    }
});