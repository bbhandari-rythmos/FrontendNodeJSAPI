var express = require('express'),
    path = require('path'),
    app = express(),
    server = require('http').createServer(app).listen(process.env.PORT || 8080),
    bodyParser = require('body-parser'),
    request = require('request'),
    _ = require('underscore');

app.use(express.static(path.join(__dirname, 'app')));

const admin = require('firebase-admin');
var serviceAccount = require("./unity3d-5c4ffb2c8348.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();

var _token;
var _responseId;

app.use(function (req, res, next) {
    "use strict";
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, OPTIONS, DELETE');
    res.header('Access-Control-Allow-Headers', 'origin, content-type, Authorization');
    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/api/ping', function (req, res) {
    res.send({ message: 'pong' });
});

var addResponsesToFireStore = function (cmsOperation, NotifcationType, Topic) {
    var ticks = new Date().getTime();
    var responseId = cmsOperation + ticks;
    NotifcationType = NotifcationType ? NotifcationType : '0';
    setTimeout(function () {
        switch (NotifcationType) {
            case '0':
                var docRef = db.collection('Response').doc(responseId.toString());
                var setResponse = docRef.set({
                    CmsOperation: cmsOperation,
                    responseId: responseId.toString()
                });
                break;
            case '1':
                var responseDocRef = db.collection('Response').doc(responseId.toString());
                var setResponse = responseDocRef.set({
                    CmsOperation: cmsOperation,
                    responseId: responseId.toString()
                });

                var docRef = db.collection(Topic).doc(cmsOperation);
                var setResponse = docRef.set({
                    UpdatedTimeInEpoch: new Date().getTime(),
                });
                break;
        }
    }, 5000);
    return responseId;
};

app.get('/api/Responses/:respId', function (req, res) {
    var respId = req.params.respId;
    var length = respId.length - 13;
    var tt = respId.substring(0, length);
    console.log(tt);
    var tempData = null;
    switch (tt) {
        case "GetProjects": // get project
            res.send({ content: { projects: projectArray } });
            break;
        case "GetSystemAdmin"://get System Admins
            res.send({ content: { userDetails: userDetails } });
            break;
        case "GetUserDetails":
            res.send({ content: { userDetails: searchedUsers } });
            break;
        case "AssignOrRemoveSystemAdmin":
            res.send({ content: { status: 'OK' } });
            break
        case "GetProjectAdmin"://get System Admins
            res.send({ content: { userDetails: userDetails } });
            break;
        case "GetUserDetailsForProject":
            res.send({ content: { userDetails: searchedUsers } });
            break;
        case "AssignOrRemoveProjectAdmin":
            res.send({ content: { status: 'OK' } });
            break
        case "2": // get Tree Deafts
            res.send({ content: { nodeList: TreeDrafts } });
            break;
        case "5": // get Tree Deafts
            res.send({ content: { distributionList: Emptydistributions } });
            break;
        case "6": // get Tree Deafts
            res.send({ content: { distributionList: distributions } });
            break;
        case "7"://get distribution Branches
            res.send({ content: distributionBranches });
            break;
        case "8": // distribution Name exists
            tempData = false;
            res.send({ content: tempData });
            break;
        case "9": // distribution Name not exists
            tempData = true;
            res.send({ content: tempData });
            break;
        case "10": // Add Tag
            res.send({ content: { status: 'OK' } });
            break;
        case "11": // Remove Tag
            res.send({ content: { status: 'OK' } });
            break;
        case "12": // get all Tags for tagGroup
            res.send({ content: { tags: tags } });
            break;
        case "13": // get Draft Tags
            res.send({ content: draftTags });
            break;
        case "14": // repo url not exists
            tempData = true;
            res.send({ content: tempData });
            break;
        case "15": // get Node Drafts
            res.send({ content: { drafts: drafts } });
            break;
        case "16": // Accept Draft to Live
            res.send({ content: { status: 'OK' } });
            break;
        case "17": // Update Draft
            res.send({ content: { status: 'OK' } });
            break;
        case "18": // get Tree Deafts
            res.send({ content: { contentAsMarkdown: FileContentAsMarkdown } });
            break;
        case "19": // get Tree Deafts
            res.send({ content: { contentAsHtml: FileContentAsHtml } });
            break;
        case "20": // GDoc Validation
            res.send({
                content: {
                    "isDraftContentValid": false,
                    "extactedAssets": [
                        {
                            "assetId": "83d97228-fad4-4adf-bd9a-3207fc0fcfad",
                            "isValid": false
                        },
                        {
                            "assetId": "848a20ee-bc01-4539-9798-94e5ce7530ca",
                            "isValid": true
                        },
                        {
                            "assetId": "1d181ecb-3fbe-4994-ad00-6dd0f7b49176",
                            "isValid": true
                        }
                    ]
                }
            });
            break;
        case "GetAllTagGroupsAndTags": // get tag Groups
            res.send({ content: { tagGroups: tagGroups } });
            break;
        case "22": // Create Tag Group
            res.send({ content: { status: 'OK' } });
            break;
        case "23": // Create Tag 
            res.send({ content: { status: 'OK' } });
            break;
        case "24": // Create Tag 
            res.send({ content: { tags: nodeTags } });
            break;
        case "25": // Create Tag 
            res.send({ content: { tags: projectTags, tagGroups: tagGroups } });
            break;
        case "27": // add tagGroups to project
            res.send({ content: { status: 'OK' } });
            break;
        case "26": // get tag Groups for Project
            res.send({ content: { tagGroupIds: ['1', '2', '4'] } });
            break;
        case "29": // add tagGroups to project
            res.send({ content: { status: 'OK' } });
            break;
        case "28": // get tag Groups for Project
            res.send({ content: { tagIds: ['1', '2', '12', '13'] } });
            break;
        case "51": // get repo
            res.send({ content: { repositories: repositories } });
            break;
        case "52": // get drafts
            res.send({ content: { drafts: drafts1 } });
            break;
        case "53": // get drafts
            res.send({ content: { drafts: drafts1 } });
            break;
        case "101": // upload assets image
            res.send({
                content: {
                    asset: {
                        'assetId': '12',
                        'assetType': 2,
                        'fileName': 'New Asset',
                        'fileSize': '1020 KB',
                        'assetContent': 'assets/img/thumbnails/project3-thumb.jpg',
                        'unityProjectSource': 'added ',
                        'instructionsToReCreateImage': 'added',
                        'depicted': 'added',
                        'altTitle': 'added',
                        'description': 'added',
                        'uploadedBy': 'BHUPENDRA',
                        'uploadedDate': '10/10/2017'
                    }
                }
            });
            break;
        case "109": // upload assets code
            res.send({
                content: {
                    asset: {
                        'assetId': '18',
                        'assetType': 1,
                        'fileName': 'na',
                        'fileSize': '1000 KB',
                        'assetContent': codeContent,//'using&nbsp;System;<br />using&nbsp;System.Reflection;<br /><br />namespace&nbsp;ConsoleApp01<br />{<br />&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;class&nbsp;ConsoleApp01<br />&nbsp;&nbsp;&nbsp;&nbsp;{<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;Main(string[]&nbsp;args)<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("");<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("");<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("Hello&nbsp;from&nbsp;ReactOS&nbsp;on&nbsp;"&nbsp;+&nbsp;Environment.MachineName&nbsp;+&nbsp;"!");<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("OS&nbsp;Version:&nbsp;"&nbsp;+&nbsp;Environment.OSVersion);<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("Image&nbsp;runtime&nbsp;Version:&nbsp;"&nbsp;+<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Assembly.GetExecutingAssembly().ImageRuntimeVersion.ToString());<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("Environment&nbsp;Version:&nbsp;"&nbsp;+&nbsp;Environment.Version.ToString());<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("Setup&nbsp;information:&nbsp;"&nbsp;+&nbsp;AppDomain.CurrentDomain.SetupInformation);<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("");<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.Write("Press&nbsp;any&nbsp;key&nbsp;to&nbsp;continue...");<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.ReadKey();<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />&nbsp;&nbsp;&nbsp;&nbsp;}<br />}',
                        'unityProjectSource': 'ABC',
                        'instructionsToReCreateImage': 'NA',
                        'depicted': 'NA',
                        'altTitle': 'NA',
                        'description': 'NA',
                        'uploadedBy': 'Manish',
                        'uploadedDate': '10/10/2017'
                    }
                }
            });
            break;
        case "106": // put assets image
            res.send({
                content: {
                    asset: {
                        'assetId': '11116',
                        'assetType': 2,
                        'fileName': 'Update Asset',
                        'fileSize': '1020 KB',
                        'assetContent': 'assets/img/thumbnails/project3-thumb.jpg',
                        'unityProjectSource': 'update ',
                        'instructionsToReCreateImage': 'update',
                        'depicted': 'update',
                        'altTitle': 'update',
                        'description': 'update',
                        'uploadedBy': 'BHUPENDRA',
                        'uploadedDate': '10/10/2017'
                    }
                }
            });
            break;

        case '102': // recent assets image
            var assetTemp = _.where(assetArray, { assetType: 2 });
            res.send({ content: { assets: assetTemp } });
            break;
        case '103': // uploaded by me assets imaGE
            var assetTemp = _.where(assetArray, { assetType: 2 });
            var assets = _.where(assetTemp, { uploadedBy: 'BHUPENDRA' });
            res.send({ content: { assets: assets } });
            break;
        case '104': // get Asset By Id
            res.send({
                content: {
                    asset: {
                        'assetId': '11116',
                        'assetType': 2,
                        'fileName': 'df Asset',
                        'fileSize': '1020 KB',
                        'assetContent': 'assets/img/thumbnails/project3-thumb.jpg',
                        'unityProjectSource': 'updfgdate ',
                        'instructionsToReCreateImage': 'upddfgate',
                        'depicted': 'fgdsf',
                        'altTitle': 'updsgsgate',
                        'description': 'updfgdate',
                        'uploadedBy': 'BHUPENDRA',
                        'uploadedDate': '10/10/2017'
                    }
                }
            });
            break;
        case '105': // update properties image
            res.send({
                content: {
                    asset:
                        {
                            'assetId': '11',
                            'assetType': 2,
                            'fileName': 'BHUPENDRA TEST',
                            'fileSize': '1000 KB',
                            'assetContent': 'assets/img/thumbnails/project3-thumb.jpg',
                            'unityProjectSource': 'Updated ',
                            'instructionsToReCreateImage': 'Updated',
                            'depicted': 'Updated',
                            'altTitle': 'Updated',
                            'description': 'Updated',
                            'uploadedBy': 'BHUPENDRA',
                            'uploadedDate': '10/10/2017'
                        }
                }
            });
            break;

        case "107": // get recentcode block assets
            var assetTemp = _.where(assetArray, { assetType: 1 });
            res.send({ content: { assets: assetTemp } });
            break;
        case "108": // get code block assets
            res.send({
                content: {
                    asset: {
                        'assetId': '11117',
                        'assetType': 1,
                        'fileName': 'test',
                        'fileSize': '1000 KB',
                        'assetContent': codeContent,//'using&nbsp;System;<br />using&nbsp;System.Reflection;<br /><br />namespace&nbsp;ConsoleApp01<br />{<br />&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;class&nbsp;ConsoleApp01<br />&nbsp;&nbsp;&nbsp;&nbsp;{<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;Main(string[]&nbsp;args)<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("");<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("");<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("Hello&nbsp;from&nbsp;ReactOS&nbsp;on&nbsp;"&nbsp;+&nbsp;Environment.MachineName&nbsp;+&nbsp;"!");<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("OS&nbsp;Version:&nbsp;"&nbsp;+&nbsp;Environment.OSVersion);<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("Image&nbsp;runtime&nbsp;Version:&nbsp;"&nbsp;+<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Assembly.GetExecutingAssembly().ImageRuntimeVersion.ToString());<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("Environment&nbsp;Version:&nbsp;"&nbsp;+&nbsp;Environment.Version.ToString());<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("Setup&nbsp;information:&nbsp;"&nbsp;+&nbsp;AppDomain.CurrentDomain.SetupInformation);<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("");<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.Write("Press&nbsp;any&nbsp;key&nbsp;to&nbsp;continue...");<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.ReadKey();<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />&nbsp;&nbsp;&nbsp;&nbsp;}<br />}',
                        'unityProjectSource': 'ABC',
                        'instructionsToReCreateImage': 'NA',
                        'depicted': 'NA',
                        'altTitle': 'NA',
                        'description': 'NA',
                        'uploadedBy': 'BHUPENDRA',
                        'uploadedDate': '10/10/2017'
                    }
                }
            });
            break;
        case "110": // put assets code
            res.send({
                content: {
                    asset: {
                        'assetId': '11117',
                        'assetType': 1,
                        'fileName': 'test',
                        'fileSize': '1000 KB',
                        'assetContent': codeContent,//'using&nbsp;System;<br />using&nbsp;System.Reflection;<br /><br />namespace&nbsp;ConsoleApp01<br />{<br />&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;class&nbsp;ConsoleApp01<br />&nbsp;&nbsp;&nbsp;&nbsp;{<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;Main(string[]&nbsp;args)<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("");<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("");<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("Hello&nbsp;from&nbsp;ReactOS&nbsp;on&nbsp;"&nbsp;+&nbsp;Environment.MachineName&nbsp;+&nbsp;"!");<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("OS&nbsp;Version:&nbsp;"&nbsp;+&nbsp;Environment.OSVersion);<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("Image&nbsp;runtime&nbsp;Version:&nbsp;"&nbsp;+<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Assembly.GetExecutingAssembly().ImageRuntimeVersion.ToString());<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("Environment&nbsp;Version:&nbsp;"&nbsp;+&nbsp;Environment.Version.ToString());<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("Setup&nbsp;information:&nbsp;"&nbsp;+&nbsp;AppDomain.CurrentDomain.SetupInformation);<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("");<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.Write("Press&nbsp;any&nbsp;key&nbsp;to&nbsp;continue...");<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.ReadKey();<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />&nbsp;&nbsp;&nbsp;&nbsp;}<br />}',
                        'unityProjectSource': 'ABC',
                        'instructionsToReCreateImage': 'NA',
                        'depicted': 'NA',
                        'altTitle': 'NA',
                        'description': 'NA',
                        'uploadedBy': 'BHUPENDRA',
                        'uploadedDate': '10/10/2017'
                    }
                }
            });
            break;
        case "111": // get my block assets
            var assetTemp = _.where(assetArray, { assetType: 1 });
            var assets = _.where(assetTemp, { uploadedBy: 'BHUPENDRA' });
            res.send({ content: { assets: assets } });
            break;
        case "112": // get operation data
            res.send({ content: operationStatusArray });
            break;
        case "113": // get publish queue
            res.send({ content: { publishQueues: publishQueueArray } });
            break;
        case "114": //post publish quesue
            res.send({
                content: {
                    publishQueue: {
                        "publishQueueId": "67316f75-04fe-424c-a3ed-d36d5cc0c82c",
                        "projectName": "DocWorksMasterTemp-Project-14Dec-001",
                        "distributionName": "DocWorksDistributions-14Dec001",
                        "publishedBy": "S-1-5-21-1210654208-2246142303-2829877410-17601",
                        "publishedDate": 1515658639,
                        "publishStatus": 2,
                        "zipFileLink": "https://googledocmdstorage.blob.core.windows.net/cmspublishingstaging/Manuals/2018.1/Manuals_2018.1.zip"
                    }
                }
            });
            break;
        case "115": // get live draft
            res.send({ content: { nodeList: liveDraftNodeArray } });
            break;
        case "116":
            res.send({ content: { projects: publishProjects } });
            break;
        default:
            break;
    }
});

app.get('/api/projects', function (req, res) {
    var responseId = addResponsesToFireStore('GetProjects', '0', '');
    res.send({ responseId: responseId });
});

app.post('/api/projects', function (req, res) {
    var responseId = addResponsesToFireStore('CreateProject', '1', 'Project');
    res.send({ responseId: responseId });
});

app.get('/api/Distributions/:id/nodes', function (req, res) {
    var responseId = addResponsesToFireStore('GetNodesForDistribution', '0', '');
    res.send({ responseId: responseId });
});

app.post('/api/drafts', function (req, res) {
    var responseId = addResponsesToFireStore('CreateDraft', '1', 'Draft');
    res.send({ responseId: responseId });
});

app.post('/api/tagGroups', function (req, res) {
    var responseId = addResponsesToFireStore('CreateTagGroup', '1', 'TagGroup');
    res.send({ responseId: responseId });
});

app.post('/api/tags', function (req, res) {
    var responseId = addResponsesToFireStore('CreateTag', '1', 'TagGroup');
    res.send({ responseId: responseId });
});

app.post('/api/nodes/update', function (req, res) {
    var responseId = addResponsesToFireStore('UpdateNode', '1', 'Node');
    res.send({ responseId: responseId });
});

app.post('/api/tag/add', function (req, res) {
    var responseId = addResponsesToFireStore('AddTag', '1', 'TagGroup');
    res.send({ responseId: responseId });
});

app.post('/api/tag/remove', function (req, res) {
    var responseId = addResponsesToFireStore('RemoveTag', '1', 'TagGroup');
    res.send({ responseId: responseId });
});

app.get('/api/StaticFields/DocumentationType', function (req, res) {
    res.send(typeOfContentArray);
});

app.get('/api/Repositories', function (req, res) {
    var responseId = addResponsesToFireStore('GetRepositoryList', '0', '');
    res.send({ responseId: responseId });
});

app.get('/api/users/GetSystemAdmin', function (req, res) {
    var responseId = addResponsesToFireStore('GetSystemAdmin', '0', '');
    res.send({ responseId: responseId });
});

app.post('/api/Users/GetUserDetails', function (req, res) {
    var responseId = addResponsesToFireStore('GetUserDetails', '0', '');
    res.send({ responseId: responseId });
});

app.post('/api/Users/:userId/AssignOrRemoveSystemAdmin', function (req, res) {
    var responseId = addResponsesToFireStore('AssignOrRemoveSystemAdmin', '1', 'User');
    res.send({ responseId: responseId });
});

app.get('/api/Projects/:projectId/GetProjectAdmin', function (req, res) {
    var responseId = addResponsesToFireStore('GetProjectAdmin', '0', '');
    res.send({ responseId: responseId });
});

app.post('/api/Users/GetUserDetailsForProject', function (req, res) {
    var responseId = addResponsesToFireStore('GetUserDetailsForProject', '0', '');
    res.send({ responseId: responseId });
});

app.post('/api/Projects/:projectId/AssignOrRemoveProjectAdmin', function (req, res) {
    var responseId = addResponsesToFireStore('AssignOrRemoveSystemAdmin', '1', 'User');
    res.send({ responseId: responseId });
});

app.get('/api/RolesAndPermissions', function (req, res) {
    res.send({
        "isSystemAdmin": false,
        "RolesAndPermissions": [
            {
                "roleId": "5a7aadf150541b15501b0a3d",
                "name": "SystemAdmin",
                "permissions": [
                    "CreateProject",
                    "CreateDistribution"
                ]
            },
            {
                "roleId": "5a7aadf150541a15501b0a3d",
                "name": "ProjectAdmin",
                "permissions": [
                    "CreateProject",
                    "CreateDistribution"
                ]
            },
            {
                "roleId": "5a7aadf150541a15501b0a3d",
                "name": "Author",
                "permissions": [
                    "CreateProject",
                    "CreateDistribution"
                ]
            }
        ]
    });
});

app.get('/api/DistributionsForCreate/:id', function (req, res) {
    console.log('GET Distributions called, sending response id ' + _responseId);
    console.log('Waiting for 30 seconds to simulate get project call');
    var projectId = req.params.id;
    console.log(projectId);
    var responseID = 5;
    if (projectId === "test1") {
        responseID = 6;
    }

    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "Get Distributions",
                "body": {
                    "cmsOperation": "getDistributionsForCreate",
                    "notificationTopic": "NA",
                    "notificationType": 0,
                    "responseId": responseID
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);

    }, 5000)
    res.send({ responseId: responseID });
});

