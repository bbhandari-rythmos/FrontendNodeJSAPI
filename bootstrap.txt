var express = require('express'),
    path = require('path'),
    app = express(),
    server = require('http').createServer(app).listen(process.env.PORT || 8080),
    bodyParser = require('body-parser'),
    request = require('request'),
    _ = require('underscore');

app.use(express.static(path.join(__dirname, 'app')));


var _token;
var _responseId;

app.use(function (req, res, next) {
    "use strict";
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
    res.header('Access-Control-Allow-Headers', 'origin, content-type, unity-token');
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

var serverKey = 'AAAAogRJ72o:APA91bEeeQ7JM8GdWOOX4ifD1_acP-vpcpX8YKQ6X-7PSRLXINETjBAvNAiwdrqJrWhI8LWSxTyEdTeaw4B7stFyTnMEMPSw4AHxk_W13xigKJcrAAmJzP2DapbUecGfu7rCgAjWuSrk';

//var serverKey = "=AAAAwC9R64E:APA91bF8x_RKTJrsM5CZkrD9Uw_dDyjGK-aAI8EyuCyMzqoRte7F5ioFd2wp1C1-dOsUbQn3K_gKwLBO4Ho1_ztIbJJH4P7eIcNFFU-DrVbYrEcwuGbSEr3ZstzIFSRXfjWd_ZvDikbm";
var auth = "key=" + serverKey;



app.post('/api/Notification/DeviceRegister', function (req, res) {
    var token = req.body.FcmId;
    console.log('token ' + token);

    if (_token) {
        console.log("_token exists: " + _token);
        return;
    }
    _token = token;
    res.send({ result: 'Success' });
});

app.post('/api/Notification/TopicRegister', function (req, res) {
    var topic = req.body.topic;
    console.log('subscribeTopic ' + topic);
    res.send({ status: 'SUCCESS' });
});

app.post('/api/Notification/TopicUnregister', function (req, res) {
    var topic = req.body.topic;
    console.log('unsubscribeTopic ' + topic);
    res.send({ status: 'SUCCESS' });
});

app.get('/api/ping', function (req, res) {
    res.send({ message: 'pong' });
});

app.get('/api/project', function (req, res) {

    console.log('GET projects called, sending response id ' + _responseId);
    console.log('Waiting for 30 seconds to simulate get project call');

    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "Get Projects",
                "body": {
                    "cmsOperation": "GetProjects",
                    "notificationTopic": "NA",
                    "notificationType": 0,
                    "responseId": "1"
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);

    }, 5000)
    res.send({ responseId: "1" });

});

app.get('/api/getTree', function (req, res) {
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "Get Tree",
                "body": {
                    "cmsOperation": "GetTree",
                    "notificationTopic": "NA",
                    "notificationType": 0,
                    "responseId": "2"
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);

    }, 5000)
    res.send({ responseId: "2" });
});

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
        'distributionName':'5.0',
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
    { id: '1', name: 'Knowledge Base' },
    { id: '2', name: 'Tutorials' },
    { id: '3', name: 'Manuals' },
    { id: '4', name: 'Script Ref' },
];

var projectArray = [{
    _id: 1,
    status: "",
    projectName: "Unity Core User Manual"
},
{
    _id: 2,
    status: "",
    projectName: "Unity Core User Manual 2"
},
{
    _id: 3,
    status: "",
    projectName: "Unity Core User Manual 3"
},
{
    _id: 4,
    status: "",
    projectName: "test1"
}];

