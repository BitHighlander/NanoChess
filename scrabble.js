/**
 * Created by highlander on 3/17/17.
 */

var Redis = require('then-redis')
var redis = Redis.createClient('tcp://localhost:6379');

let voules = ["a","e","i","o","u"]
//
let letterbank = ["c","a","t"]
let fs = require('fs')
let dictionary
//7 letters
fs.readFile("./../data/dictionary.txt","utf8",function(err, read_data){
    if(err) throw err

    console.log(read_data)
    read_data.split("\n")

    //iterate over
    for (var i = 0; i < read_data.length; i++) {
        dictionary.push(read_data[i])
        //get word
        //Optimazation
        // console.log("Word: ",read_data[i])
        // let word = read_data[i]
        // //strip non vouls
        // let voulIndexA = []
        // for (var j = 0; j < word.length; j++) {
        //     if(voules.indexOf(word[j]) >= 0) voulIndexA.push(word[j])
        // }
        // let voulIndex = voulIndexA.toString()
        // redis.zadd(voulIndex,word.length(),word)
    }
})

var permArr = [],
    usedChars = [];

function permute(input) {
    var i, ch;
    for (i = 0; i < input.length; i++) {
        ch = input.splice(i, 1)[0];
        usedChars.push(ch);
        if (input.length == 0) {
            permArr.push(usedChars.slice());
        }
        permute(input);
        input.splice(i, 0, ch);
        usedChars.pop();
    }
    return permArr
};


let findWords = function(words){

    let permutations = permute(words)
    let words = []
    //find all permuations
    for (i = 0; i < permutations.length; i++) {
        if(dictionary.indexOf(permutations[i]) >= 0){
            words.push(permutations[i])
        }
    }
    //indexofDictionary
    return words
}

vorpal.command('scabble [items...]', ' Params: letters')
     //.option('-a')
    .action( async(function (args,cb){
        var tag = " | run | "
        try{
            let items = args.items[0]
            //
            let result = await(findWords(items))
            console.log(result)
            cb()
        }catch(e){
            console.error(tag," ERROR: Failed to get depist e:",e)
        }
        const self = this;
    }))

//dictionary

//sort by vowl
//score by length


//words