app.get('/api/Distribution/validateDistributionName/:distributionName', function (req, res) {
    var distributionName = req.params.distributionName;
    var tempResponseId = null;
    var tempDistribution = _.where(distributions, { distributionName: distributionName });
    if (tempDistribution.length > 0) {
        tempResponseId = 8;
    }
    else {
        tempResponseId = 9;
    }
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "add Distribution",
                "body": {
                    "cmsOperation": "ValidateDistributionName",
                    "notificationTopic":
                        "NA", "notificationType": 0,
                    "responseId": tempResponseId
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);
    }, 5000);

    res.send({ responseId: tempResponseId });

});

app.post('/api/doLogin', function (req, res) {
    var userName = req.body.userName;
    var password = req.body.password;
    var captchaResponseToken = req.body.captchaResponseToken;

    console.log('doLogin ' + userName + ', ' + password + ', ' + captchaResponseToken);

    request({
        uri: 'https://www.google.com/recaptcha/api/siteverify',
        form: {
            "secret": "6LcTQDIUAAAAAFjWj88FHAHAYB2airDwJ5Wkr4FN",//server staging secret 
            "response": captchaResponseToken
        },
        method: 'POST'
    }, function (err, response, body) {
        if (err) {
            res.send({ status: 0, token: '1wewqe1313s131313131313', profile: { firstName: userName, lastName: userName } });
            console.error("error in recaptcha " + err);
        } else {
            var bodyJSON = JSON.parse(body);
            console.info("recaptcha successful" + JSON.stringify(bodyJSON) + ', ' + bodyJSON.success);
            res.send({ status: 0, token: '1wewqe1313s131313131313', profile: { firstName: userName, lastName: userName } });
        }
    });
});

