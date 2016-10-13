function Calculator() {

  var current='';
  var history=[];
  var entry=[];

  this.setCurrent = function (value) {
    if(!isNaN(value) || value === '.') {   
      if (value === '.') {
        if (current.length !== 0 && current.indexOf('.') == -1){
          current += value; 
        } else if (current.length === 0) {
          current += 0;
          current += value;
        }
      } else {
        if (!isNaN(this.getLastEntry())){
          this.removeEntry();
          this.removeHistory()
          current += value;
        } else {
           current += value;
        }
        
      }
    } else {
      
      if (current.charAt(current.length - 1) == '.') {
        current = current.substring(0, current.length -1);
      }
      
      
      if (current.length > 0 && !isNaN(current)) {
        this.addEntry(current);
        this.addHistory(current);
        current = value;
        this.addEntry(current);
        this.addHistory(current);
        current = '';
      } else if (current.length == 0 && entry.length !== 0){
        this.changeEntry(value);
        this.changeHistory(value);
       } 
    }
  }

  this.calculate = function() {
  
      if (current.charAt(current.length - 1) == '.') {
        current = current.substring(0, current.length -1);
      }

  	if (current.length !== 0) {
  		this.addEntry(current);
  		this.addHistory(current);
  		return Math.round(eval(this.getEntryString())*100)/100;
  	} else if (current.length === 0) {
  		if (isNaN(this.getLastEntry())) {
  			this.removeEntry();
  			this.removeHistory();
  			return Math.round(eval(this.getEntryString())*100)/100;
  		} else {
  			return Math.round(eval(this.getEntryString())*100)/100;
  		}
  	}
  }
  
  this.getCurrentLength = function() {
    return current.length;
  }
  
  this.clearCurrent = function(){
    current = '';
  }
  
  this.clearEverything = function() {
		current='';
		history=[];
		entry=[];
  }

  this.historyHelper = function(value) {
    if (value === '*') {
      return 'x';
    }
    if (value === '/') {
      return '&divide;';
    }

    return value;
  }


  this.addHistory = function (value) {
    history.push(this.historyHelper(value));
  }

  this.getHistory = function(){
    return history;
  }

  this.changeHistory = function(value) {
    history[history.length-1] = this.historyHelper(value);
  }

  this.getHistoryString = function(){
    return history.join(' ');
  }
  
  this.getLastHistory = function(){ 
    return history[history.length -1];
  }
  
  this.removeHistory = function(){
    history.pop();
  }

  this.addEntry = function (value) {
    entry.push(value);
  }

  this.getEntry = function () {
    return entry;
  }
  
  this.getEntryLength = function() {
    return entry.length;
  }

  this.getEntryString = function () {
    return entry.join('');
  }

  this.changeEntry = function(value) {
    entry[entry.length-1] = value;
  }

  this.getLastEntry = function() {
    return entry[entry.length -1];
  }

  this.removeEntry = function () {
    entry.pop();
  }

  this.getCurrent = function() {
    return current;
  }
}//Class ended here.
/*  TESTING
var cal = new Calculator();
cal.setCurrent('x');
cal.setCurrent(5);
cal.setCurrent(5);
cal.setCurrent('.');
cal.setCurrent('.');
cal.setCurrent(2);
cal.setCurrent('*');
cal.setCurrent('+');
cal.setCurrent('/');
cal.setCurrent(5);
console.log(cal.getEntry());
console.log(cal.getHistoryString()); */


  var cal = new Calculator();
  var temp = '';
  
  $("button").on('click', function(){
    var value = $(this).attr("value");
    
    if (cal.getEntryLength() > 10) {
      cal.clearEverything();    
      alert('Too many calculation! calculator will reset.');
    }  
        
    if (value.length == 1 && value !== '=') {
      cal.setCurrent(value);
         
      if (cal.getCurrentLength() >= 12) {
        cal.clearCurrent();
        $('#answer').html(0);
        $('#history>p').html(0);
    }
      
      if (cal.getCurrent() !== '') {

        $('#answer').html(cal.getCurrent());
        if (cal.getHistoryString()) {
          $('#history>p').html(cal.getHistoryString()+cal.getCurrent());
        } else {
           $('#history>p').html(cal.getCurrent());
        }       
      } else {
        $('#answer').html(cal.historyHelper(value));
        if (cal.getHistoryString()) {
          $('#history>p').html(cal.getHistoryString());
        } 
      }  
    } // end of if (value.length == 1 && value !== '=')
    else if (value === '=') {
      $('#answer').html(cal.calculate());
      $('#history>p').html(cal.getHistoryString());
      cal.clearEverything();
    } 
    
    else if (value === 'ac') {

      cal.clearEverything();
      $('#answer').html(0);
      $('#history>p').html(0);
    } 
    
    else if (value ==='ce'){
      if (cal.getCurrentLength() !== 0) {
        cal.clearCurrent();
        if (cal.getEntryLength()) {
          $('#answer').html(cal.getLastHistory);
          $('#history>p').html(cal.getHistoryString());
        } else {
          $('#answer').html(0);
          $('#history>p').html(0);
        }
      } else {
        if (cal.getEntryLength()>1) {
          cal.removeEntry();
          cal.removeHistory();
          $('#answer').html(cal.getLastHistory);
          $('#history>p').html(cal.getHistoryString());
          cal.setCurrent(cal.getLastHistory())
        } else {
          $('#answer').html(0);
          $('#history>p').html(0);
        }
        
  

      }
    }
       
   
  })

