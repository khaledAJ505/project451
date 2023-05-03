const Patient = require('../models/patient');
const Personnel = require('../models/medicalp');
const admin = require('../models/admin');

const Appointment1=require('../models/appointment1');
const Appointment2=require('../models/appointment2');

var count=1;

const { Vonage } = require('@vonage/server-sdk')
const PDFDocument = require('pdfkit');
const fs = require('fs');

const API_KEY = '0093d736d3532a2118775172ae72091f-81bd92f8-cdb8169a';
const DOMAIN = 'sandbox76e4be6750f7490ebedb3739bb65bb1d.mailgun.org';
const formData = require('form-data');

const Mailgun = require('mailgun.js');

const mailgun = new Mailgun(formData);
const client = mailgun.client({username: 'api', key: "0093d736d3532a2118775172ae72091f-81bd92f8-cdb8169a"
});
const vonage = new Vonage({
  apiKey: "57d9d126",
  apiSecret: "VxfpILL1Wv8JvGjH"
})

module.exports.renderRegister = (req, res)  => {
    res.render('patient/register');
}

module.exports.register = async (req, res, next) => {
    
    try {
            const {Fullname,DOB,ID,phoneno,email,City,Country,medcondition, username, password } = req.body;
            const p = new Patient({ Fullname,DOB,ID,phoneno,email,City,Country,medcondition, username,vaccine1:false,vaccine2:false });
    
    
      // Assign the next available time slot
      const appointments = await Appointment1.find({}).sort({ timeSlot: 1 });
      let nextTimeSlot = new Date();
      nextTimeSlot.setHours(nextTimeSlot.getHours()+3);
      const m = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
     console.log(nextTimeSlot);
      if (appointments.length > 0)  {
        console.log("here1");
        const lastAppointment = appointments[appointments.length-1];
        if(lastAppointment.timeSlot>=nextTimeSlot){
            nextTimeSlot = new Date(lastAppointment.timeSlot);
            let test = new Date (lastAppointment.timeSlot) ;
            test.setHours(21);
            test.setMinutes(0);
            test.setSeconds(0);
            test.setMilliseconds(0);
            if(nextTimeSlot.getHours()>test.getHours()){
                nextTimeSlot.setDate(nextTimeSlot.getDate()+1);
                nextTimeSlot.setHours(11);
                nextTimeSlot.setMinutes(0);
                nextTimeSlot.setSeconds(0);
                nextTimeSlot.setMilliseconds(0); 
            
         
            }else{
                nextTimeSlot.setMinutes(nextTimeSlot.getMinutes()+30);    
            }
    
    
    
        

        }else{
            if(nextTimeSlot.getHours()<8){
                nextTimeSlot.setHours(11);
                nextTimeSlot.setMinutes(30);
                nextTimeSlot.setMinutes(0);
                nextTimeSlot.setSeconds(0);
                nextTimeSlot.setMilliseconds(0);
            }else if(nextTimeSlot.getHours()>18){
                nextTimeSlot.setDate(nextTimeSlot.getDate()+1);
                nextTimeSlot.setHours(11);
                nextTimeSlot.setMinutes(0);
                nextTimeSlot.setSeconds(0);
                nextTimeSlot.setMilliseconds(0);    
            }
            else{
                const nowmin = nextTimeSlot.getMinutes();
                if(nowmin<=30){
            
                    nextTimeSlot.setHours(nextTimeSlot.getHours()+3);
                    nextTimeSlot.setMinutes(30);
                    nextTimeSlot.setMinutes(0);
                    nextTimeSlot.setSeconds(0);
                    nextTimeSlot.setMilliseconds(0);
                }else{
                   nextTimeSlot.setHours(nextTimeSlot.getHours()+4);
                    nextTimeSlot.setMinutes(0);
                    nextTimeSlot.setSeconds(0);
                    nextTimeSlot.setMilliseconds(0);
                    }
                
            }
        }
        
      }
      
      else{
        if(nextTimeSlot.getHours()<8){
            console.log("here2");
            nextTimeSlot.setHours(8);
            nextTimeSlot.setMinutes(30);
            nextTimeSlot.setMinutes(0);
            nextTimeSlot.setSeconds(0);
            nextTimeSlot.setMilliseconds(0);
        }else if(nextTimeSlot.getHours()>18 ||(nextTimeSlot.getHours()== 17 &&nextTimeSlot.getMinutes()>=30 )){
            console.log("here3");
            console.log(nextTimeSlot.getHours());

            nextTimeSlot.setDate(nextTimeSlot.getDate()+1);
            nextTimeSlot.setHours(8);
            nextTimeSlot.setMinutes(0);
            nextTimeSlot.setSeconds(0);
            nextTimeSlot.setMilliseconds(0);    
        }
        else{


            const nowmin = nextTimeSlot.getMinutes();
            if(nowmin<=30){
                console.log("here4");

                nextTimeSlot.setMinutes(30);
                nextTimeSlot.setMinutes(0);
                nextTimeSlot.setSeconds(0);
                nextTimeSlot.setMilliseconds(0);
            }else{
                console.log("here5");

               nextTimeSlot.setHours(nextTimeSlot.getHours()+1);
                nextTimeSlot.setMinutes(0);
                nextTimeSlot.setSeconds(0);
                nextTimeSlot.setMilliseconds(0);
                }
            
        }

    }

           let str_op ;

           if(nextTimeSlot.getHours()<12){
            if(nextTimeSlot.getMinutes()==0){
                str_op = nextTimeSlot.getDate() + ' ' + m[nextTimeSlot.getMonth()] + ' ' + nextTimeSlot.getFullYear() + ' at ' + (nextTimeSlot.getHours()) +' : '+ nextTimeSlot.getMinutes() +'0 am'; 
             }else{

                 str_op = nextTimeSlot.getDate() + ' ' + m[nextTimeSlot.getMonth()] + ' ' + nextTimeSlot.getFullYear() + ' at ' + (nextTimeSlot.getHours()) +' : '+ nextTimeSlot.getMinutes() +' am';
             }
            
         }else{
             if(nextTimeSlot.getMinutes()==0){
                 str_op = nextTimeSlot.getDate() + ' ' + m[nextTimeSlot.getMonth()] + ' ' + nextTimeSlot.getFullYear() + ' at ' + (nextTimeSlot.getHours()-12) +' : '+ nextTimeSlot.getMinutes() +'0 pm';

           }
             else{
             str_op = nextTimeSlot.getDate() + ' ' + m[nextTimeSlot.getMonth()] + ' ' + nextTimeSlot.getFullYear() + ' at ' + (nextTimeSlot.getHours()-12) +' : '+ nextTimeSlot.getMinutes() +' pm';
            }
           
           }
           console.log(str_op);
           p.assignedtimeslotv1 = str_op;
               // Create a new appointment
      const appointment = new Appointment1({
         patient:p._id ,
       timeSlot: nextTimeSlot,
       });
         appointment.save();
        
        
         registeredp= await Patient.register(p, password);


            
        
            //   const from = "AUBCOVAX"
            //   const to = p.phoneno;
            //   const text = "Hello "+p.Fullname+", please note that the assigned date for your first vaccine dose is on: "+p.assignedtimeslotv1;
            
            //   async function sendSMS() {
            //      await vonage.sms.send({to, from, text})
            //          .then(resp => { console.log('Message sent successfully');  console.log(resp); })
            //           .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
            //   }
            
            //   await sendSMS();
    
      

    
            const personnel = await Personnel.findOne({ username: 'mostal123' }).exec();
            personnel.patients.push(registeredp);
            await personnel.save();
            console.log("here1");
             const ad = await admin.findOne({ username: 'ali111' }).exec();
             ad.patients.push(registeredp);
             await ad.save();
             console.log("here2");

            res.status(200).json(registeredp)



          
       
    
    } catch (e) {
        req.flash('error', e.message);
        return res.redirect('/');}
    }