app.post('/connect/token', function (req, res) {
    var userName = req.body.userName;
    var password = req.body.password;
    var captchaResponseToken = req.body.captchaResponseToken;

    console.log('doLogin ' + userName + ', ' + password + ', ' + captchaResponseToken);

    request({
        uri: 'https://www.google.com/recaptcha/api/siteverify',
        form: {
            "secret": "6LcTQDIUAAAAAFjWj88FHAHAYB2airDwJ5Wkr4FN",//server staging secret 
            "response": captchaResponseToken
        },
        method: 'POST'
    }, function (err, response, body) {
        if (err) {
            console.error("error in recaptcha " + err);
        } else {
            var bodyJSON = JSON.parse(body);
            console.info("recaptcha successful" + JSON.stringify(bodyJSON) + ', ' + bodyJSON.success);
            res.send({ status: 0, token: '1wewqe1313s131313131313', profile: { firstName: userName, lastName: userName } });
        }
    });
});

app.get('/api/Drafts/:draftId/md', function (req, res) {
    console.log('GET Gdoc as MD is called, sending response id ' + _responseId);
    console.log('Waiting for 30 seconds to simulate get call');
    var responseID = 18;
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "Get DraftContent As Markdown",
                "body": {
                    "cmsOperation": "GetDraftContentAsMarkdown",
                    "notificationTopic": "NA",
                    "notificationType": 0,
                    "responseId": responseID
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);

    }, 5000)
    res.send({ responseId: responseID });
});

app.get('/api/Drafts/:draftId/html', function (req, res) {
    console.log('GET Gdoc as HTML is called, sending response id ' + _responseId);
    console.log('Waiting for 30 seconds to simulate get call');
    var responseID = 19;
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "Get DraftContent As HTML",
                "body": {
                    "cmsOperation": "GetDraftContentAsHtml",
                    "notificationTopic": "NA",
                    "notificationType": 0,
                    "responseId": responseID
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);

    }, 5000)
    res.send({ responseId: responseID });
});

app.get('/api/Drafts/:draftId/validate', function (req, res) {
    console.log('Validate GDoc is called, sending response id ' + _responseId);
    console.log('Waiting for 30 seconds to simulate get call');
    var responseID = 20;
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "Validate Draft Content",
                "body": {
                    "cmsOperation": "ValidateDraftContent",
                    "notificationTopic": "NA",
                    "notificationType": 0,
                    "responseId": responseID
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);

    }, 5000)
    res.send({ responseId: responseID });
});

app.get('/api/tabs', function (req, res) {
    var tabData = {
        "tabs": [
            {
                "title": "GDoc",
                "apiURL": "https://treeviewcomponentnodejsapp.azurewebsites.net/api/node/gdoc",
                "displayContentInIframe": true
            },
            {
                "title": "HTML",
                "apiURL": "https://treeviewcomponentnodejsapp.azurewebsites.net/api/node/html",
                "displayContentInIframe": false
            },
            {
                "title": ".md",
                "apiURL": "https://treeviewcomponentnodejsapp.azurewebsites.net/api/node/md",
                "displayContentInIframe": false
            },
            {
                "title": "preview",
                "apiURL": "https://treeviewcomponentnodejsapp.azurewebsites.net/api/node/html",
                "displayContentInIframe": false
            },
            {
                "title": "history",
                "apiURL": "https://treeviewcomponentnodejsapp.azurewebsites.net/api/node/md",
                "displayContentInIframe": false
            }
        ],
        "defaultTab": 0
    };

    res.send({ data: tabData });
});

app.get('/api/tags/:tagGroupId/tags', function (req, res) {
    console.log('GET Tags called, sending response id ' + _responseId);
    console.log('Waiting for 30 seconds to simulate get call');
    var responseID = 12;
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "Get Tags For TagGroup",
                "body": {
                    "cmsOperation": "GetTagsForTagGroup",
                    "notificationTopic": "NA",
                    "notificationType": 0,
                    "responseId": responseID
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);

    }, 5000)
    res.send({ responseId: responseID });

});

app.get('/api/Nodes/:nodeId/tags1', function (req, res) {
    console.log('GET Tags for Node called, sending response id ' + _responseId);
    console.log('Waiting for 30 seconds to simulate get call');
    var responseID = 24;
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "Get Tags For Node",
                "body": {
                    "cmsOperation": "GetTagsForNode",
                    "notificationTopic": "NA",
                    "notificationType": 0,
                    "responseId": responseID
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);

    }, 5000)
    res.send({ responseId: responseID });

});

app.get('/api/Projects/:projectId/tags', function (req, res) {
    console.log('GET Tags for project called, sending response id ' + _responseId);
    console.log('Waiting for 30 seconds to simulate get call');
    var responseID = 25;
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "Get Tags For Node",
                "body": {
                    "cmsOperation": "GetTagsForProject",
                    "notificationTopic": "NA",
                    "notificationType": 0,
                    "responseId": responseID
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);

    }, 5000)
    res.send({ responseId: responseID });

});

app.get('/api/tagGroups', function (req, res) {
    var responseId = addResponsesToFireStore('GetAllTagGroupsAndTags', '0', '');
    res.send({ responseId: responseId });
});

app.get('/api/draftTags/:draftId', function (req, res) {
    console.log('GET Draft Tags called, sending response id ' + _responseId);
    console.log('Waiting for 30 seconds to simulate get call');
    var responseID = 13;
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "Get Draft Tags",
                "body": {
                    "cmsOperation": "GetDraftTags",
                    "notificationTopic": "NA",
                    "notificationType": 0,
                    "responseId": responseID
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);

    }, 5000)
    res.send({ responseId: responseID });

});

app.get('/api/Drafts/:draftId/AcceptDraftToLive', function (req, res) {
    console.log('Accept to Live is called, sending response id ' + _responseId);
    console.log('Waiting for 5 seconds to simulate get call');
    var responseID = 16;
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "Accept Draft To Live",
                "body": {
                    "cmsOperation": "AcceptDraftToLive",
                    "notificationTopic": "NA",
                    "notificationType": 0,
                    "responseId": responseID
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);

    }, 5000)
    res.send({ responseId: responseID });

});

app.get('/api/nodes/:NodeId/drafts', function (req, res) {
    console.log('GET Node Drafts  called, sending response id ' + _responseId);
    console.log('Waiting for 30 seconds to simulate get call');
    var responseID = 15;
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "Get Node Drafts",
                "body": {
                    "cmsOperation": "GetDraftsForNode",
                    "notificationTopic": "NA",
                    "notificationType": 0,
                    "responseId": responseID
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);

    }, 5000)
    res.send({ responseId: responseID });

});

app.get('/api/updateDraftTags/:tagId', function (req, res) {
    console.log('Update Draft Tags called, sending response id ' + _responseId);
    console.log('Waiting for 30 seconds to simulate get call');
    var responseID = 14;
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "Update Draft Tags",
                "body": {
                    "cmsOperation": "UpdateDraftTags",
                    "notificationTopic": "NA",
                    "notificationType": 0,
                    "responseId": responseID
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);

    }, 5000)
    res.send({ responseId: responseID });

});

