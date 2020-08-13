var db = firebase.firestore();

let t = $('#terminal').terminal({
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
                    t.set_prompt('[[;#66ff00;]'+u+'>]');
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
            '<marquee>..d88P.................................<b style="color:#fff">it\'s not lazy, it\'s minimalist</b>...................\n</marquee>'+
            '<marquee>888P"...................................................................................\n</marquee>' 
        ,{raw: true});
        // t.echo('Jediah Apirin Billones');
        // t.echo('156 Scout Fuentebella St., Diliman, Quezon City 1103 Metro Manila');
        // t.echo('(0967) 236 3691');
        // t.echo('jediah_billones@dlsu.edu.ph');
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
            '<marquee>..........................................................................</marquee>'
        ,{raw: true});
        t.echo('\n');
        db.collection("education").get().then(function(snapshot){
            snapshot.forEach(function(doc){
                d = doc.data();
                console.log(d);
                t.echo('[[b;#fff;;;]'+d.school+']');
                t.echo(d.degree);
                t.echo(d.year_start+"-"+d.year_end);
                t.echo('\n');
            })
        });    
    }
}, {
    greetings:    
    'Hey there! Welcome to my interactive resume.\n\n'+
    'type any of the following commands\nto get started:\n'+
    '- [[!;#fff;;;]introduction]\n'+
    '- [[!;#fff;;;]education]\n'+
    '- [[!;#fff;;;]organization]\n'+
    '- [[!;#fff;;;]work]\n'+
    '- [[!;#fff;;;]contact]\n'
});