module.exports.login = async (req, res) => {
    const patientId = req.session.passport.user;
    const patient = await Patient.find({username:patientId});
   if (!patient) {
    console.log("here");
    res.status(500).json({error:'not found'})

}else{
        console.log("herebtw");
        console.log(patient[0]);
        res.status(200).json(patient[0])
        }
}


module.exports.showprofile = async (req, res,) => {
    console.log("herererere");
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
        req.flash('error', 'Cannot find that patient!');
        res.status(500).send("not found")
    }
    res.status(200).json(patient)
}


module.exports.assigntodose2 = async (req, res,) => {
    const p = await Patient.findById(req.params.id);
    
    if (!p) {
        req.flash('error', 'Cannot find that patient!');
        return res.redirect('/');}

        const appointments = await Appointment1.find({patient:req.params.id});

        let nextTimeSlot = new Date(appointments[0].timeSlot);
        console.log(nextTimeSlot);
        nextTimeSlot.setHours(8);
        nextTimeSlot.setMinutes(0);
        nextTimeSlot.setSeconds(0);
        nextTimeSlot.setMilliseconds(0);
        nextTimeSlot.setMonth(nextTimeSlot.getMonth()+3);

        const m = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];

    
            let str_op ;
  
                    str_op = nextTimeSlot.getDate() + ' ' + m[nextTimeSlot.getMonth()] + ' ' + nextTimeSlot.getFullYear() + ' at ' + (nextTimeSlot.getHours()) +' : '+ nextTimeSlot.getMinutes() +'0 am'; 


            p.assignedtimeslotv2 = str_op;
            await p.save();
                // Create a new appointment
        const appointment = new Appointment2({
          patient:p._id ,
          timeSlot: nextTimeSlot,
        });


            const from = "AUBCOVAX"
            const to = p.phoneno;
            const text = "Hello "+p.Fullname+", please note that the assigned date for your second vaccine dose is on: "+p.assignedtimeslotv2;
            
            async function sendSMS() {
                await vonage.sms.send({to, from, text})
                    .then(resp => { console.log('Message sent successfully');  console.log(resp); })
                    .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
            }
            
            sendSMS();
    
      
    
          await appointment.save();
          res.status(200).json(p)

        }