app.get('/api/Projects/:projectId/Branches', function (req, res) {
    console.log('GET branches called, sending response id ' + _responseId);
    console.log('Waiting for 30 seconds to simulate get call');
    var responseID = 7;
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "Get Branches",
                "body": {
                    "cmsOperation": "GetDistributionBranches",
                    "notificationTopic": "NA",
                    "notificationType": 0,
                    "responseId": responseID
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);

    }, 5000)
    res.send({ responseId: responseID });
});

app.get('/api/Projects/:id/distributions', function (req, res) {
    console.log('GET Distributions called, sending response id ' + _responseId);
    console.log('Waiting for 30 seconds to simulate get project call');
    var projectId = req.params.id;
    console.log(projectId);
    var responseID = 6;
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "Get Distributions",
                "body": {
                    "cmsOperation": "GetDistributionsForProject",
                    "notificationTopic": "NA",
                    "notificationType": 0,
                    "responseId": responseID
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);

    }, 5000)
    res.send({ responseId: responseID });
});

app.get('/api/DistributionsForCreate/:id', function (req, res) {
    console.log('GET Distributions called, sending response id ' + _responseId);
    console.log('Waiting for 30 seconds to simulate get project call');
    var projectId = req.params.id;
    console.log(projectId);
    var responseID = 5;
    if (projectId === "test1") {
        responseID = 6;
    }

    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "Get Distributions",
                "body": {
                    "cmsOperation": "getDistributionsForCreate",
                    "notificationTopic": "NA",
                    "notificationType": 0,
                    "responseId": responseID
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);

    }, 5000)
    res.send({ responseId: responseID });
});

app.get('/api/project/:id', function (req, res) {
    var projectId = req.query.id;
    console.log('project id ' + projectId);
    var project = {
        'files':
            [
                {
                    'label': 'Working in Unity',

                    'expandedIcon': 'fa-folder-open',
                    'collapsedIcon': 'fa-folder',
                    'children': [
                        {
                            'label': 'Basics',

                            'expandedIcon': 'fa-folder-open',
                            'collapsedIcon': 'fa-folder',
                            'children': [
                                {
                                    'label': 'Downloading and installing Unity',

                                    'expandedIcon': 'fa-folder-open',
                                    'collapsedIcon': 'fa-folder',
                                    'children': [
                                        {
                                            'label': 'Deploying Unity offline',
                                            'icon': 'fa-file-word-o',
                                            'data': 'Deploying Unity offline'
                                        }
                                    ]
                                },
                                {
                                    'label': '2D or 3D projects',
                                    'icon': 'fa-file-word-o',
                                    'data': '2D or 3D projects'
                                },
                                {
                                    'label': 'Getting started',

                                    'expandedIcon': 'fa-folder-open',
                                    'collapsedIcon': 'fa-folder',
                                    'children': [
                                        {
                                            'label': 'The Learn tab',
                                            'icon': 'fa-file-word-o',
                                            'data': 'The Learn tab'
                                        }
                                    ]
                                },
                                {
                                    'label': 'Learning the interface',
                                    'icon': 'fa-file-word-o',
                                    'data': 'Learning the interface'
                                }
                            ]
                        },
                        {
                            'label': 'Asset Workflow',

                            'expandedIcon': 'fa-folder-open',
                            'collapsedIcon': 'fa-folder',
                            'children': [
                                {
                                    'label': 'Primitive and Placeholder Objects',
                                    'icon': 'fa-file-word-o',
                                    'data': 'Primitive and Placeholder Objects'
                                },
                                {
                                    'label': 'Importing Assets',
                                    'icon': 'fa-file-word-o',
                                    'data': 'Importing Assets'
                                },
                                {
                                    'label': 'Imort Settings',
                                    'icon': 'fa-file-word-o',
                                    'data': 'Imort Settings'
                                },
                                {
                                    'label': 'Importing from the Asset Store',
                                    'icon': 'fa-file-word-o',
                                    'data': 'Importing from the Asset Store'
                                },
                                {
                                    'label': 'Asset Packages',
                                    'icon': 'fa-file-word-o',
                                    'data': 'Asset Packages'
                                },
                                {
                                    'label': 'Standard Assets',
                                    'icon': 'fa-file-word-o',
                                    'data': 'Standard Assets'
                                }
                            ]
                        }
                    ]
                },
                {
                    'label': '2D',

                    'expandedIcon': 'fa-folder-open',
                    'collapsedIcon': 'fa-folder',
                    'children': [
                        {
                            'label': 'Gameplay in 2D',
                            'icon': 'fa-file-image-o',
                            'data': 'Gameplay in 2D'
                        },
                        {
                            'label': 'Sprites',

                            'expandedIcon': 'fa-folder-open',
                            'collapsedIcon': 'fa-folder',
                            'children': [
                                {
                                    'label': 'Sprite Creator',
                                    'icon': 'fa-file-image-o',
                                    'data': 'Sprite Creator'
                                },
                                {
                                    'label': 'Sprite Editor',
                                    'icon': 'fa-file-image-o',
                                    'data': 'Sprite Editor'
                                },
                                {
                                    'label': 'Sprite Masks',
                                    'icon': 'fa-file-image-o',
                                    'data': 'Sprite Masks'
                                }
                            ]
                        },
                        {
                            'label': 'Physics Reference 2D',

                            'expandedIcon': 'fa-folder-open',
                            'collapsedIcon': 'fa-folder',
                            'children': [
                                {
                                    'label': 'Physics 2D Settings',
                                    'icon': 'fa-file-image-o',
                                    'data': 'Physics 2D Settings'
                                },
                                {
                                    'label': 'Rigidbody 2D',
                                    'icon': 'fa-file-image-o',
                                    'data': 'Rigidbody 2D'
                                }
                            ]
                        }
                    ]
                }
            ],
        distributions: ['5.0', '5.1', '5.2', '5.3', '5.4'],
        languages: ['English', 'Español', 'Deutsch', 'Française']
    }

    res.send({ data: project });
});

app.post('/api/Assets', function (req, res) {

    var AssetType = req.body.assetType;
    var responseID = AssetType == 2 ? 101 : 109;
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "Upload Asset",
                "body": {
                    "cmsOperation": "UpsertAsset",
                    "notificationTopic": "NA",
                    "notificationType": 0,
                    "responseId": responseID
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);

    }, 5000)
    res.send({ responseId: responseID });
})

app.put('/api/Assets', function (req, res) {
    var AssetType = req.body.assetType;
    var responseID = AssetType == 2 ? 106 : 110;
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "Upsert Asset",
                "body": {
                    "cmsOperation": "UpsertAsset",
                    "notificationTopic": "NA",
                    "notificationType": 0,
                    "responseId": responseID
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);

    }, 5000)
    res.send({ responseId: responseID });
})

app.post('/api/getassets', function (req, res) {
    var assetType = req.body.assetType;
    var tabindex = req.body.filterQuery;
    var responseID;
    console.log('assetType is: ' + assetType);
    console.log('tabindex is: ' + tabindex);
    if (assetType === 1) { //code blocks
        switch (tabindex) {
            case 0:
                responseID = 107; // recent assets
                break;
            case 1:
                responseID = 111; // uploaded by me assets
                break;
        }
    }
    else { // image
        switch (tabindex) {
            case 0:
                responseID = 102; // recent assets
                break;
            case 1:
                responseID = 103; // uploaded by me assets
                break;
        }
    }
    console.log('responseId is: ' + responseID);
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "Get Assets",
                "body": {
                    "cmsOperation": "GetAssets",
                    "notificationTopic": "NA",
                    "notificationType": 0,
                    "responseId": responseID
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);

    }, 5000)
    setTimeout(function () {
        res.send({ responseId: responseID });
    }, 1000);
})

app.get('/api/assets/:id', function (req, res) {
    var id = req.params.id;
    console.log('id is: ' + id);

    var asset = _.where(assetArray, { assetId: id });
    if (asset[0].assetType == 2)
        responseID = 104; // get asset image
    else
        responseID = 108; //code block

    console.log('responseId is: ' + responseID);
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "Get Assets",
                "body": {
                    "cmsOperation": "GetAsset",
                    "notificationTopic": "NA",
                    "notificationType": 0,
                    "responseId": responseID
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);

    }, 5000)
    setTimeout(function () {
        res.send({ responseId: responseID });
    }, 1000);
})

app.put('/api/assets/UpdateAssetProperties', function (req, res) {
    var id = req.query.id;
    console.log('id is: ' + id);

    responseID = 105; // update asset

    console.log('responseId is: ' + responseID);
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "Update Assets",
                "body": {
                    "cmsOperation": "UpdateAssetProperties",
                    "notificationTopic": "NA",
                    "notificationType": 0,
                    "responseId": responseID
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);

    }, 5000)
    setTimeout(function () {
        res.send({ responseId: responseID });
    }, 1000);
})

app.get('/api/Projects/:projectId/tagGroups', function (req, res) {
    var id = req.query.id;
    responseID = 26;
    console.log('responseId is: ' + responseID);
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "get Tag Groups for Project",
                "body": {
                    "cmsOperation": "GetTagGroupsForProject",
                    "notificationTopic": "NA",
                    "notificationType": 0,
                    "responseId": responseID
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);

    }, 5000)
    res.send({ responseId: responseID });
})

app.put('/api/Projects/AddTagGroupsToProject', function (req, res) {
    var id = req.query.id;
    responseID = 27;

    console.log('responseId is: ' + responseID);
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "Add TagGroups to Project",
                "body": {
                    "cmsOperation": "AddTagGroupsToProject",
                    "notificationTopic": "NA",
                    "notificationType": 0,
                    "responseId": responseID
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);

    }, 5000)
    res.send({ responseId: responseID });
})

