var db = firebase.firestore();

let t = $('body').terminal({
    hello: function(what) {
        this.echo('Hello, ' + what +
                  '. Welcome to this terminal.');
        this.insert('hello', false);
    },

    login: function() {
        let u = 'email';
        let p = 'password';
        this.push(function(pass) {
            if (pass) {
                this.pop();
                p = pass;
                firebase.auth().signInWithEmailAndPassword(u, p).then(function(){
                    console.log("user is signed in yo");
                    t.set_prompt('[[;#087830;]'+u+']>');
                    t.clear();
                    t.echo("Logged in");
                }).catch(function(err){
                    t.echo(err.message);
                    console.log(err.message);
                })
            }
        }, {
            prompt: 'password: '
        });
        this.push(function(user) {
            if (user) {
                this.pop();
                this.set_mask('*');
                u = user;
            }
        }, {
            prompt: 'email: '
        });
    },
    
    education: function() {
        db.collection("education").get().then(function(snapshot){
            snapshot.forEach(function(doc){
                d = doc.data();
                console.log(d);
                t.echo(d.degree);
                t.echo(d.school);
                t.echo(d.year_start+"-"+d.year_end);
                t.echo('<a href="index.html">hello</a>', {raw: true});
            })
        });    
    }
}, { 
    greetings: 
    '888               888 888          \n'+
    '888               888 888          \n'+
    '888               888 888          \n'+
    '88888b.   .d88b.  888 888  .d88b.  \n'+
    '888 "88b d8P  Y8b 888 888 d88""88b \n'+
    '888  888 88888888 888 888 888  888 \n'+
    '888  888 Y8b.     888 888 Y88..88P \n'+
    '888  888  "Y8888  888 888  "Y88P"  \n'
});