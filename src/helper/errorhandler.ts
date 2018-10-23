import logger from './logger';

export default (app: any) => {

    // handle 404
    app.use((req, res: any) => {
        res.setStatus(false, 404);

        // setting appropriate error objects
        res.api.error = {
            name: 'endpoint',
            message: 'API endpoint does not exist',
        };

        logger.error("Method not found", {
            res,
            err: res.api.error,
        });

        res.json(res.api);
    });

    // handle errors
    app.use((err, req, res, next) => {
        if (!err) {
            return next();
        }

        // catch invalid json in request body
        if (err instanceof SyntaxError && 'body' in err) {

            res.setStatus(false, 400);

            // setting appropriate error objects
            res.api.error = {
                code: 'body',
                message: 'Invalid input',
            };

            logger.error("Not able to parse the request body", {
                res,
                err,
            });

            return res.json(res.api);
        }

        // setting appropriate error objects
        res.api.error = {
            code: 'endpoint',
            message: 'Oops something broke!',
        };

        res.setStatus(false, 500);

        logger.error("Unhandled exception occured", {
            res,
            err,
        });

        res.json(res.api);
    });

};
