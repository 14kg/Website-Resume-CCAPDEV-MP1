var db = firebase.firestore();

let t = $('#terminal').terminal({

    login: function() {
        let u = 'email';
        let p = 'password';
        this.push(function(pass) {
            if (pass) {
                this.pop();
                p = pass;
                firebase.auth().signInWithEmailAndPassword(u, p).then(function(){
                    console.log("user is signed in yo");
                    t.set_prompt('[[;#16C60C;]'+u+']:[[;#3B78FF;]~]$');
                    // t.clear();
                    t.echo("ADMINISTRATOR LOGGED IN");
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
    
    introduction: function(){
        t.echo(    
            '<marquee>...d8b...............888.......888......d8b.888.888.....................................\n</marquee>'+
            '<marquee>...Y8P...............888.......888......Y8P.888.888.....................................\n</marquee>'+
            '<marquee>.....................888.......888..........888.888.....................................\n</marquee>'+
            '<marquee>..8888...d88b.....d88888.......88888b...888.888.888...d88b...88888b.....d88b....d8888b..\n</marquee>'+
            '<marquee>.."888.d8P..Y8b.d88".888.......888."88b.888.888.888.d88""88b.888."88b.d8P..Y8b.88K......\n</marquee>'+
            '<marquee>...888.88888888.888..888.......888..888.888.888.888.888..888.888..888.88888888."Y8888b..\n</marquee>'+
            '<marquee>...888.Y8b......Y88b.888.......888.d88P.888.888.888.Y88..88P.888..888.Y8b...........X88.\n</marquee>'+
            '<marquee>...888.."Y8888..."Y88888.......88888P"..888.888.888.."Y88P"..888..888.."Y8888...88888P\'.\n</marquee>'+
            '<marquee>...888..................................................................................\n</marquee>'+
            '<marquee>..d88P.................................<b style="color:#fff">I\'m not lazy, I\'m a minimalist</b>...................\n</marquee>'+
            '<marquee>888P"...................................................................................\n</marquee>' 
        ,{raw: true});
        t.echo('\n');
        // t.echo('Jediah Apirin Billones');
        // t.echo('156 Scout Fuentebella St., Diliman, Quezon City 1103 Metro Manila');
        // t.echo('(0967) 236 3691');
        // t.echo('jediah_billones@dlsu.edu.ph');
        t.echo(
            'Hey there! I\'m Jed, a [[!;#fff;;;]Computer Science] student living in Quezon City\n'+
            'and I absolutely love [[!;#fff;;;]Sci-fi] and [[!;#fff;;;]Fantasy]!\n\n'
        );
    },

    education: function() {
        t.echo(
            '<marquee>..............888............................888....d8b...................\n</marquee>'+
            '<marquee>..............888............................888....Y8P...................\n</marquee>'+
            '<marquee>..............888............................888..........................\n</marquee>'+
            '<marquee>..d88b.....d88888.888..888...d8888b..8888b...888888.888...d88b...88888b...\n</marquee>'+
            '<marquee>d8P..Y8b.d88".888.888..888.d88P"........"88b.888....888.d88""88b.888."88b.\n</marquee>'+
            '<marquee>88888888.888..888.888..888.888.......d888888.888....888.888..888.888..888.\n</marquee>'+
            '<marquee>Y8b......Y88b.888.Y88b.888.Y88b.....888..888.Y88b...888.Y88..88P.888..888.\n</marquee>'+
            '<marquee>."Y8888..."Y88888.."Y88888.."Y8888P."Y888888.."Y888.888.."Y88P"..888..888.\n</marquee>'+
            '<marquee>..........................................................................\n</marquee>'+
            '<marquee>..............<b style="color:#fff">I may be delayed, but I\'m not a downgrade</b>...................\n</marquee>'+
            '<marquee>..........................................................................</marquee>'
        ,{raw: true});
        t.echo('\n');
        db.collection("education").get().then(function(snapshot){
            snapshot.forEach(function(doc){
                d = doc.data();
                console.log(doc.id);
                t.echo('[[b;#fff;;;]'+d.school+']');
                t.echo(d.degree);
                t.echo(d.year_start+"-"+d.year_end);
                t.echo('\n');
            })
        });    
    },

    add: function(coll){
        let sch;
        let deg;
        let ys;
        let ye;

        if(coll.toLowerCase()=="education"){
            this.push(function(year_end) {
                if (year_end) {
                    this.pop();
                    ye = year_end;
                    db.collection("education").add({
                        school: sch,
                        degree: deg,
                        year_start: ys,
                        year_end: ye
                    })
                    .then(function(ref){
                        console.log("Document written with ID: ", ref.id);
                        t.echo('[[b;green;;;]SUCCESS!!!]');
                    })
                    .catch(function(err){
                        console.error("Error adding document: ", err);
                        t.echo('[[b;red;;;]FAILURE!!!]');
                        t.echo(err);
                    });
                }else{
                    console.log('no input');
                }
            }, {
                prompt: 'Year End: '
            });
            this.push(function(year_start) {
                if (year_start) {
                    this.pop();
                    ys = year_start;
                }else{
                    console.log('no input');
                }
            }, {
                prompt: 'Year Start: '
            });
            this.push(function(degree) {
                if (degree) {
                    this.pop();
                    deg = degree;
                }else{
                    console.log('no input');
                }
            }, {
                prompt: 'Degree: '
            });
            this.push(function(school) {
                if (school) {
                    this.pop();
                    sch = school;
                }else{
                    console.log('no input');
                }
            }, {
                prompt: 'Press [[b!;#fff;;;]CTRL+D] to cancel.\n\nSchool: '
            });
        }
    },

    delete: function(coll){
        let doc_id = [];
        if(coll.toLowerCase() == 'education'){
            db.collection("education").get().then(function(snapshot){
                let i = 0;
                snapshot.forEach(function(doc){
                    d = doc.data();
                    doc_id[i] = doc.id;
                    console.log('The ID for '+i+' is '+doc_id[i]);
                    t.echo('\[[[!;#fff;;;]x]\]   '+i.toString()+'   '+d.school);
                    t.echo('          '+d.degree);
                    t.echo('          '+d.year_start+"-"+d.year_end);
                    t.echo('\n');
                    i++;
                })
            });
            this.pause();
            setTimeout(() => {
                 
            this.push(function(del){
                if(del){
                    this.pop();
                    console.log('Attempting to delete '+doc_id[del]);
                    db.collection("education").doc(doc_id[del]).delete().then(function() {
                        t.echo('[[b;green;;;]SUCCESS!!!]');
                    }).catch(function(err) {
                        console.error("Error removing document: ", err);
                        t.echo('[[b;red;;;]FAILURE!!!]');
                        t.echo(err);
                    });
                }
            }, {
                prompt: 'Press [[b!;#fff;;;]CTRL+D] to cancel.\n'+'\nEnter the index number of the field to delete: '
            });
            this.resume();
            }, 300);
        }
    }
}, {
    prompt: '[[;#16C60C;]guest@resume]:[[;#3B78FF;]~]$ ',
    greetings:  
    '[[b;#000;#fff;;]Interactive Resume by Jediah A. Billones ][[bi;#000;#fff;;]Updated 08-13-2020]'
});
t.echo('\n');
t.echo(

    '<marquee><span style="color:#0037DA">888</span>....<span style="color:#0037DA">888</span>..........<span style="color:#13A10E">888</span>.<span style="color:#881798">888</span>...............<span style="color:#CCCCCC">888</span>.......<span style="color:#CCCCCC">888</span>..................<span style="color:#61D6D6">888</span>......<span style="color:#16C60C">888</span>......<span style="color:#B4009E">888</span>.\n</marquee>'+
    '<marquee><span style="color:#0037DA">888</span>....<span style="color:#0037DA">888</span>..........<span style="color:#13A10E">888</span>.<span style="color:#881798">888</span>...............<span style="color:#CCCCCC">888</span>...<span style="color:#CCCCCC">o</span>...<span style="color:#CCCCCC">888</span>..................<span style="color:#61D6D6">888</span>......<span style="color:#16C60C">888</span>......<span style="color:#B4009E">888</span>.\n</marquee>'+
    '<marquee><span style="color:#0037DA">888</span>....<span style="color:#0037DA">888</span>..........<span style="color:#13A10E">888</span>.<span style="color:#881798">888</span>...............<span style="color:#CCCCCC">888</span>..<span style="color:#CCCCCC">d8b</span>..<span style="color:#CCCCCC">888</span>..................<span style="color:#61D6D6">888</span>......<span style="color:#16C60C">888</span>......<span style="color:#B4009E">888</span>.\n</marquee>'+
    '<marquee><span style="color:#0037DA">8888888888</span>...<span style="color:#3A96DD">d88b</span>...<span style="color:#13A10E">888</span>.<span style="color:#881798">888</span>...<span style="color:#C50F1F">d88b</span>........<span style="color:#CCCCCC">888</span>.<span style="color:#CCCCCC">d888b</span>.<span style="color:#CCCCCC">888</span>...<span style="color:#C19C00">d88b</span>...<span style="color:#3B78FF">888d888</span>.<span style="color:#61D6D6">888</span>...<span style="color:#16C60C">d88888</span>......<span style="color:#B4009E">888</span>.\n</marquee>'+
    '<marquee><span style="color:#0037DA">888</span>....<span style="color:#0037DA">888</span>.<span style="color:#3A96DD">d8P</span>..<span style="color:#3A96DD">Y8b</span>.<span style="color:#13A10E">888</span>.<span style="color:#881798">888</span>.<span style="color:#C50F1F">d88""88b</span>......<span style="color:#CCCCCC">888d88888b888</span>.<span style="color:#C19C00">d88""88b</span>.<span style="color:#3B78FF">888P"</span>...<span style="color:#61D6D6">888</span>.<span style="color:#16C60C">d88"</span>.<span style="color:#16C60C">888</span>......<span style="color:#B4009E">888</span>.\n</marquee>'+
    '<marquee><span style="color:#0037DA">888</span>....<span style="color:#0037DA">888</span>.<span style="color:#3A96DD">88888888</span>.<span style="color:#13A10E">888</span>.<span style="color:#881798">888</span>.<span style="color:#C50F1F">888</span>..<span style="color:#C50F1F">888</span>......<span style="color:#CCCCCC">88888P</span>.<span style="color:#CCCCCC">Y88888</span>.<span style="color:#C19C00">888</span>..<span style="color:#C19C00">888</span>.<span style="color:#3B78FF">888</span>.....<span style="color:#61D6D6">888</span>.<span style="color:#16C60C">888</span>..<span style="color:#16C60C">888</span>......<span style="color:#B4009E">Y8P</span>.\n</marquee>'+
    '<marquee><span style="color:#0037DA">888</span>....<span style="color:#0037DA">888</span>.<span style="color:#3A96DD">Y8b</span>......<span style="color:#13A10E">888</span>.<span style="color:#881798">888</span>.<span style="color:#C50F1F">Y88</span>..<span style="color:#C50F1F">88P</span>......<span style="color:#CCCCCC">8888P</span>...<span style="color:#CCCCCC">Y8888</span>.<span style="color:#C19C00">Y88</span>..<span style="color:#C19C00">88P</span>.<span style="color:#3B78FF">888</span>.....<span style="color:#61D6D6">888</span>.<span style="color:#16C60C">Y88b</span>.<span style="color:#16C60C">888</span>.......<span style="color:#B4009E">"</span>..\n</marquee>'+
    '<marquee><span style="color:#0037DA">888</span>....<span style="color:#0037DA">888</span>..<span style="color:#3A96DD">"Y8888</span>..<span style="color:#13A10E">888</span>.<span style="color:#881798">888</span>..<span style="color:#C50F1F">"Y88P"</span>.......<span style="color:#CCCCCC">888P</span>.....<span style="color:#CCCCCC">Y888</span>..<span style="color:#C19C00">"Y88P"</span>..<span style="color:#3B78FF">888</span>.....<span style="color:#61D6D6">888</span>..<span style="color:#16C60C">"Y88888</span>......<span style="color:#B4009E">888</span>.\n</marquee>'+
    '<marquee>...............................................................................................\n</marquee>'+
    '<marquee>.........................<b style="color:#fff">My ancestors are smiling at this marquee..Can you say the same?</b>.......\n</marquee>'+
    '<marquee>...............................................................................................</marquee>'
    ,{raw: true}
);
t.echo('\n');
t.echo(
    'Use any of the following commands to get started:\n'+
    '- [[!;#fff;;;]introduction]\n'+
    '- [[!;#fff;;;]education]\n'+
    '- [[!;#fff;;;]organization]\n'+
    '- [[!;#fff;;;]experience]\n'+
    '- [[!;#fff;;;]portfolio]\n'+
    '- [[!;#fff;;;]contact]\n'
)