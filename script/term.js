var db = firebase.firestore();
let admin = false;
let t = $('#terminal').terminal({
    help: function() {
        t.echo(
            'List of Commands:<br>'+
            ' - <a href="javascript:t.exec(\'about\')" class="navlink">about</a><br>'+
            ' - <a href="javascript:t.exec(\'education\')" class="navlink">education</a><br>'+
            ' - <a href="javascript:t.exec(\'organization\')" class="navlink">organization</a><br>'+
            ' - <a href="javascript:t.exec(\'experience\')" class="navlink">experience</a><br>'+
            ' - <a href="javascript:t.exec(\'portfolio\')" class="navlink">portfolio</a><br>'+
            ' - <a href="javascript:t.exec(\'contact\')" class="navlink">contact</a><br><br>'
            ,{raw:true}
        );
        if(admin){
            'List of Admin Commands:<br>'+
            ' - <a href="javascript:t.exec(\'add\')" class="navlink">add</a><br>'+
            ' - <a href="javascript:t.exec(\'edit\')" class="navlink">edit</a><br><br>'
            ,{raw:true}
        }
        // console.log(firebase.auth().currentUser)
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
                    // t.set_prompt('[[;#16C60C;]'+u+']:[[;#3B78FF;]~]$ ');
                    // t.clear();
                    t.echo("[[;#B4009E;]ADMINISTRATOR LOGGED IN]: type help to see admin commands");
                }).catch(function(err){
                    t.echo('[[b;red;;;]'+err.message+']');
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
    
    about: function(){
        t.echo('\n');
        t.echo(    
            '<div class="bounce"><span class="contents">'+
            '...d8b...............888.......888......d8b.888.888.....................................<br>'+
            '...Y8P...............888.......888......Y8P.888.888.....................................<br>'+
            '.....................888.......888..........888.888.....................................<br>'+
            '..8888...d88b.....d88888.......88888b...888.888.888...d88b...88888b.....d88b....d8888b..<br>'+
            '.."888.d8P..Y8b.d88".888.......888."88b.888.888.888.d88""88b.888."88b.d8P..Y8b.88K......<br>'+
            '...888.88888888.888..888.......888..888.888.888.888.888..888.888..888.88888888."Y8888b..<br>'+
            '...888.Y8b......Y88b.888.......888.d88P.888.888.888.Y88..88P.888..888.Y8b...........X88.<br>'+
            '...888.."Y8888..."Y88888.......88888P"..888.888.888.."Y88P"..888..888.."Y8888...88888P\'.<br>'+
            '...888..................................................................................<br>'+
            '..d88P.................................<b style="color:#fff">I\'m not lazy, I\'m a minimalist</b>...................<br>'+
            '888P"...................................................................................<br>' +
            '</span></div>'
        ,{raw: true});
        t.echo('\n');
        // db.collection("other").doc("intro").get().then(function(val){
        //     let intro = val.data().value;
        //     console.log(intro);
        //     t.echo(
        //         intro
        //         ,{raw: true}
        //     );
        //     t.echo('\n');
        // });

        t.echo(
            'Hey there! I\'m Jed, a Computer Science student from DLSU-Manila.'+
            'I\'m passionate about <b style="color:#fff">Robotics</b>, <b style="color:#fff">Graphic Design</b>, and <b style="color:#fff">Writing</b>.'+
            'and I\'m absolutely interested in anything either <b style="color:#fff">Sci-fi</b> or <b style="color:#fff">Fantasy</b>!<br><br>'+
            'The conglomoration of my passions and interests have formed in me,'+
            'a particular inclination within the field of game development.'+
            'Specifically, lored-based game mechanics and physics engines.'
            ,{raw: true}
        );
        t.echo('\n');
    },

    education: function() {
        t.echo('\n');
        t.echo(
            '<div class="bounce"><span class="contents">'+
            '..............888............................888....d8b...................<br>'+
            '..............888............................888....Y8P...................<br>'+
            '..............888............................888..........................<br>'+
            '..d88b.....d88888.888..888...d8888b..8888b...888888.888...d88b...88888b...<br>'+
            'd8P..Y8b.d88".888.888..888.d88P"........"88b.888....888.d88""88b.888."88b.<br>'+
            '88888888.888..888.888..888.888.......d888888.888....888.888..888.888..888.<br>'+
            'Y8b......Y88b.888.Y88b.888.Y88b.....888..888.Y88b...888.Y88..88P.888..888.<br>'+
            '."Y8888..."Y88888.."Y88888.."Y8888P."Y888888.."Y888.888.."Y88P"..888..888.<br>'+
            '..........................................................................<br>'+
            '...............................<b style="color:#fff">I may be delayed, but I\'m not a downgrade</b>..<br>'+
            '..........................................................................<br>'+
            '</span></div>'
        ,{raw: true});
        t.echo('\n');
        db.collection("education").get().then(function(snapshot){
            snapshot.forEach(function(doc){
                d = doc.data();
                console.log(doc.id);
                t.echo(
                    '<b style="color:#fff">'+d.school+'</b><br>'+
                    d.degree+'<br>'+
                    d.year_start+"-"+d.year_end
                    ,{raw:true}
                );
                t.echo('\n');
            })
        });    
    },

    organization: function() {
        t.echo('\n');
        t.echo(
            '<div class="bounce"><span class="contents">'+
            '...........................................d8b...................888....d8b...................<br>'+
            '...........................................Y8P...................888....Y8P...................<br>'+
            '.................................................................888..........................<br>'+
            '..d88b...888d888..d88b....8888b...88888b...888.88888888..8888b...888888.888...d88b...88888b...<br>'+
            'd88""88b.888P"..d88P"88b....."88b.888."88b.888....d88P......"88b.888....888.d88""88b.888."88b.<br>'+
            '888..888.888....888..888..d888888.888..888.888...d88P....d888888.888....888.888..888.888..888.<br>'+
            'Y88..88P.888....Y88b.888.888..888.888..888.888..d88P....888..888.Y88b...888.Y88..88P.888..888.<br>'+
            '."Y88P"..888....."Y88888."Y888888.888..888.888.88888888."Y888888.."Y888.888.."Y88P"..888..888.<br>'+
            '.....................888......................................................................<br>'+
            '................Y8b.d88P......................................................................<br>'+
            '................."Y88P".......................................................................<br>'+
            '</span></div>'
        ,{raw: true});
        t.echo('\n');
    },

    experience: function() {
        t.echo('\n');
        t.echo(
            '<div class="bounce"><span class="contents">'+
            '............................................d8b....................................<br>'+
            '............................................Y8P....................................<br>'+
            '...................................................................................<br>'+
            '..d88b...888..888.88888b.....d88b...888d888.888...d88b...88888b.....d8888b..d88b...<br>'+
            'd8P..Y8b.\`Y8bd8P\'.888."88b.d8P..Y8b.888P"...888.d8P..Y8b.888."88b.d88P"...d8P..Y8b.<br>'+
            '88888888...X88K...888..888.88888888.888.....888.88888888.888..888.888.....88888888.<br>'+
            'Y8b.......d8""8b..888.d88P.Y8b......888.....888.Y8b......888..888.Y88b....Y8b......<br>'+
            '."Y8888..888..888.88888P"..."Y8888..888.....888.."Y8888..888..888.."Y8888P."Y8888..<br>'+
            '..................888..............................................................<br>'+
            '..................888..............................................................<br>'+
            '..................888..............................................................<br>'+
            '</span></div>'
        ,{raw: true});
        t.echo('\n');
    },

    portfolio: function() {
        t.echo('\n');
        t.echo(
            '<div class="bounce"><span class="contents">'+
            '..........................888......d888.........888.d8b..........<br>'+
            '..........................888....d88P"..........888.Y8P..........<br>'+
            '..........................888....888............888..............<br>'+
            '88888b.....d88b...888d888.888888.888888..d88b...888.888...d88b...<br>'+
            '888."88b.d88""88b.888P"...888....888...d88""88b.888.888.d88""88b.<br>'+
            '888..888.888..888.888.....888....888...888..888.888.888.888..888.<br>'+
            '888.d88P.Y88..88P.888.....Y88b...888...Y88..88P.888.888.Y88..88P.<br>'+
            '88888P"..."Y88P"..888......"Y888.888...."Y88P"..888.888.."Y88P"..<br>'+
            '888..............................................................<br>'+
            '888..............................................................<br>'+
            '888.............................................................. <br>'+           
            '</span></div>'
        ,{raw: true});
        t.echo('\n');
    },

    contact: function() {
        t.echo('\n');
        t.echo(
            '<div class="bounce"><span class="contents">'+
            '..........................888......................888....<br>'+
            '..........................888......................888....<br>'+
            '..........................888......................888....<br>'+
            '..d8888b..d88b...88888b...888888..8888b.....d8888b.888888.<br>'+
            'd88P"...d88""88b.888."88b.888........"88b.d88P"....888....<br>'+
            '888.....888..888.888..888.888.....d888888.888......888....<br>'+
            'Y88b....Y88..88P.888..888.Y88b...888..888.Y88b.....Y88b...<br>'+
            '."Y8888P."Y88P"..888..888.."Y888."Y888888.."Y8888P.."Y888.<br>'+
            '..........................................................<br>'+
            '..........................................................<br>'+
            '..........................................................<br>'+          
            '</span></div>'
        ,{raw: true});
        t.echo('\n');
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
                    t.echo(
                        '[<a href="javascript:t.exec(\''+i+'\')" class="navlink">x</a>]  '+i.toString()+'   '+d.school+
                        '<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'+d.degree+
                        '<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'+d.year_start+"-"+d.year_end
                        ,{raw: true}
                        );
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
    },

    edit: function(coll){
        if(coll.toLowerCase()=="introduction"){
            console.log('Editing about');
            db.collection("other").doc("intro").get().then(function(val){
                let intro = val.data().value;
                console.log(intro);
                t.insert(intro);
            });
            
            this.push(function(str) {
                if (str) {
                    this.pop();
                    db.collection("other").doc("intro").update({value:str}).then(function() {
                        t.echo('[[b;green;;;]SUCCESS!!!]');
                        location.reload();
                    }).catch(function(err) {
                        console.error("Error editing document: ", err);
                        t.echo('[[b;red;;;]FAILURE!!!]');
                        t.echo(err);
                    });
                }else{
                    console.log('no input');
                }
            }, {
                prompt: 'Edit introduction message: \n'
            });
        }
    }
}, {
    prompt: '[[;#16C60C;]guest@resume]:[[;#3B78FF;]~]$ ',
    greetings:  false,
    anyLinks: true
    // historyState: true
});
t.echo('\n');
t.echo(
    '<div class="bounce"><span class="contents">'+
    '<span style="color:#0037DA">888</span>....<span style="color:#0037DA">888</span>..........<span style="color:#13A10E">888</span>.<span style="color:#881798">888</span>...............<span style="color:#CCCCCC">888</span>.......<span style="color:#CCCCCC">888</span>..................<span style="color:#61D6D6">888</span>......<span style="color:#16C60C">888</span>......<span style="color:#B4009E">888</span>.<br>'+
    '<span style="color:#0037DA">888</span>....<span style="color:#0037DA">888</span>..........<span style="color:#13A10E">888</span>.<span style="color:#881798">888</span>...............<span style="color:#CCCCCC">888</span>...<span style="color:#CCCCCC">o</span>...<span style="color:#CCCCCC">888</span>..................<span style="color:#61D6D6">888</span>......<span style="color:#16C60C">888</span>......<span style="color:#B4009E">888</span>.<br>'+
    '<span style="color:#0037DA">888</span>....<span style="color:#0037DA">888</span>..........<span style="color:#13A10E">888</span>.<span style="color:#881798">888</span>...............<span style="color:#CCCCCC">888</span>..<span style="color:#CCCCCC">d8b</span>..<span style="color:#CCCCCC">888</span>..................<span style="color:#61D6D6">888</span>......<span style="color:#16C60C">888</span>......<span style="color:#B4009E">888</span>.<br>'+
    '<span style="color:#0037DA">8888888888</span>...<span style="color:#3A96DD">d88b</span>...<span style="color:#13A10E">888</span>.<span style="color:#881798">888</span>...<span style="color:#C50F1F">d88b</span>........<span style="color:#CCCCCC">888</span>.<span style="color:#CCCCCC">d888b</span>.<span style="color:#CCCCCC">888</span>...<span style="color:#C19C00">d88b</span>...<span style="color:#3B78FF">888d888</span>.<span style="color:#61D6D6">888</span>...<span style="color:#16C60C">d88888</span>......<span style="color:#B4009E">888</span>.<br>'+
    '<span style="color:#0037DA">888</span>....<span style="color:#0037DA">888</span>.<span style="color:#3A96DD">d8P</span>..<span style="color:#3A96DD">Y8b</span>.<span style="color:#13A10E">888</span>.<span style="color:#881798">888</span>.<span style="color:#C50F1F">d88""88b</span>......<span style="color:#CCCCCC">888d88888b888</span>.<span style="color:#C19C00">d88""88b</span>.<span style="color:#3B78FF">888P"</span>...<span style="color:#61D6D6">888</span>.<span style="color:#16C60C">d88"</span>.<span style="color:#16C60C">888</span>......<span style="color:#B4009E">888</span>.<br>'+
    '<span style="color:#0037DA">888</span>....<span style="color:#0037DA">888</span>.<span style="color:#3A96DD">88888888</span>.<span style="color:#13A10E">888</span>.<span style="color:#881798">888</span>.<span style="color:#C50F1F">888</span>..<span style="color:#C50F1F">888</span>......<span style="color:#CCCCCC">88888P</span>.<span style="color:#CCCCCC">Y88888</span>.<span style="color:#C19C00">888</span>..<span style="color:#C19C00">888</span>.<span style="color:#3B78FF">888</span>.....<span style="color:#61D6D6">888</span>.<span style="color:#16C60C">888</span>..<span style="color:#16C60C">888</span>......<span style="color:#B4009E">Y8P</span>.<br>'+
    '<span style="color:#0037DA">888</span>....<span style="color:#0037DA">888</span>.<span style="color:#3A96DD">Y8b</span>......<span style="color:#13A10E">888</span>.<span style="color:#881798">888</span>.<span style="color:#C50F1F">Y88</span>..<span style="color:#C50F1F">88P</span>......<span style="color:#CCCCCC">8888P</span>...<span style="color:#CCCCCC">Y8888</span>.<span style="color:#C19C00">Y88</span>..<span style="color:#C19C00">88P</span>.<span style="color:#3B78FF">888</span>.....<span style="color:#61D6D6">888</span>.<span style="color:#16C60C">Y88b</span>.<span style="color:#16C60C">888</span>.......<span style="color:#B4009E">"</span>..<br>'+
    '<span style="color:#0037DA">888</span>....<span style="color:#0037DA">888</span>..<span style="color:#3A96DD">"Y8888</span>..<span style="color:#13A10E">888</span>.<span style="color:#881798">888</span>..<span style="color:#C50F1F">"Y88P"</span>.......<span style="color:#CCCCCC">888P</span>.....<span style="color:#CCCCCC">Y888</span>..<span style="color:#C19C00">"Y88P"</span>..<span style="color:#3B78FF">888</span>.....<span style="color:#61D6D6">888</span>..<span style="color:#16C60C">"Y88888</span>......<span style="color:#B4009E">888</span>.<br>'+
    '...............................................................................................<br>'+
    '.....................<b style="color:#fff">My ancestors are smiling at my CSS marquees</b>...<b style="color:#fff">Can you say the same?</b>.......<br>'+
    '...............................................................................................'+
    '</span></div>'
    ,{raw: true}
);
t.echo('\n');
t.echo(
    'Use these commands to get started:<br>'+
    ' - <a href="javascript:t.exec(\'about\')" class="navlink">about</a><br>'+
    ' - <a href="javascript:t.exec(\'education\')" class="navlink">education</a><br>'+
    ' - <a href="javascript:t.exec(\'organization\')" class="navlink">organization</a><br>'+
    ' - <a href="javascript:t.exec(\'experience\')" class="navlink">experience</a><br>'+
    ' - <a href="javascript:t.exec(\'portfolio\')" class="navlink">portfolio</a><br>'+
    ' - <a href="javascript:t.exec(\'contact\')" class="navlink">contact</a><br><br>'
    ,{raw:true}
);
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // console.log(user.email)
        t.set_prompt('[[;#16C60C;]'+user.email+']:[[;#3B78FF;]~]$ ');
        admin = 1;
    } else {
        t.set_prompt('[[;#16C60C;]guest@resume]:[[;#3B78FF;]~]$ ');
    }
});