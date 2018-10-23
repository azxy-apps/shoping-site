import express from "express";
import _ from "lodash";
import mongoose from "mongoose";
import multer from "multer";
import GridFsStorage from "multer-gridfs-storage";
import GridFsStream, { Grid } from "gridfs-stream";
import crypto from "crypto";
import path from "path";

import { ProductService } from "../service";
import config from "../config";
import commonValidatorRouter from "../helper/commonValidator";
import logger from '../helper/logger';
import { GridFSBucketReadStream } from "mongodb";

const fileRouter = express.Router();
let gfs: Grid;

const conn = mongoose.createConnection(config.db.mongodb.host);
conn.once('open', () => {
    gfs = GridFsStream(conn.db, mongoose.mongo);
    gfs.collection("documents");
});

const storage = new GridFsStorage({
    url: config.db.mongodb.host,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename,
                    bucketName: 'documents',
                };
                resolve(fileInfo);
            });
        });
    },
});

const upload = multer({ storage });

fileRouter.get('/', commonValidatorRouter)
    .get('/', async (req: any, res: any, next) => {
        // Call service method

        try {
            gfs.files.find().toArray((err, files) => {
                if (err || !files) {
                    res.setStatus(false, 500);
                }
                return res.json(files);
            });

        } catch (error) {
            next(error);
        }
    })
    .get('/:filename', async (req: any, res: any, next) => {
        // Call service method

        try {
            gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
                if (err || !file) {
                    res.setStatus(false, 500);
                }

                if (/image\/jpeg|img\/png/.test(file.contentType)) {
                    const readStream = gfs.createReadStream(file.filename);
                    readStream.pipe(res);
                } else {
                    return res.json(file);
                }
            });

        } catch (error) {
            next(error);
        }
    });

/*
*   This POST API to add the files
*/
fileRouter.post('/', commonValidatorRouter)
    .post('/', upload.single('file'), async (req: any, res: any, next) => {
        // Call service method

        try {

            res.setStatus(true, 200);
            return res.json({ file: req.file });

        } catch (error) {
            next(error);
        }
    });

export default fileRouter;