var tagData = [
    { 'id': '1', 'name': 'EN', 'group': 'language', 'color': 'primary' },
    { 'id': '2', 'name': 'FR', 'group': 'language', 'color': 'primary' },
    { 'id': '3', 'name': 'GR', 'group': 'language', 'color': 'primary' },
    { 'id': '4', 'name': 'CH', 'group': 'language', 'color': 'primary' },
    { 'id': '5', 'name': 'novice', 'group': 'level', 'color': 'warn' },
    { 'id': '6', 'name': 'intermediate', 'group': 'level', 'color': 'warn' },
    { 'id': '7', 'name': 'pro', 'group': 'level', 'color': 'warn' },
    { 'id': '8', 'name': 'expert', 'group': 'level', 'color': 'warn' },
    { 'id': '9', 'name': 'coding', 'group': 'type', 'color': 'accent' },
    { 'id': '10', 'name': 'developement', 'group': 'type', 'color': 'accent' },
    { 'id': '11', 'name': 'testing', 'group': 'type', 'color': 'accent' },
    { 'id': '12', 'name': 'production', 'group': 'type', 'color': 'accent' },
    { 'id': '13', 'name': 'new', 'group': 'stage', 'color': 'primary' },
    { 'id': '14', 'name': 'draft', 'group': 'stage', 'color': 'primary' },
    { 'id': '15', 'name': 'review', 'group': 'stage', 'color': 'primary' },
    { 'id': '16', 'name': 'completed', 'group': 'stage', 'color': 'primary' }
];

var draftTags = [
    { 'id': '1', 'name': 'EN', 'group': 'language', 'color': 'primary' },
    { 'id': '5', 'name': 'novice', 'group': 'level', 'color': 'warn' },
    { 'id': '9', 'name': 'coding', 'group': 'type', 'color': 'accent' },
    { 'id': '13', 'name': 'new', 'group': 'stage', 'color': 'primary' }
];

