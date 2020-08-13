var db = firebase.firestore();

$('body').terminal({
    hello: function(what) {
        this.echo('Hello, ' + what +
                  '. Welcome to this terminal.');
    },

    login: function(user, pass) {
        let t = this;
        firebase.auth().signInWithEmailAndPassword(user, pass).then(function(){
            console.log("user is signed in yo");
            t.set_prompt(user+'>');
        }).catch(function(err){
            if(err.code == "auth/wrong-password"){
                console.log("wrong password");
            }else{
                console.log(err.message);
            }
        })
    },
    
    education: function() {
        let t = this;
        db.collection("education").get().then(function(snapshot){
            snapshot.forEach(function(doc){
                d = doc.data();
                console.log(d);
                t.echo(d.degree);
                t.echo(d.school);
                t.echo(d.year_start+"-"+d.year_end);
            })
        });    
    }
}, { 
    greetings: 'hello world :-)'
});