app.get('/api/nodes/:nodeId/tags', function (req, res) {
    var id = req.query.id;
    responseID = 28;
    console.log('responseId is: ' + responseID);
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "get Tags for Node",
                "body": {
                    "cmsOperation": "GetTagsForNode",
                    "notificationTopic": "NA",
                    "notificationType": 0,
                    "responseId": responseID
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);

    }, 5000)
    res.send({ responseId: responseID });
})

app.put('/api/nodes/AddTagsToNode', function (req, res) {
    var id = req.query.id;
    responseID = 29;

    console.log('responseId is: ' + responseID);
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "Add Tags to Node",
                "body": {
                    "cmsOperation": "AddTagsToNode",
                    "notificationTopic": "NA",
                    "notificationType": 0,
                    "responseId": responseID
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);

    }, 5000)
    res.send({ responseId: responseID });
})

app.get('/api/getOperations', function (req, res) {
    responseID = 112;
    console.log('responseId is: ' + responseID);
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "Get Operation",
                "body": {
                    "cmsOperation": "GetOperationList",
                    "notificationTopic": "NA",
                    "notificationType": 0,
                    "responseId": responseID
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);

    }, 5000)
    res.send({ responseId: responseID });
})

app.get('/api/Publishing/GetPublishQueues', function (req, res) {
    console.log('responseId is: 113');
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "Get PublishQueues",
                "body": {
                    "cmsOperation": "GetPublishQueues",
                    "notificationTopic": "NA",
                    "notificationType": 0,
                    "responseId": 113
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);

    }, 5000)
    res.send({ responseId: 113 });
})

app.post('/api/Publishing/PublishDistribution', function (req, res) {
    responseID = 114;
    console.log('responseId is: ' + responseID);
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "Post PublishDistribution",
                "body": {
                    "cmsOperation": "PublishDistribution",
                    "notificationTopic": "NA",
                    "notificationType": 0,
                    "responseId": responseID
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);

    }, 5000)
    res.send({ responseId: responseID });
})

app.get('/api/Publishing/GetNodesForLiveDraftsAfterDistributionPublish/:nodeId', function (req, res) {
    responseID = 115;
    console.log('responseId is: ' + responseID);
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "Post PublishDistribution",
                "body": {
                    "cmsOperation": "GetNodesForLiveDraftsAfterDistributionPublish",
                    "notificationTopic": "NA",
                    "notificationType": 0,
                    "responseId": responseID
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);

    }, 5000)
    res.send({ responseId: responseID });
})

app.get('/api/Publishing/GetDistributionsQueuedForPublish', function (req, res) {
    responseID = 116;
    console.log('responseId is: ' + responseID);
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "Post PublishDistribution",
                "body": {
                    "cmsOperation": "GetDistributionsQueuedForPublish",
                    "notificationTopic": "NA",
                    "notificationType": 0,
                    "responseId": responseID
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);

    }, 5000)
    res.send({ responseId: responseID });
})

var sendFCMNotification = function(asd){

}
var projectData = [
    { 'id': '1', 'projectName': 'Unity1', 'repoUrl': 'Unity1.com' },
    { 'id': '2', 'projectName': 'Unity2', 'repoUrl': 'Unity2.com' },
    { 'id': '3', 'projectName': 'Unity3', 'repoUrl': 'Unity3.com' },
    { 'id': '4', 'projectName': 'Unity4', 'repoUrl': 'Unity4.com' },
    { 'id': '5', 'projectName': 'Unity5', 'repoUrl': 'Unity5.com' }
];

var distributions = [
    {
        'distributionId': '5.0',
        'distributionName': '5.0',
        'isDefault': false,
        'status': 'Completed'
    },
    {
        'distributionId': '5.1',
        'distributionName': '5.1',
        'isDefault': true,
        'status': 'Completed'
    },
    {
        'distributionId': '5.2',
        'distributionName': '5.2',
        'isDefault': false,
        'status': 'Completed'
    },
    {
        'distributionId': '5.3',
        'distributionName': '5.3',
        'isDefault': false,
        'status': 'InProgress'
    },
    {
        'distributionId': '5.4',
        'distributionName': '5.4',
        'isDefault': false,
        'status': 'Completed'
    },
    {
        'distributionId': '5.5',
        'distributionName': '5.5',
        'isDefault': false,
        'status': 'Completed'
    }
];

var FileContentAsHtml = '<h3>Related articles</h3>    <ul>              <li>          <a href="/hc/en-us/articles/206604236-Android-Library-Project-Native-Plugins-not-displaying-properly-in-Inspector-Window">Android Library Project (Native Plugins) not displaying properly in Inspector Window</a>        </li>              <li>          <a href="/hc/en-us/articles/206217436-Why-can-t-I-see-Shadows-on-some-of-my-Android-Devices-">Why can&#39;t I see Shadows on some of my Android Devices?</a>        </li>              <li>          <a href="/hc/en-us/articles/208246446-libhoudini-so-crashes-on-Android-x86-devices">libhoudini.so crashes on Android x86 devices</a>        </li>              <li>          <a href="/hc/en-us/articles/207942813-How-can-I-disable-Bitcode-support-">How can I disable Bitcode support?</a>        </li>              <li>          <a href="/hc/en-us/articles/209933103-Bitcode-Support-in-iOS-tvOS">Bitcode Support in iOS &amp; tvOS</a>        </li>          </ul>';

var FileContentAsMarkdown = '### Related articles *   [Android Library Project (Native Plugins) not displaying properly in Inspector Window](/hc/en-us/articles/206604236-Android-Library-Project-Native-Plugins-not-displaying-properly-in-Inspector-Window)*   [Why can\'t I see Shadows on some of my Android Devices?](/hc/en-us/articles/206217436-Why-can-t-I-see-Shadows-on-some-of-my-Android-Devices-)*   [libhoudini.so crashes on Android x86 devices](/hc/en-us/articles/208246446-libhoudini-so-crashes-on-Android-x86-devices)*   [How can I disable Bitcode support?](/hc/en-us/articles/207942813-How-can-I-disable-Bitcode-support-)*   [Bitcode Support in iOS & tvOS](/hc/en-us/articles/209933103-Bitcode-Support-in-iOS-tvOS) ';

var distributionBranches = [
    {
        'branchID': '1',
        'name': 'branch1',
    },
    {
        'branchID': '2',
        'name': 'branch2',
    },
    {
        'branchID': '3',
        'name': 'branch3',
    },
    {
        'branchID': '4',
        'name': 'branch4',
    },
    {
        'branchID': '5',
        'name': 'branch5',
    },
    {
        'branchID': '6',
        'name': 'branch6',
    },
];

var Emptydistributions = [
];

var typeOfContentArray = [
    { key: '1', value: 'Knowledge Base' },
    { key: '2', value: 'Tutorials' },
    { key: '3', value: 'Manuals' },
    { key: '4', value: 'Script Ref' },
];

var projectArray = [
    {
        'projectName': 'Unity Core User Manual',
        'repositoryId': '1',
        'repositoryName': null,
        'description': 'Unity Core User Manual description',
        'typeOfContent': 3,
        '_id': '1',
        'tagGroupIds': ['1', '2'],
        'status': 3
    },

    {
        'projectName': 'Unity Core User Manual2',
        'repositoryId': '1',
        'repositoryName': null,
        'description': 'Unity Core User Manual 2 description',
        'typeOfContent': 3,
        '_id': '2',
        'tagGroupIds': ['1', '3'],
        'status': 1
    },
    {
        'projectName': 'Unity Core User Manual3',
        'repositoryId': '1',
        'repositoryName': null,
        'description': 'Unity Core User Manual  3 description',
        'typeOfContent': 3,
        '_id': '3',
        'tagGroupIds': ['2', '4'],
        'status': 2
    },
    {
        'projectName': 'Unity Core User Manual 4',
        'repositoryId': '1',
        'repositoryName': null,
        'description': 'Unity Core User Manual 4 description',
        'typeOfContent': 3,
        '_id': '4',
        'tagGroupIds': ['1', '2', '5'],
        'status': 0
    },
    {
        'projectName': 'test1',
        'repositoryId': '1',
        'repositoryName': null,
        'description': 'test1 description',
        'typeOfContent': 3,
        '_id': '5',
        'tagGroupIds': ['1', '2'],
        'status': 2
    },

    {
        'projectName': 'test2',
        'repositoryId': '1',
        'repositoryName': null,
        'description': 'test2 description',
        'typeOfContent': 3,
        '_id': '6',
        'tagGroupIds': ['1', '3'],
        'status': 1
    },
    {
        'projectName': 'Unit01',
        'repositoryId': '1',
        'repositoryName': null,
        'description': 'demo project',
        'typeOfContent': 3,
        '_id': '7',
        'tagGroupIds': ['2', '4'],
        'status': 2
    },
    {
        'projectName': 'unity02',
        'repositoryId': '1',
        'repositoryName': null,
        'description': 'test project',
        'typeOfContent': 3,
        '_id': '8',
        'tagGroupIds': ['1', '2', '5'],
        'status': 0
    }];