var TreeDrafts = [
    {
        "documentId": 1,
        "label": "Working in Unity",
        "data": {
            "name": "Working in Unity",
            "status": "Draft",
            "isSymLink": false,
            "documentId": 1,

        },
        "children": [
            {
                "documentId": 2,
                "label": "Basics",
                "data": {
                    "name": "Basics",
                    "status": "Draft",
                    "isSymLink": false,
                    "documentId": 2,

                },
                "children": [
                    {
                        "documentId": 3,
                        "label": "Downloading and installing Unity",
                        "data": {
                            "name": "Downloading and installing Unity",
                            "status": "Draft",
                            "isSymLink": false,
                            "documentId": 3,

                        },
                        "children": [
                            {
                                "documentId": 4790,
                                "label": "Node for Demo 2",
                                "data": {
                                    "name": "Node for Demo 2",
                                    "status": null,
                                    "isSymLink": false,
                                    "documentId": 4790,

                                },
                                "children": null
                            },
                            {
                                "documentId": 7317,
                                "label": "Resume.doc",
                                "data": {
                                    "name": "Resume Document",
                                    "status": "Draft",
                                    "isSymLink": true,
                                    "documentId": 7317,

                                },
                                "children": null
                            },
                            {
                                "documentId": 5630,
                                "label": "Work",
                                "data": {
                                    "name": "Work",
                                    "status": "Draft",
                                    "isSymLink": true,
                                    "documentId": 5630,

                                },
                                "children": [
                                    {
                                        "documentId": 920,
                                        "label": "Demo folder",
                                        "data": {
                                            "name": null,
                                            "status": null,
                                            "isSymLink": false,
                                            "documentId": 920,

                                        },
                                        "children": null
                                    },
                                    {
                                        "documentId": 2345,
                                        "label": "Node for Demo",
                                        "data": {
                                            "name": "Node for Demo",
                                            "status": "Draft",
                                            "isSymLink": true,
                                            "documentId": 2345,

                                        },
                                        "children": null
                                    }
                                ]
                            },
                            {
                                "documentId": 9634,
                                "label": "barcelona.jpg",
                                "data": {
                                    "name": "Barcelona Photo",
                                    "status": "Draft",
                                    "isSymLink": true,
                                    "documentId": 9634,

                                },
                                "children": null
                            }
                        ]
                    },
                    {
                        "documentId": 6,
                        "label": "Getting started",
                        "data": {
                            "name": "Getting started",
                            "status": "Draft",
                            "isSymLink": false,
                            "documentId": 6,

                        },
                        "children": [
                            {
                                "documentId": 5,
                                "label": "2D or 3D projects 123",
                                "data": {
                                    "name": "2D or 3D projects 123",
                                    "status": "Draft",
                                    "isSymLink": false,
                                    "documentId": 5,

                                },
                                "children": null
                            },
                            {
                                "documentId": 4,
                                "label": "Deploying Unity offline",
                                "data": {
                                    "name": "Deploying Unity offline",
                                    "status": "Draft",
                                    "isSymLink": false,
                                    "documentId": 4,

                                },
                                "children": null
                            },
                            {
                                "documentId": 7,
                                "label": "The Learn tab",
                                "data": {
                                    "name": "The Learn tab",
                                    "status": "Draft",
                                    "isSymLink": false,
                                    "documentId": 7,

                                },
                                "children": null
                            }
                        ]
                    },
                    {
                        "documentId": 8,
                        "label": "Learning the interface new 1",
                        "data": {
                            "name": "Learning the interface new 1",
                            "status": "Draft",
                            "isSymLink": false,
                            "documentId": 8,

                        },
                        "children": null
                    }
                ]
            },
            {
                "documentId": 9,
                "label": "Asset Workflow",
                "data": {
                    "name": "Asset Workflow",
                    "status": "Draft",
                    "isSymLink": false,
                    "documentId": 9,

                },
                "children": [
                    {
                        "documentId": 10,
                        "label": "Primitive and Placeholder Objects",
                        "data": {
                            "name": "Primitive and Placeholder Objects",
                            "status": "Draft",
                            "isSymLink": false,
                            "documentId": 10,

                        },
                        "children": null
                    },
                    {
                        "documentId": 11,
                        "label": "Importing Assets",
                        "data": {
                            "name": "Importing Assets",
                            "status": "Draft",
                            "isSymLink": false,
                            "documentId": 11,

                        },
                        "children": null
                    },
                    {
                        "documentId": 12,
                        "label": "Imort Settings",
                        "data": {
                            "name": "Imort Settings",
                            "status": "Draft",
                            "isSymLink": false,
                            "documentId": 12,

                        },
                        "children": null
                    },
                    {
                        "documentId": 13,
                        "label": "Importing from the Asset Store",
                        "data": {
                            "name": "Importing from the Asset Store",
                            "status": "Draft",
                            "isSymLink": false,
                            "documentId": 13,

                        },
                        "children": null
                    },
                    {
                        "documentId": 14,
                        "label": "Asset Packages",
                        "data": {
                            "name": "Asset Packages",
                            "status": "Draft",
                            "isSymLink": false,
                            "documentId": 14,

                        },
                        "children": null
                    },
                    {
                        "documentId": 15,
                        "label": "Standard Assets",
                        "data": {
                            "name": "Standard Assets",
                            "status": "Draft",
                            "isSymLink": false,
                            "documentId": 15,

                        },
                        "children": null
                    }
                ]
            }
        ]
    },
    {
        "documentId": 16,
        "label": "2D",
        "data": {
            "name": "2D",
            "status": "Draft",
            "isSymLink": false,
            "documentId": 16,

        },
        "children": [
            {
                "documentId": 17,
                "label": "Gameplay in 2D",
                "data": {
                    "name": "Gameplay in 2D",
                    "status": "Draft",
                    "isSymLink": false,
                    "documentId": 17,

                },
                "children": null
            },
            {
                "documentId": 18,
                "label": "Sprites",
                "data": {
                    "name": "Sprites",
                    "status": "Draft",
                    "isSymLink": false,
                    "documentId": 18,

                },
                "children": [
                    {
                        "documentId": 19,
                        "label": "Sprite Creator",
                        "data": {
                            "name": "Sprite Creator",
                            "status": "Draft",
                            "isSymLink": false,
                            "documentId": 19,

                        },
                        "children": null
                    },
                    {
                        "documentId": 20,
                        "label": "Sprite Editor",
                        "data": {
                            "name": "Sprite Editor",
                            "status": "Draft",
                            "isSymLink": false,
                            "documentId": 20,

                        },
                        "children": null
                    },
                    {
                        "documentId": 21,
                        "label": "Sprite Masks",
                        "data": {
                            "name": "Sprite Masks",
                            "status": "Draft",
                            "isSymLink": false,
                            "documentId": 21,

                        },
                        "children": null
                    }
                ]
            },
            {
                "documentId": 22,
                "label": "Physics Reference 2D",
                "data": {
                    "name": "Physics Reference 2D",
                    "status": "Draft",
                    "isSymLink": false,
                    "documentId": 22,

                },
                "children": [
                    {
                        "documentId": 23,
                        "label": "Physics 2D Settings",
                        "data": {
                            "name": "Physics 2D Settings",
                            "status": "Draft",
                            "isSymLink": false,
                            "documentId": 23,

                        },
                        "children": null
                    },
                    {
                        "documentId": 24,
                        "label": "Rigidbody 2D",
                        "data": {
                            "name": "Rigidbody 2D",
                            "status": "Draft",
                            "isSymLink": false,
                            "documentId": 24,

                        },
                        "children": null
                    }
                ]
            }
        ]
    }
]

