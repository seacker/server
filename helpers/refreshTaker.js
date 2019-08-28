const Meeting = require('../models/meetingRoom')
const CornJob = require('cron').CronJob

new CornJob(`* * * * * *`, function(){
    console.log('test')
    // Meeting.find({})
    //     .then(data => {
    //         data.forEach(schedule => {
    //             Meeting.updateOne({_id : schedule._id}, {UserBook : null}, {new: true})
    //             console.log("already reset")
    //         })
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
}, null, true, 'Asia/Singapore')