module.exports.setv1taken = async(req, res) => {
    const p = await Patient.findById(req.params.id);
    p.vaccine1 = true;
    p.save();
    res.status(200).json(p)


}
module.exports.pdfgen = async(req,res)=>{
    const doc = new PDFDocument();
    const p = await Patient.findById(req.params.id);
    // Pipe its output somewhere, like to a file or HTTP response
    // See below for browser usage
    const id = Date.now();
    console.log(id);
    doc.pipe(fs.createWriteStream(`certificate${id}.pdf`));
    
    // Embed a font, set the font size, and render some text
    doc.fontSize(14).lineGap(10);

    // Add a title
    doc.fontSize(20).text('Certificate of Vaccination', { align: 'center' });
    
    // Add some space
    doc.moveDown(2);
    
    // Add the person's name
    doc.fontSize(16).text(`This is to certify that ${p.Fullname} has been vaccinated against COVID-19`, { align: 'center' });
    
    // Add some space
    doc.moveDown(2);
    // Add the vaccination details
    doc.text(`Vaccine Name: pfizer`);
    doc.moveDown(2);

    doc.text(`Dose 1 Date: ${p.assignedtimeslotv1}`);
    doc.moveDown(2);

    doc.text(`Dose 2 Date: ${p.assignedtimeslotv1}`);
    doc.moveDown(2);

    doc.text(`Vaccination Center: AUBMC`);
    doc.moveDown(2);

    doc.text(`Phone Number: ${p.phoneno}`);
    
    // Add some space
    doc.moveDown(2);
    
    // Add the date and signature
    doc.text(`Date: ${new Date().toDateString()}`, { align: 'right' });
    doc.text('Signature: Mostafa Alloush', { align: 'right' });
    // End the document
    await doc.end();
    console.log(id);
    const attachment = await [fs.createReadStream(`certificate${id}.pdf`)];
    console.log(attachment);
    const messageData = {
        from: 'aubcovax@sandbox76e4be6750f7490ebedb3739bb65bb1d.mailgun.org',
        to: p.email,
        subject: 'PDF Attachment',
        text: 'Please find the PDF attachment.',
        attachment : attachment[0]
    };
      await client.messages.create(DOMAIN, messageData)
       .then((res) => {
         console.log(res);
       })
       .catch((err) => {
         console.error(err);
       });

       res.status(200).json(p)

}
module.exports.setv2taken = async(req, res) => {

    const doc = new PDFDocument();
    const p = await Patient.findById(req.params.id);
    p.vaccine2 = true;
    p.save();
   
    res.status(200).json(p)

}