var drafts =[
    { "id": "1", "name": "Draft", "gDocUrl": "test" },
    { "id": "2", "name": "Final", "gDocUrl": "test" },
    { "id": "3", "name": "First Notes", "gDocUrl": "test" },
    { "id": "4", "name": "WIP", "gDocUrl": "test" }]

var sendFCMNotification = function (pushMessage) {
    console.log(JSON.stringify(pushMessage))
    request({
        headers: {
            'Content-Type': 'application/json',
            "Authorization": auth
        },
        uri: 'https://fcm.googleapis.com/fcm/send',
        body: JSON.stringify(pushMessage),
        method: 'POST'
    }, function (err, res, body) {
        if (err) {
            console.error("error in sending push notification " + err);
        } else {
            console.info("push notification send successfully" + JSON.stringify(body));
        }
    });
}

app.get('/api/getTypeOfContent', function (req, res) {
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "add project",
                "body": {
                    "cmsOperation": "getTypeOfContent",
                    "notificationTopic": "NA",
                    "notificationType": 0,
                    "responseId": "3"
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);
    }, 10000);

    res.send({ responseId: 3 });
});

app.get('/api/Response/:respId', function (req, res) {
    var respId = req.params.respId;
    var tempData = null;
    switch (respId) {
        case "3": //get content type
            tempData = typeOfContentArray;
            res.send({ data: tempData });
            break;
        case "11": // repo url exists
            tempData = false;
            res.send({ data: tempData });
            break;
        case "10": // repo url not exists
            tempData = true;
            res.send({ data: tempData });
            break;
        case "21": // project exists
            tempData = false;
            res.send({ data: tempData });
            break;
        case "20": // projects not exists
            tempData = true;
            res.send({ data: tempData });
            break;
        case "1": // get project
            res.send({ content: { projects: projectArray } });
            break;
        case "2": // get Tree Deafts
            res.send({ content: { drafts: TreeDrafts } });
            break;
        case "5": // get Tree Deafts
            res.send({ content: { distributions: Emptydistributions } });
            break;
        case "6": // get Tree Deafts
            res.send({ content: { distributions: distributions } });
            break;
        case "7"://get distribution Branches
            res.send({ content: { distributionBranches: distributionBranches } });
            break;
        case "8": // distribution Name exists
            tempData = false;
            res.send({ data: tempData });
            break;
        case "9": // distribution Name not exists
            tempData = true;
            res.send({ data: tempData });
            break;
        case "12": // get all Tags
            res.send({ data: tagData });
            break;
        case "13": // get Draft Tags
            res.send({ data: draftTags });
            break;
        case "14": // repo url not exists
            tempData = true;
            res.send({ data: tempData });
            break;
        case "15": // get Node Drafts
            res.send({ data: drafts });
            break;
        default:
            break;
    }


});

app.get('/api/validateRepoUrl/:repoUrl', function (req, res) {
    var repoUrl = req.params.repoUrl;
    var tempResponseId = null;
    var tempProject = _.where(projectData, { repoUrl: repoUrl });
    if (tempProject.length > 0) {
        tempResponseId = 11;
    }
    else {
        tempResponseId = 10;
    }
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "add project",
                "body": {
                    "cmsOperation": "validateRepoUrl",
                    "notificationTopic":
                    "NA", "notificationType": 0,
                    "responseId": tempResponseId
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);
    }, 10000);

    res.send({ responseId: tempResponseId });

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

app.get('/api/validateProjectName/:projectName', function (req, res) {
    var projectName = req.params.projectName;
    var tempResponseId = null;
    var tempProject = _.where(projectData, { projectName: projectName });
    if (tempProject.length > 0) {
        tempResponseId = 21;
    }
    else {
        tempResponseId = 20;
    }
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "add project",
                "body": {
                    "cmsOperation": "validateProjectName",
                    "notificationTopic": "NA",
                    "notificationType": 0,
                    "responseId": tempResponseId
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);
    }, 10000);
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

