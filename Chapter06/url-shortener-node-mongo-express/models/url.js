var mongoose = require('mongoose');
var connection = require('./connection');
var Schema = mongoose.Schema;

connection.once('open',function() {
  console.log("Connected....");
});

var CounterSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});

var counter = mongoose.model('counter', CounterSchema);

// create a schema for our links
var urlSchema = new Schema({
  _id: {type: Number, index: true},
  long_url: String,
  clicked: {type: Number, default:0 ,index: true},
  created_at: Date
});

urlSchema.pre('save', function(next){
  var doc = this;
  counter.findByIdAndUpdate({_id: 'url_count'}, {$inc: {seq: 1}}, function(error, counter) {
      if (error)
          return next(error);
          console.log(counter);
      doc.created_at = new Date();
      doc._id = counter.seq;
      next();
  });
});

var Url = mongoose.model('Url', urlSchema);

module.exports = Url;
