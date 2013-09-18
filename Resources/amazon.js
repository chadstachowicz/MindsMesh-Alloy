var _OBJ = {
    APIKey: false,
    SecretKey: false,
    AWSBucketName: false,
    GSM: " -0700",
    fileName: false,
    s3fileName: false,
    fileURL: false,
    timeout: 99e3,
    debug: true,
    log: function(_obj) {
        this.debug && Ti.API.info(_obj);
    },
    SHA: require("sha-aws").load(),
    Utf8: require("UTF8").load(),
    Date: require("date").load(),
    http: Ti.Network.createHTTPClient({}),
    PUT: function(f) {
        f && (this.fileName = f);
        var uploadFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, _OBJ.fileName);
        var fileContents = uploadFile.read();
        if (!uploadFile.exists()) {
            alert("File not found. Please check that " + _OBJ.fileName + " exists in your Data directory.");
            return;
        }
        _OBJ.fileURL = "https://s3.amazonaws.com/" + _OBJ.AWSBucketName + "/" + _OBJ.s3fileName;
        _OBJ.http.open("PUT", _OBJ.fileURL);
        _OBJ.http.setTimeout([ _OBJ.timeout ]);
        var curDate = _OBJ.Date.formatDate(new Date(), "E, d MMM dd yyyy HH:mm:ss") + _OBJ.GSM;
        var StringToSign = "PUT\n\n" + fileContents.mimeType + "\n" + curDate + "\nx-amz-acl:public-read\n/" + _OBJ.AWSBucketName + "/" + _OBJ.s3fileName;
        var AWSAccessKeyID = "AWS " + _OBJ.APIKey + ":";
        var AWSSignature = _OBJ.SHA.b64_hmac_sha1(_OBJ.SecretKey, _OBJ.Utf8.encode(StringToSign));
        AWSAccessKeyID.concat(AWSSignature);
        _OBJ.http.setRequestHeader("x-amz-acl", "public-read");
        _OBJ.http.setRequestHeader("Content-Type", fileContents.mimeType);
        "android" != Ti.Platform.osname && _OBJ.http.setRequestHeader("Content-Length", uploadFile.size);
        _OBJ.http.setRequestHeader("Host", "s3.amazonaws.com");
        _OBJ.http.send(fileContents);
    },
    config: function(_args) {
        _args.key && (this.APIKey = _args.key);
        _args.secret && (this.SecretKey = _args.secret);
        _args.bucket && (this.AWSBucketName = _args.bucket);
        _args.fileName && (this.fileName = _args.fileName);
        _args.s3fileName && (this.s3fileName = _args.s3fileName);
        _args.GSM && (this.GSM = _args.GSM);
        _args.http && (this.http = _args.http);
        _args.timeout && (this.timeout = _args.timeout);
        _args.onsendstream && (this.http.onsendstream = _args.onsendstream);
        _args.error && (this.http.onerror = _args.error);
        _args.success && (this.http.onload = _args.success);
        _args.debug && (this.debug = _args.debug);
    }
};

exports.load = function() {
    _OBJ.http.onsendstream = function(e) {
        _OBJ.log("TEST1 - PROGRESS: " + e.progress);
    };
    _OBJ.http.onload = function() {
        _OBJ.log("Success. Endpoint: " + _OBJ.fileURL);
    };
    return _OBJ;
};