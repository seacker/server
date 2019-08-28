const Meeting = require('../models/meetingRoom')
const cornJob = require('cron').CronJob

new cornJob(`59 23 * * * *`, function(){
    Meeting.updateMany()
})