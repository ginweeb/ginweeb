exports.app_add_headers = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if(req.message === 'OPTIONS'){
        res.header(
            'Access-Control-Allow-Methods',
            'POST, PATCH, DELETE, GET')
        return res.status(200).json({});
    }
    next();
}

exports.app_no_route = (req,res,next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
}

exports.app_error = (error, req, res, next)=>{
    res.status(error.status||500).json({
        error:{
            message: error.message
        }
    })
}