var tagData = [
    { 'tagId': '1', 'tagName': 'EN', 'tagGroup': 'language', 'tagColor': 'primary' },
    { 'tagId': '2', 'tagName': 'FR', 'tagGroup': 'language', 'tagColor': 'primary' },
    { 'tagId': '3', 'tagName': 'GR', 'tagGroup': 'language', 'tagColor': 'primary' },
    { 'tagId': '4', 'tagName': 'CH', 'tagGroup': 'language', 'tagColor': 'primary' },
    { 'tagId': '5', 'tagName': 'novice', 'tagGroup': 'level', 'tagColor': 'warn' },
    { 'tagId': '6', 'tagName': 'intermediate', 'tagGroup': 'level', 'tagColor': 'warn' },
    { 'tagId': '7', 'tagName': 'pro', 'tagGroup': 'level', 'tagColor': 'warn' },
    { 'tagId': '8', 'tagName': 'expert', 'tagGroup': 'level', 'tagColor': 'warn' },
    { 'tagId': '9', 'tagName': 'coding', 'tagGroup': 'type', 'tagColor': 'accent' },
    { 'tagId': '10', 'tagName': 'developement', 'tagGroup': 'type', 'tagColor': 'accent' },
    { 'tagId': '11', 'tagName': 'testing', 'tagGroup': 'type', 'tagColor': 'accent' },
    { 'tagId': '12', 'tagName': 'production', 'tagGroup': 'type', 'tagColor': 'accent' },
    { 'tagId': '13', 'tagName': 'new', 'tagGroup': 'stage', 'tagColor': 'primary' },
    { 'tagId': '14', 'tagName': 'draft', 'tagGroup': 'stage', 'tagColor': 'primary' },
    { 'tagId': '15', 'tagName': 'review', 'tagGroup': 'stage', 'tagColor': 'primary' },
    { 'tagId': '16', 'tagName': 'completed', 'tagGroup': 'stage', 'tagColor': 'primary' }
];

var tags =
    [{ 'tagId': '1', 'tagName': 'tag1' },
    { 'tagId': '2', 'tagName': 'tag2' },
    { 'tagId': '3', 'tagName': 'tag3' },
    { 'tagId': '4', 'tagName': 'tag4' }
    ]

var nodeTags = [
    { 'tagId': '1', 'tagName': 'tag1', 'tagGroupId': '1' },
    { 'tagId': '2', 'tagName': 'tag2', 'tagGroupId': '1' },
    { 'tagId': '5', 'tagName': 'tag5', 'tagGroupId': '2' },
    { 'tagId': '11', 'tagName': 'tag11', 'tagGroupId': '3' }
]

var projectTags =
    [{ 'tagId': '1', 'tagName': 'tag1', 'tagGroupId': '1' },
    { 'tagId': '2', 'tagName': 'tag2', 'tagGroupId': '1' },
    { 'tagId': '3', 'tagName': 'tag3', 'tagGroupId': '1' },
    { 'tagId': '4', 'tagName': 'tag4', 'tagGroupId': '1' },
    { 'tagId': '5', 'tagName': 'tag5', 'tagGroupId': '2' },
    { 'tagId': '6', 'tagName': 'tag6', 'tagGroupId': '2' },
    { 'tagId': '7', 'tagName': 'tag7', 'tagGroupId': '2' },
    { 'tagId': '8', 'tagName': 'tag8', 'tagGroupId': '2' },
    { 'tagId': '9', 'tagName': 'tag9', 'tagGroupId': '3' },
    { 'tagId': '10', 'tagName': 'tag10', 'tagGroupId': '3' },
    { 'tagId': '11', 'tagName': 'tag11', 'tagGroupId': '3' },
    { 'tagId': '12', 'tagName': 'tag12', 'tagGroupId': '3' }
    ]

var tagGroups = [
    {
        'tagGroupId': '1',
        'tagGroupName': 'status ',
        'colour': 'warn',
        'limitToOne': true,
        'childNodesInherit': false,
        'displayGroupName': true,
        'public': false,
        'publish': true,
        'tags': tags
    },
    {
        'tagGroupId': '2',
        'tagGroupName': 'Priority ',
        'colour': 'warn',
        'limitToOne': false,
        'childNodesInherit': false,
        'displayGroupName': true,
        'public': false,
        'publish': true,
        'tags': tags
    },
    {
        'tagGroupId': '3',
        'tagGroupName': 'content ',
        'colour': 'warn',
        'limitToOne': true,
        'childNodesInherit': true,
        'displayGroupName': true,
        'public': false,
        'publish': true,
        'tags': tags
    },
    {
        'tagGroupId': '4',
        'tagGroupName': 'difficulty Level ',
        'colour': 'warn',
        'limitToOne': true,
        'childNodesInherit': false,
        'displayGroupName': true,
        'public': false,
        'publish': true,
        'tags': tags
    },
    {
        'tagGroupId': '5',
        'tagGroupName': 'type ',
        'colour': 'primary',
        'limitToOne': true,
        'childNodesInherit': true,
        'displayGroupName': false,
        'public': false,
        'publish': true,
        'tags': tags
    }];

var userDetails = [
    {
        "userId": "5a7980b349c7bd06003474c9",
        "firstName": "Pavan",
        "lastName": "Reddy",
        "emailId": "pavanr@unitydevlab.local",
        "createdBy": null,
        "createdDate": 1517912243
    },
    {
        "userId": "5a7980b349c7bd06003474c8",
        "firstName": "Shashi",
        "lastName": "Gunda",
        "emailId": "shashig@unitydevlab.local",
        "createdBy": null,
        "createdDate": 1517912243
    },
    {
        "userId": "5a7980b349c7bd06003474c7",
        "firstName": "sahu",
        "lastName": "mohit",
        "emailId": "sahum@unitydevlab.local",
        "createdBy": null,
        "createdDate": 1517912243
    },
    {
        "userId": "5a7980b349c7bd06003474c6",
        "firstName": "bandari",
        "lastName": "bupendra",
        "emailId": "bandarib@unitydevlab.local",
        "createdBy": null,
        "createdDate": 1517912243
    }

]

var searchedUsers = [
    {
        "userId": "5a7980b349c7bd06003474c0",
        "firstName": "Shashi",
        "lastName": "Kiran",
        "emailId": "shashik@unitydevlab.local",
        "createdBy": null,
        "createdDate": 1517912243
    },
    {
        "userId": "5a7980b349c7bd06003474c1",
        "firstName": "sahu",
        "lastName": "ranjan",
        "emailId": "sahur@unitydevlab.local",
        "createdBy": null,
        "createdDate": 1517912243
    },
    {
        "userId": "5a7980b349c7bd06003474c6",
        "firstName": "bandari",
        "lastName": "bupendra",
        "emailId": "bandarib@unitydevlab.local",
        "createdBy": null,
        "createdDate": 1517912243
    }

]
var draftTags = [
    { 'tagId': '1', 'tagName': 'EN', 'tagGroup': 'language', 'tagColor': 'primary' },
    { 'tagId': '5', 'tagName': 'novice', 'tagGroup': 'level', 'tagColor': 'warn' },
    { 'tagId': '9', 'tagName': 'coding', 'tagGroup': 'type', 'tagColor': 'accent' },
    { 'tagId': '13', 'tagName': 'new', 'tagGroup': 'stage', 'tagColor': 'primary' }
];

var TreeDrafts =
    [
        { 'nodeId': "1", "nodeName": "Working in Unity", 'parentId': null, 'tagIds': ['1', '13', '12', '11', '43'] },
        { 'nodeId': "2", "nodeName": "Basics", 'parentId': "1", 'tagIds': ['1', '42', '12', '11', '43'] },
        { 'nodeId': "3", "nodeName": "Getting started", 'parentId': "1", 'tagIds': ['11', '13', '12', '3'] },
        { 'nodeId': "4", "nodeName": "Downloading and installing Unity", 'parentId': "2", 'tagIds': ['1', '12', '3'] },
        { 'nodeId': "5", "nodeName": "Work", 'parentId': null, 'tagIds': ['1', '11', '13'] },
        { 'nodeId': "6", "nodeName": "sampleParentNode", 'parentId': null, 'tagIds': ['41', '42', '43'] },
        { 'nodeId': "7", "nodeName": "Downloading...", 'parentId': "4", 'tagIds': ['11', '12', '3'] }
    ]

var drafts = [
    { "draftId": "1", "draftName": "Draft", "gDocUrl": "https://docs.google.com/document/d/1voStCF9kssLiTzPZKB9fTjSZlrzTIolT2f6abjmiJrg/edit" },
    { "draftId": "2", "draftName": "Final", "gDocUrl": "https://docs.google.com/document/d/1voStCF9kssLiTzPZKB9fTjSZlrzTIolT2f6abjmiJrg/edit" },
    { "draftId": "3", "draftName": "First Notes", "gDocUrl": "https://docs.google.com/document/d/1voStCF9kssLiTzPZKB9fTjSZlrzTIolT2f6abjmiJrg/edit" },
    { "draftId": "4", "draftName": "WIP", "gDocUrl": "https://docs.google.com/document/d/1voStCF9kssLiTzPZKB9fTjSZlrzTIolT2f6abjmiJrg/edit" }];

var drafts1 = [
    { "draftId": "12", "draftName": "Draft1", "gDocUrl": "test" },
    { "draftId": "22", "draftName": "Final1", "gDocUrl": "test" },
    { "draftId": "32", "draftName": "First Notes1", "gDocUrl": "test" },
    { "draftId": "42", "draftName": "WIP1", "gDocUrl": "test" }];

var repositories = [
    { 'repositoryId': '1', 'repositoryName': 'EN' },
    { 'repositoryId': '2', 'repositoryName': 'EN2' },
    { 'repositoryId': '3', 'repositoryName': 'EN3' },
    { 'repositoryId': '4', 'repositoryName': 'EN4' },
];

