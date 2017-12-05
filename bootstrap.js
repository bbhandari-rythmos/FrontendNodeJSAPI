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

app.post('/api/project', function (req, res) {

    console.log('Create projects called, sending response id ' + _responseId);
    console.log('Waiting for 30 seconds to simulate get project call');

    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "Create Projects",
                "body": {
                    "cmsOperation": "CreateProject",
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

app.get('/api/Distributions/:id/nodes', function (req, res) {
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

app.post('/api/drafts', function (req, res) {
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "Create Draft",
                "body": {
                    "cmsOperation": "CreateDraft",
                    "notificationTopic": "NA",
                    "notificationType": 0,
                    "responseId": "53"
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);

    }, 5000)
    res.send({ responseId: "53" });
});

app.post('/api/tag/add', function (req, res) {
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "Add Tag",
                "body": {
                    "cmsOperation": "AddTag",
                    "notificationTopic": "NA",
                    "notificationType": 0,
                    "responseId": "10"
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);

    }, 5000)
    res.send({ responseId: "10" });
});

app.post('/api/tag/remove', function (req, res) {
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "Remove Tag",
                "body": {
                    "cmsOperation": "RemoveTag",
                    "notificationTopic": "NA",
                    "notificationType": 0,
                    "responseId": "11"
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);

    }, 5000)
    res.send({ responseId: "11" });
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
        _id: "1",
        status: "",
        projectName: "Unity Core User Manual"
    },
    {
        _id: "2",
        status: "",
        projectName: "Unity Core User Manual 2"
    },
    {
        _id: "3",
        status: "",
        projectName: "Unity Core User Manual 3"
    },
    {
        _id: "4",
        status: "",
        projectName: "test1"
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

var draftTags = [
    { 'tagId': '1', 'tagName': 'EN', 'tagGroup': 'language', 'tagColor': 'primary' },
    { 'tagId': '5', 'tagName': 'novice', 'tagGroup': 'level', 'tagColor': 'warn' },
    { 'tagId': '9', 'tagName': 'coding', 'tagGroup': 'type', 'tagColor': 'accent' },
    { 'tagId': '13', 'tagName': 'new', 'tagGroup': 'stage', 'tagColor': 'primary' }
];

var TreeDrafts =
    [
        { 'nodeId': "1", "nodeName": "Working in Unity", 'parentId': null },
        { 'nodeId': "2", "nodeName": "Basics", 'parentId': "1" },
        { 'nodeId': "3", "nodeName": "Getting started", 'parentId': "1" },
        { 'nodeId': "4", "nodeName": "Downloading and installing Unity", 'parentId': "2" },
        { 'nodeId': "5", "nodeName": "Work", 'parentId': null },
        { 'nodeId': "6", "nodeName": "sampleParentNode", 'parentId': null },
        { 'nodeId': "7", "nodeName": "Downloading...", 'parentId': "4" }
    ]

var drafts = [
    { "draftId": "1", "draftName": "Draft", "gDocUrl": "test" },
    { "draftId": "2", "draftName": "Final", "gDocUrl": "test" },
    { "draftId": "3", "draftName": "First Notes", "gDocUrl": "test" },
    { "draftId": "4", "draftName": "WIP", "gDocUrl": "test" }];

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

app.get('/api/StaticFields/DocumentationType', function (req, res) {
    res.send(typeOfContentArray);
});

app.get('/api/Repositories', function (req, res) {

    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "add project",
                "body": {
                    "cmsOperation": "GetRepositoryList",
                    "notificationTopic":
                        "NA", "notificationType": 0,
                    "responseId": 51
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);
    }, 10000);

    res.send({ responseId: 51 });
});

app.get('/api/Response/:respId', function (req, res) {
    var respId = req.params.respId;
    var tempData = null;
    switch (respId) {
        case "3": //get content type
            tempData = typeOfContentArray;
            res.send({ data: tempData });
            break;
        case "1": // get project
            res.send({ content: { projects: projectArray } });
            break;
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
        case "12": // get all Tags
            res.send({ content: tagData });
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
            res.send({ content: { status:'OK' } });
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
        default:
            break;
    }


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

app.get('/api/Projects/:id/distributions', function (req, res) {
    console.log('GET Distributions called, sending response id ' + _responseId);
    console.log('Waiting for 30 seconds to simulate get project call');
    var projectId = req.params.id;
    console.log(projectId);
    var responseID = 5;
    if (projectId === "4") {
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

console.log('server started');