app.get('/api/node/gdoc/:draftId', function (req, res) {
    var draftId = req.params.draftId;
    console.log('draftId ' + draftId);
    if (!draftId) {
        res.send({ content: undefined });
        return;
    }
    res.send({ content: 'https://docs.google.com/document/d/1RIHU4GBFX8_3N5_hxSGX1VgvO9mJ7BXfpmvTBBw--Qk/edit#heading=h.ot80o53sptxv' });
});

app.get('/api/node/html/:draftId', function (req, res) {
    var draftId = req.params.draftId;
    console.log('draftId ' + draftId);
    if (!draftId) {
        res.send({ content: undefined });
        return;
    } else {
        res.send({ content: ' <h3>Related articles</h3>    <ul>              <li>          <a href="/hc/en-us/articles/206604236-Android-Library-Project-Native-Plugins-not-displaying-properly-in-Inspector-Window">Android Library Project (Native Plugins) not displaying properly in Inspector Window</a>        </li>              <li>          <a href="/hc/en-us/articles/206217436-Why-can-t-I-see-Shadows-on-some-of-my-Android-Devices-">Why can&#39;t I see Shadows on some of my Android Devices?</a>        </li>              <li>          <a href="/hc/en-us/articles/208246446-libhoudini-so-crashes-on-Android-x86-devices">libhoudini.so crashes on Android x86 devices</a>        </li>              <li>          <a href="/hc/en-us/articles/207942813-How-can-I-disable-Bitcode-support-">How can I disable Bitcode support?</a>        </li>              <li>          <a href="/hc/en-us/articles/209933103-Bitcode-Support-in-iOS-tvOS">Bitcode Support in iOS &amp; tvOS</a>        </li>          </ul>' });
    }
});

app.get('/api/node/md/:draftId', function (req, res) {
    var draftId = req.params.draftId;
    console.log('draftId ' + draftId);
    if (!draftId) {
        res.send({ content: undefined });
        return;
    }
    res.send({ content: '### Related articles *   [Android Library Project (Native Plugins) not displaying properly in Inspector Window](/hc/en-us/articles/206604236-Android-Library-Project-Native-Plugins-not-displaying-properly-in-Inspector-Window)*   [Why can\'t I see Shadows on some of my Android Devices?](/hc/en-us/articles/206217436-Why-can-t-I-see-Shadows-on-some-of-my-Android-Devices-)*   [libhoudini.so crashes on Android x86 devices](/hc/en-us/articles/208246446-libhoudini-so-crashes-on-Android-x86-devices)*   [How can I disable Bitcode support?](/hc/en-us/articles/207942813-How-can-I-disable-Bitcode-support-)*   [Bitcode Support in iOS & tvOS](/hc/en-us/articles/209933103-Bitcode-Support-in-iOS-tvOS) ' });

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

app.get('/api/tags', function (req, res) {
    console.log('GET Tags called, sending response id ' + _responseId);
    console.log('Waiting for 30 seconds to simulate get call');
    var responseID = 12;
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "Get All Tags",
                "body": {
                    "cmsOperation": "GetAllTags",
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

app.get('/api/NodeDrafts/:nodeID', function (req, res) {
    console.log('GET Node Drafts  called, sending response id ' + _responseId);
    console.log('Waiting for 30 seconds to simulate get call');
    var responseID = 15;
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "Get Node Drafts",
                "body": {
                    "cmsOperation": "GetNodeDrafts",
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

app.get('/api/distributionBranches', function (req, res) {
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

app.get('/api/distributions/:id', function (req, res) {
    console.log('GET Distributions called, sending response id ' + _responseId);
    console.log('Waiting for 30 seconds to simulate get project call');
    var projectId = req.params.id;
    console.log(projectId);
    var responseID = 5;
    if (projectId === "test1")
    {
        responseID = 6;
    }
    
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "Get Distributions",
                "body": {
                    "cmsOperation": "GetDistributions",
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

console.log('server started');
