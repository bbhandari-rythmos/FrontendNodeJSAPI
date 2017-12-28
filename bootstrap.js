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

app.get('/api/projects', function (req, res) {

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

app.post('/api/projects', function (req, res) {

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
                    "cmsOperation": "GetNodesForDistribution",
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

app.post('/api/tagGroups', function (req, res) {
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "Create Tag Group",
                "body": {
                    "cmsOperation": "CreateTagGroup",
                    "notificationTopic": "NA",
                    "notificationType": 0,
                    "responseId": "22"
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);

    }, 5000)
    res.send({ responseId: "22" });
});

app.post('/api/tags', function (req, res) {
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "Create Tag ",
                "body": {
                    "cmsOperation": "CreateTag",
                    "notificationTopic": "NA",
                    "notificationType": 0,
                    "responseId": "23"
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);

    }, 5000)
    res.send({ responseId: "23" });
});

app.post('/api/nodes/update', function (req, res) {
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "Update Node",
                "body": {
                    "cmsOperation": "UpdateNode",
                    "notificationTopic": "NA",
                    "notificationType": 0,
                    "responseId": "17"
                }
            },
            "to": _token
        }
        sendFCMNotification(pushMessage);

    }, 5000)
    res.send({ responseId: "17" });
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

app.get('/api/Responses/:respId', function (req, res) {
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
            res.send({ content: { FileContentAsMarkdown: FileContentAsMarkdown } });
            break;
        case "19": // get Tree Deafts
            res.send({ content: { FileContentAsHtml: FileContentAsHtml } });
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
        case "21": // get tag Groups
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
        case "51": // get repo
            res.send({ content: { repositories: repositories } });
            break;
        case "52": // get drafts
            res.send({ content: { drafts: drafts1 } });
            break;
        case "53": // get drafts
            res.send({ content: { drafts: drafts1 } });
            break;
        case "101": // upload assets
            res.send({ content: { assets: [{ name: 'abc', src: '' }] } });
            break;
        case '102': // recent assets
            res.send({ content: { assets: recentAssetArray } });
            break;
        case '103': // uploaded by me assets
            res.send({ content: { assets: uploadedByMeAssetArray } });
            break;
        case '104': // get Asset By Id
            res.send({ content: { asset: { name: 'abc', src: '' } } });
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

app.get('/api/Drafts/:draftId/getDraftContentAsMarkdown', function (req, res) {
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

app.get('/api/Drafts/:draftId/getDraftContentAsHtml', function (req, res) {
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

app.get('/api/Drafts/:draftId/validatewipdraft', function (req, res) {
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

app.get('/api/Nodes/:nodeId/tags', function (req, res) {
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
    console.log('GET Tag Groups called, sending response id ' + _responseId);
    console.log('Waiting for 30 seconds to simulate get call');
    var responseID = 21;
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "Get Tag Groups",
                "body": {
                    "cmsOperation": "GetAllTagGroups",
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
    var responseID = 5;
    if (projectId === "4") {
        responseID = 6;
    }

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

app.post('/api/uploadAssets', function (req, res) {
    console.log('base64:' + req.body.baseString);
    var base64DataTemp = req.body.baseString.replace(/^data:image\/png;base64,/, "");
    var filename = new Date().getMilliseconds().toString();
    require("fs").writeFile(filename + ".png", base64DataTemp, 'base64', function (err) {
        console.log(err);
    });


    var responseID = 101;
    setTimeout(function () {
        var pushMessage = {
            "notification": {
                "title": "UploadAsset",
                "body": {
                    "cmsOperation": "UploadAsset",
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

app.post('/api/assets', function (req, res) {
    var assetType = req.body.assetType;
    var tabindex = req.body.tabindex;
    var responseID;
    console.log('assetType is: ' + assetType);
    console.log('tabindex is: ' + tabindex);
    if (assetType == 2) {
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

var tags =
    [{ 'tagId': '1', 'tagName': 'tag1', 'tagGroupId': '1' },
    { 'tagId': '2', 'tagName': 'tag2', 'tagGroupId': '1' },
    { 'tagId': '3', 'tagName': 'tag3', 'tagGroupId': '1' },
    { 'tagId': '4', 'tagName': 'tag4', 'tagGroupId': '1' }
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
        'canCreateTag': false
    },
    {
        'tagGroupId': '2',
        'tagGroupName': 'Priority ',
        'colour': 'warn',
        'limitToOne': false,
        'childNodesInherit': false,
        'displayGroupName': true,
        'canCreateTag': true
    },
    {
        'tagGroupId': '3',
        'tagGroupName': 'content ',
        'colour': 'warn',
        'limitToOne': true,
        'childNodesInherit': true,
        'displayGroupName': true,
        'canCreateTag': false
    },
    {
        'tagGroupId': '4',
        'tagGroupName': 'difficulty Level ',
        'colour': 'warn',
        'limitToOne': true,
        'childNodesInherit': false,
        'displayGroupName': true,
        'canCreateTag': true
    },
    {
        'tagGroupId': '5',
        'tagGroupName': 'type ',
        'colour': 'primary',
        'limitToOne': true,
        'childNodesInherit': true,
        'displayGroupName': false,
        'canCreateTag': true
    }];

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

var recentAssetArray = [
    { name: 'project3', url: 'assets/img/thumbnails/project3-thumb.jpg' },
    { name: 'AreaLights.jpg', url: 'assets/img/thumbnails/AreaLights-thumb.jpg' },
    { name: 'EmissiveMaterial.jpg', url: 'assets/img/thumbnails/EmissiveMaterial-thumb.jpg' },
    { name: 'GraphicsIntroPic.jpg', url: 'assets/img/thumbnails/GraphicsIntroPic-thumb.jpg' },
    { name: 'Light-Point-thumb.jpg', url: 'assets/img/thumbnails/Light-Point-thumb.jpg' },
    { name: 'project1', url: 'assets/img/thumbnails/project1-thumb.jpg' },
    { name: 'project2', url: 'assets/img/thumbnails/project2-thumb.jpg' },
    { name: 'project2', url: 'assets/img/thumbnails/project2-thumb.jpg' },
    { name: 'AreaLights.jpg', url: 'assets/img/thumbnails/AreaLights-thumb.jpg' },
    { name: 'EmissiveMaterial.jpg', url: 'assets/img/thumbnails/EmissiveMaterial-thumb.jpg' },
    { name: 'GraphicsIntroPic.jpg', url: 'assets/img/thumbnails/GraphicsIntroPic-thumb.jpg' },
    { name: 'Light-Point-thumb.jpg', url: 'assets/img/thumbnails/Light-Point-thumb.jpg' }
];

var uploadedByMeAssetArray = [
    { name: 'AreaLights.jpg', url: 'assets/img/thumbnails/AreaLights-thumb.jpg' },
    { name: 'project3', url: 'assets/img/thumbnails/project3-thumb.jpg' },
    { name: 'unity_presents', url: 'assets/img/thumbnails/unity_presents-thumb.jpg' },
    { name: 'EmissiveMaterial.jpg', url: 'assets/img/thumbnails/EmissiveMaterial-thumb.jpg' },
    { name: 'project2', url: 'assets/img/thumbnails/project2-thumb.jpg' },
    { name: 'project1', url: 'assets/img/thumbnails/project1-thumb.jpg' },
    { name: 'project2', url: 'assets/img/thumbnails/project2-thumb.jpg' },
    { name: 'project3', url: 'assets/img/thumbnails/project3-thumb.jpg' },
    { name: 'unity_presents', url: 'assets/img/thumbnails/unity_presents-thumb.jpg' }
];

console.log('server started');