var assetArray = [
    {
        'assetId': '11111',
        'assetType': 2,
        'fileName': 'BHUPENDRA TEST',
        'fileSize': '1000 KB',
        'assetContent': 'assets/img/thumbnails/project3-thumb.jpg',
        'unityProjectSource': 'ABC',
        'instructionsToReCreateImage': 'NA',
        'depicted': 'NA',
        'altTitle': 'NA',
        'description': 'NA',
        'uploadedBy': 'Unity I',
        'uploadedDate': '10/10/2017'
    },
    {
        'assetId': '11112',
        'assetType': 2,
        'fileName': 'Unity II',
        'fileSize': '10 KB',
        'assetContent': 'assets/img/thumbnails/AreaLights-thumb.jpg',
        'unityProjectSource': 'ABC',
        'instructionsToReCreateImage': 'NA',
        'depicted': 'NA',
        'altTitle': 'NA',
        'description': 'NA',
        'uploadedBy': 'BHUPENDRA',
        'uploadedDate': '10/10/2017'
    },
    {
        'assetId': '11113',
        'assetType': 2,
        'fileName': 'Unity III',
        'fileSize': '100 KB',
        'assetContent': 'assets/img/thumbnails/unity_presents-thumb.jpg',
        'unityProjectSource': 'ABC',
        'instructionsToReCreateImage': 'NA',
        'depicted': 'NA',
        'altTitle': 'NA',
        'description': 'NA',
        'uploadedBy': 'BHUPENDRA',
        'uploadedDate': '10/10/2017'
    },
    {
        'assetId': '11114',
        'assetType': 2,
        'fileName': 'Unity IV',
        'fileSize': '1020 KB',
        'assetContent': 'assets/img/thumbnails/project2-thumb.jpg',
        'unityProjectSource': 'ABC',
        'instructionsToReCreateImage': 'NA',
        'depicted': 'NA',
        'altTitle': 'NA',
        'description': 'NA',
        'uploadedBy': 'Manish',
        'uploadedDate': '10/10/2017'
    },
    {
        'assetId': '11115',
        'assetType': 2,
        'fileName': 'Unity V',
        'fileSize': '1300 KB',
        'assetContent': 'assets/img/thumbnails/project3-thumb.jpg',
        'unityProjectSource': 'ABC',
        'instructionsToReCreateImage': 'NA',
        'depicted': 'NA',
        'altTitle': 'NA',
        'description': 'NA',
        'uploadedBy': 'Manish',
        'uploadedDate': '10/10/2017'
    },
    {
        'assetId': '11116',
        'assetType': 2,
        'fileName': 'code',
        'fileSize': '1800 KB',
        'assetContent': 'assets/img/thumbnails/project1-thumb.jpg',
        'unityProjectSource': 'ABC',
        'instructionsToReCreateImage': 'NA',
        'depicted': 'NA',
        'altTitle': 'NA',
        'description': 'NA',
        'uploadedBy': 'BHUPENDRA',
        'uploadedDate': '10/10/2017'
    },
    {
        'assetId': '11117',
        'assetType': 1,
        'fileName': 'test',
        'fileSize': '1000 KB',
        'assetContent': 'using&nbsp;System;<br />using&nbsp;System.Reflection;<br /><br />namespace&nbsp;ConsoleApp01<br />{<br />&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;class&nbsp;ConsoleApp01<br />&nbsp;&nbsp;&nbsp;&nbsp;{<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;Main(string[]&nbsp;args)<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("");<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("");<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("Hello&nbsp;from&nbsp;ReactOS&nbsp;on&nbsp;"&nbsp;+&nbsp;Environment.MachineName&nbsp;+&nbsp;"!");<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("OS&nbsp;Version:&nbsp;"&nbsp;+&nbsp;Environment.OSVersion);<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("Image&nbsp;runtime&nbsp;Version:&nbsp;"&nbsp;+<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Assembly.GetExecutingAssembly().ImageRuntimeVersion.ToString());<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("Environment&nbsp;Version:&nbsp;"&nbsp;+&nbsp;Environment.Version.ToString());<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("Setup&nbsp;information:&nbsp;"&nbsp;+&nbsp;AppDomain.CurrentDomain.SetupInformation);<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("");<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.Write("Press&nbsp;any&nbsp;key&nbsp;to&nbsp;continue...");<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.ReadKey();<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />&nbsp;&nbsp;&nbsp;&nbsp;}<br />}',
        'unityProjectSource': 'ABC',
        'instructionsToReCreateImage': 'NA',
        'depicted': 'NA',
        'altTitle': 'NA',
        'description': 'NA',
        'uploadedBy': 'BHUPENDRA',
        'uploadedDate': '10/10/2017'
    },
    {
        'assetId': '11118',
        'assetType': 1,
        'fileName': 'na',
        'fileSize': '1000 KB',
        'assetContent': 'using&nbsp;System;<br />using&nbsp;System.Reflection;<br /><br />namespace&nbsp;ConsoleApp01<br />{<br />&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;class&nbsp;ConsoleApp01<br />&nbsp;&nbsp;&nbsp;&nbsp;{<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;Main(string[]&nbsp;args)<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("");<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("");<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("Hello&nbsp;from&nbsp;ReactOS&nbsp;on&nbsp;"&nbsp;+&nbsp;Environment.MachineName&nbsp;+&nbsp;"!");<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("OS&nbsp;Version:&nbsp;"&nbsp;+&nbsp;Environment.OSVersion);<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("Image&nbsp;runtime&nbsp;Version:&nbsp;"&nbsp;+<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Assembly.GetExecutingAssembly().ImageRuntimeVersion.ToString());<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("Environment&nbsp;Version:&nbsp;"&nbsp;+&nbsp;Environment.Version.ToString());<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("Setup&nbsp;information:&nbsp;"&nbsp;+&nbsp;AppDomain.CurrentDomain.SetupInformation);<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("");<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.Write("Press&nbsp;any&nbsp;key&nbsp;to&nbsp;continue...");<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.ReadKey();<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />&nbsp;&nbsp;&nbsp;&nbsp;}<br />}',
        'unityProjectSource': 'ABC',
        'instructionsToReCreateImage': 'NA',
        'depicted': 'NA',
        'altTitle': 'NA',
        'description': 'NA',
        'uploadedBy': 'BHUPENDRA',
        'uploadedDate': '10/10/2017'
    },
    {
        'assetId': '11119',
        'assetType': 1,
        'fileName': 'na',
        'fileSize': '1000 KB',
        'assetContent': 'using&nbsp;System;<br />using&nbsp;System.Reflection;<br /><br />namespace&nbsp;ConsoleApp01<br />{<br />&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;class&nbsp;ConsoleApp01<br />&nbsp;&nbsp;&nbsp;&nbsp;{<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;Main(string[]&nbsp;args)<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("");<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("");<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("Hello&nbsp;from&nbsp;ReactOS&nbsp;on&nbsp;"&nbsp;+&nbsp;Environment.MachineName&nbsp;+&nbsp;"!");<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("OS&nbsp;Version:&nbsp;"&nbsp;+&nbsp;Environment.OSVersion);<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("Image&nbsp;runtime&nbsp;Version:&nbsp;"&nbsp;+<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Assembly.GetExecutingAssembly().ImageRuntimeVersion.ToString());<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("Environment&nbsp;Version:&nbsp;"&nbsp;+&nbsp;Environment.Version.ToString());<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("Setup&nbsp;information:&nbsp;"&nbsp;+&nbsp;AppDomain.CurrentDomain.SetupInformation);<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("");<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.Write("Press&nbsp;any&nbsp;key&nbsp;to&nbsp;continue...");<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.ReadKey();<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />&nbsp;&nbsp;&nbsp;&nbsp;}<br />}',
        'unityProjectSource': 'ABC',
        'instructionsToReCreateImage': 'NA',
        'depicted': 'NA',
        'altTitle': 'NA',
        'description': 'NA',
        'uploadedBy': 'Manish',
        'uploadedDate': '10/10/2017'
    },
    {
        'assetId': '11120',
        'assetType': 1,
        'fileName': 'na',
        'fileSize': '1000 KB',
        'assetContent': codeContent,//'using&nbsp;System;<br />using&nbsp;System.Reflection;<br /><br />namespace&nbsp;ConsoleApp01<br />{<br />&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;class&nbsp;ConsoleApp01<br />&nbsp;&nbsp;&nbsp;&nbsp;{<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;Main(string[]&nbsp;args)<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("");<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("");<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("Hello&nbsp;from&nbsp;ReactOS&nbsp;on&nbsp;"&nbsp;+&nbsp;Environment.MachineName&nbsp;+&nbsp;"!");<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("OS&nbsp;Version:&nbsp;"&nbsp;+&nbsp;Environment.OSVersion);<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("Image&nbsp;runtime&nbsp;Version:&nbsp;"&nbsp;+<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Assembly.GetExecutingAssembly().ImageRuntimeVersion.ToString());<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("Environment&nbsp;Version:&nbsp;"&nbsp;+&nbsp;Environment.Version.ToString());<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("Setup&nbsp;information:&nbsp;"&nbsp;+&nbsp;AppDomain.CurrentDomain.SetupInformation);<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine("");<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.Write("Press&nbsp;any&nbsp;key&nbsp;to&nbsp;continue...");<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.ReadKey();<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />&nbsp;&nbsp;&nbsp;&nbsp;}<br />}',
        'unityProjectSource': 'ABC',
        'instructionsToReCreateImage': 'NA',
        'depicted': 'NA',
        'altTitle': 'NA',
        'description': 'NA',
        'uploadedBy': 'Manish',
        'uploadedDate': '10/10/2017'
    }
];

