const express=require('express');
const path =require('path');
const port=8000;
const db =require('./config/mongoose');
const Contact = require('./models/contact');

const app =express();

//view engine 
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded()); //parser or middleware
app.use(express.static('assets')); //middleware to access the asset folder and get static data


//var 
var contactList=[
    {
        name:"Rahul",
        phone:"1234567890"
    },
    {
        name:"Rex",
        phone:"9876543210"
    }
];


app.get('/',function(req,res){
    // console.log(__dirname); //prints directry name
    // res.send('<h1>Cool,it is running.Is it not?</h1>');

    // Contact.find({},function(err,contacts){
    //     if(err){
    //         console.log('Error in fetching contacts!');
    //         return;
    //     }
    //     return res.render('home',{
    //         Name: "My Contact List",
    //          contact_list:contacts
    //     }); //rendering from template engine
    // })

  Contact.find({})
  //.exec()
  .then((contacts) => {
    return res.render('home', {
      Name: "My Contact List",
      contact_list: contacts
    });
  })
  .catch((err) => {
    console.log('Error in fetching contacts:', err);
    return res.status(500).send('Internal Server Error'); // Handle the error appropriately
  });


});

app.get('/playground',function(req,res){
    res.render('practice',{
        Title:"My EJS Playground",
    })
});

app.post('/create-contact',function(req,res){
   /* contactList.push({
        name: req.body.name,
        phone : req.body.phone
    });*/
    //contactList.push(req.body);

//     Contact.create({
//         name:req.body.name,
//         phone:req.body.phone
// },function(err, newContact){
//     if(err){console.log('error in creating a contact!');
//     return; }

// console.log('*********', newContact);
// return res.redirect('back');
// });

///////////////async
// try {
//     const newContact= Contact.create({
//         name:req.body.name,
//         phone:req.body.phone
//     });
//     console.log('*********', newContact);
//     return res.redirect('back');
// } catch (error) {
//     console.log('error in creating a contact!', err);
//     return res.status(500).send('Error creating a contact');
// }

//////////promise
Contact.create({
    name: req.body.name,
    phone: req.body.phone
})
.then(newContact => {
    console.log('*********', newContact);
    return res.redirect('back');
})
.catch(err => {
    console.log('error in creating a contact!', err);
    return res.status(500).send('Error creating a contact'); // You might want to handle the error response appropriately
});

});

//delete contact
app.get('/delete-contact/',function(req,res){
   //  console.log(req.query);
   //get query from url
    // let phone =req.query.phone;

    //get the id from query url
    let id =req.query.id


    //find the index and store in contactIndex
    // let contactIndex =contactList.findIndex(contact => contact.phone==phone);
    // if (contactIndex!=-1){
    //  contactList.splice(contactIndex,1); //removing the element
    // }
    // return res.redirect('back')

    //find the index of the id and delete it
    // Contact.findByIdAndDelete(id,function(err){
    //     if(err){
    //         console.log("error in deleting an object from the database");
    //         return;
    //     }
    //     return res.redirect('back')
    // })
    Contact.findByIdAndDelete(id)
    .then(() =>{
        return res.redirect('back');
    })
    .catch((err) =>{
        console.log('error while removing  from database',err)
        return;
    })
});



app.listen(port,function(err){
    if(err)
{
    console.log("Error in connection",err);
    return;
}
console.log('Yes, My Server is running on port: ',port);
}
)