var codeContent = "using System;\r\nusing System.Reflection;\r\n\r\nnamespace ConsoleApp01\r\n{\r\n    public class ConsoleApp01\r\n    {\r\n        public static void Main(string[] args)\r\n        {\r\n            Console.WriteLine(\"\");\r\n            Console.WriteLine(\"\");\r\n            Console.WriteLine(\"Hello from ReactOS on \" + Environment.MachineName + \"!\");\r\n            Console.WriteLine(\"OS Version: \" + Environment.OSVersion);\r\n            Console.WriteLine(\"Image runtime Version: \" +\r\n                              Assembly.GetExecutingAssembly().ImageRuntimeVersion.ToString());\r\n            Console.WriteLine(\"Environment Version: \" + Environment.Version.ToString());\r\n            Console.WriteLine(\"Setup information: \" + AppDomain.CurrentDomain.SetupInformation);\r\n            Console.WriteLine(\"\");\r\n            Console.Write(\"Press any key to continue...\");\r\n            Console.ReadKey();\r\n        }\r\n    }\r\n}";

var operationStatusArray = [
    {
        responseId: 101,
        cmsOperation: 'UpsertAsset',
        description: '',
        status: 1,
        operationContent: 'Asset 1',
        content: {
            'assetId': '11116',
            'assetType': 2,
            'fileName': 'Asset 1',

            'fileSize': '1020 KB',
            'assetContent': 'assets/img/thumbnails/project3-thumb.jpg',
            'unityProjectSource': 'update ',
            'instructionsToReCreateImage': 'update',
            'depicted': 'update',
            'altTitle': 'update',
            'description': 'update',
            'uploadedBy': 'BHUPENDRA',
            'uploadedDate': '10/10/2017'
        }
    },
    {
        responseId: 109,
        cmsOperation: 'UpsertAsset',
        description: '',
        status: 2,
        operationContent: 'Asset 2',
        content: {
            'assetId': '11116',
            'assetType': 2,
            'fileName': 'Update Asset',
            'fileSize': '1020 KB',
            'assetContent': 'assets/img/thumbnails/project3-thumb.jpg',
            'unityProjectSource': 'update ',
            'instructionsToReCreateImage': 'update',
            'depicted': 'update',
            'altTitle': 'update',
            'description': 'update',
            'uploadedBy': 'BHUPENDRA',
            'uploadedDate': '10/10/2017'
        }
    },
    {
        responseId: 106,
        cmsOperation: 'UpsertAsset',
        description: '',
        status: 3,
        operationContent: 'Asset 3',
        content: {
            'assetId': '11116',
            'assetType': 2,
            'fileName': 'Update Asset',
            'fileSize': '1020 KB',
            'assetContent': 'assets/img/thumbnails/project3-thumb.jpg',
            'unityProjectSource': 'update ',
            'instructionsToReCreateImage': 'update',
            'depicted': 'update',
            'altTitle': 'update',
            'description': 'update',
            'uploadedBy': 'BHUPENDRA',
            'uploadedDate': '10/10/2017'
        }
    },
    {
        responseId: 105,
        cmsOperation: 'UpdateAssetProperties',
        description: '',
        status: 1,
        operationContent: 'Asset 4',
        content: {
            'assetId': '11116',
            'assetType': 2,
            'fileName': 'Update Asset',
            'fileSize': '1020 KB',
            'assetContent': 'assets/img/thumbnails/project3-thumb.jpg',
            'unityProjectSource': 'update ',
            'instructionsToReCreateImage': 'update',
            'depicted': 'update',
            'altTitle': 'update',
            'description': 'update',
            'uploadedBy': 'BHUPENDRA',
            'uploadedDate': '10/10/2017'
        }
    },
    {
        responseId: 110,
        cmsOperation: 'UpsertAsset',
        description: '',
        status: 1,
        operationContent: 'Asset 5',
        content: {
            'assetId': '11116',
            'assetType': 2,
            'fileName': 'Update Asset',
            'fileSize': '1020 KB',
            'assetContent': 'assets/img/thumbnails/project3-thumb.jpg',
            'unityProjectSource': 'update ',
            'instructionsToReCreateImage': 'update',
            'depicted': 'update',
            'altTitle': 'update',
            'description': 'update',
            'uploadedBy': 'BHUPENDRA',
            'uploadedDate': '10/10/2017'
        }
    }
];

var publishQueueArray = [
    {
        "publishQueueId": "67316f75-04fe-424c-a3ed-d36d5cc0c82c",
        "projectName": "DocWorksMasterTemp-Project-14Dec-001",
        "distributionName": "DocWorksDistributions-14Dec001",
        "publishedBy": "S-1-5-21-1210654208-2246142303-2829877410-17601",
        "publishedDate": 1515658639,
        "publishStatus": 2,
        "zipFileLink": "https://googledocmdstorage.blob.core.windows.net/cmspublishingstaging/Manuals/2018.1/Manuals_2018.1.zip"
    },
    {
        "publishQueueId": "44d56f3c-30b2-435b-a568-a0d73eb8ba05",
        "projectName": "DocWorksMasterTemp-Project-14Dec-001",
        "distributionName": "DocWorksDistributions-14Dec001",
        "publishedBy": "S-1-5-21-1210654208-2246142303-2829877410-17601",
        "publishedDate": 1515658881,
        "publishStatus": 2,
        "zipFileLink": "https://googledocmdstorage.blob.core.windows.net/cmspublishingstaging/Manuals/2018.1/Manuals_2018.1.zip"
    },
    {
        "publishQueueId": "5c915f78-edb0-43c0-af28-f5d8f9098ad6",
        "projectName": "DocWorksMasterTemp-Project-14Dec-001",
        "distributionName": "DocWorksDistributions-14Dec001",
        "publishedBy": "S-1-5-21-1210654208-2246142303-2829877410-17601",
        "publishedDate": 1515659680,
        "publishStatus": 2,
        "zipFileLink": "https://googledocmdstorage.blob.core.windows.net/cmspublishingstaging/Manuals/2018.1/Manuals_2018.1.zip"
    },
    {
        "publishQueueId": "44d5ceea-4c7c-4fba-809e-fece8846c488",
        "projectName": "DocWorksMasterTemp-Project-14Dec-001",
        "distributionName": "DocWorksDistributions-14Dec001",
        "publishedBy": "S-1-5-21-1210654208-2246142303-2829877410-17601",
        "publishedDate": 1515659680,
        "publishStatus": 2,
        "zipFileLink": "https://googledocmdstorage.blob.core.windows.net/cmspublishingstaging/Manuals/2018.1/Manuals_2018.1.zip"
    },
    {
        "publishQueueId": "5b7ed0a1-0b2f-4ae7-85a7-1ce429118544",
        "projectName": "DocWorksMasterTemp-Project-14Dec-001",
        "distributionName": "DocWorksDistributions-14Dec001",
        "publishedBy": "S-1-5-21-1210654208-2246142303-2829877410-17601",
        "publishedDate": 1515659681,
        "publishStatus": 2,
        "zipFileLink": "https://googledocmdstorage.blob.core.windows.net/cmspublishingstaging/Manuals/2018.1/Manuals_2018.1.zip"
    },
    {
        "publishQueueId": "c0a52d22-2025-447e-a5c8-3052b2ef3b89",
        "projectName": "asd",
        "distributionName": "DocWorksDistributions-14Dec001",
        "publishedBy": "S-1-5-21-1210654208-2246142303-2829877410-17601",
        "publishedDate": 1515659682,
        "publishStatus": 2,
        "zipFileLink": "https://googledocmdstorage.blob.core.windows.net/cmspublishingstaging/Manuals/2018.1/Manuals_2018.1.zip"
    }
];

var liveDraftNodeArray = [
    {
        "nodeId": "5a5e1240334ee78790d27af9",
        "nodeName": "UnityManual"
    },
    {
        "nodeId": "5a5e1240334ee78790d27afa",
        "nodeName": "UnityManual"
    },
    {
        "nodeId": "5a5e1240334ee78790d27afb",
        "nodeName": "ManualVersions"
    },
    {
        "nodeId": "5a5e1240334ee78790d27afc",
        "nodeName": "Switching between Unity versions"
    },
    {
        "nodeId": "5a5e1240334ee78790d27afd",
        "nodeName": "OfflineDocumentation"
    },
    {
        "nodeId": "5a5e1240334ee78790d27afe",
        "nodeName": "WhatsNew56"
    },
    {
        "nodeId": "5a5e1240334ee78790d27aff",
        "nodeName": "Leave Feedback"
    },
    {
        "nodeId": "5a5e1240334ee78790d27b00",
        "nodeName": "InstallingUnity"
    },
    {
        "nodeId": "5a5e1240334ee78790d27b01",
        "nodeName": "Deploying Unity Offline"
    },
    {
        "nodeId": "5a5e122b334ee78790d27002",
        "nodeName": "UnityManualWithDraftLevel3"
    }
];

var publishProjects = [

    {

        "projectId": "5a619f497c78f958a80d8a53",

        "projectName": "DocWorksMasterTemp-Project-19Jan-001",

        "typeOfContent": 3,

        "distributions": [

            {

                "distributionId": "5a619fc47c78f958a80d8a54",

                "distributionName": "DocWorksDistributions-19Jan001",

                "liveDraftsToBePublishedCount": 3

            },

            {

                "distributionId": "5a657d50c10eb5315c25bb37",

                "distributionName": "DocWorksDistributions-22Jan001",

                "liveDraftsToBePublishedCount": 0

            },

            {

                "distributionId": "5a657d6fc10eb5315c25bb53",

                "distributionName": "DocWorksDistributions-22Jan002",

                "liveDraftsToBePublishedCount": 0

            }

        ]

    },

    {

        "projectId": "5a66babf171d946220736c23",

        "projectName": "DocWorksMasterTemp-Project-23Jan-001",

        "typeOfContent": 3,

        "distributions": [

            {

                "distributionId": "5a66bb14171d946220736c24",

                "distributionName": "DocWorksDistributions-23Jan001",

                "liveDraftsToBePublishedCount": 0

            }

        ]

    }

];

console.log('server started');

