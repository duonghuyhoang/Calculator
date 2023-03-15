
$(document).ready(function() {
    let firstValue = '';
    let secondValue = '';
    let key = '';
    let showNumResult = '';
    let result = '';
    const numPress = [ 
            {which: 37, val: 'percent'},
            {which: 8, val: 'delete'},
            {which: 13,val: 'equal'},
            {which: 49, val: '1'},
            {which: 50, val: '2'},
            {which: 51, val: '3'},
            {which: 52, val: '4'},
            {which: 53, val: '5'},
            {which: 54, val: '6'},
            {which: 55, val: '7'},
            {which: 56, val: '8'},
            {which: 57, val: '9'},
            {which: 48, val: '0'},
            {which: 43, val: '+'},
            {which: 45, val: '-'},
            {which: 42, val: '*'},
            {which: 47, val: '/'}
    ]
    $('.btn').on('click', function() {
        let value = $(this).val();
        calculate(value)
        showInput(showNumResult)
    })
    const calculate = (value) => {
        if(!isNaN(value)) {
            if(key) {
                if(result && !secondValue) {
                    firstValue = result;
                } 
                secondValue += value;
                showNumResult += value;   
                coumpute(key)
            }else {
                firstValue += value;
                showNumResult += value; 
            }
            showResult(result)
        }else if(value == '+' || value == '-' || value == '*' || value == '/') {
            secondValue = '';
            key = value;
            showNumResult += value;
        }else if (value == 'delete-all') {
            result = '';
            key = '';
            showNumResult = '';
            firstValue = '';
            secondValue = '';
            $('.input').empty();
            $('.result').empty();
        }else if(value == 'equal') {
            showResult(result)
            showInput(showNumResult)
        }else if(value == '.') {
                if( firstValue.startsWith('.')) {
                    firstValue += value;
                    '0' + firstValue
                    showNumResult += value;   
                }
                else  {
                    secondValue += value;
                    firstValue += value; 
                    showNumResult += value;   
                }
                
        }else if(value == 'percent') {
                if (secondValue) {
                    showNumResult = showNumResult.slice(0,-secondValue.length)
                    secondValue = secondValue/100;
                    showNumResult += secondValue;
                    coumpute(key)
                    showResult(result)
                }else {
                    showNumResult = '';
                    firstValue = firstValue/100;
                    showNumResult += firstValue;
                }
        }else if (value == 'delete') {
                if(!showNumResult) {
                    result = '';
                    key = '';
                    firstValue = '';
                    secondValue = '';
                    $('.result').empty()
                }
                if (secondValue) {
                    secondValue = secondValue.toString()
                    secondValue = secondValue.slice(0,-1);
                    showNumResult = showNumResult.slice(0,-1)
                    coumpute(key)
                    showResult(result)
                }else {
                    firstValue = firstValue.toString()
                    firstValue = firstValue.slice(0,-1)
                    showNumResult = showNumResult.slice(0,-1);
                }
        }
    }
   
  
    $(document).keypress(function(e) {
        let value = '';
        for( let i in numPress) {
            if(e.which == numPress[i].which) {
                 value = numPress[i].val;
            }
        }
        calculate(value)
        showInput(showNumResult)
    })
    $(document).keyup(function(e) {
        let value = '';
        if(e.which == 8) {
            value = 'delete';
        }
        calculate(value)
        showInput(showNumResult)
    })
    $(document).keyup(function(e) {
        let value = '';
        if(e.which == 13) {
            value = 'equal';
        }
        calculate(value)
        showInput(showNumResult)
    })
    const coumpute = (key) => {
        switch(key) {
            case "+":
                result = (Number(firstValue) + Number(secondValue));
                break;
            case "-":
                result = (Number(firstValue) - Number(secondValue));
                break;
            case "*":
                result = (Number(firstValue) * Number(secondValue));
                break;
            case "/":
                result = (Number(firstValue) / Number(secondValue));
                break;
        }
    }
    const showInput = (input) => {
        $('.input').html(input)
    }
    const showResult = (input) => {
        $('.result').html(input)
    }
    $('.icon-dark-mode').click(function(e) {
        $('.title').toggleClass('title-night');
        $('body').toggleClass('body-night');
        $('.main').toggleClass('main-night');
        $('.input-result').toggleClass('input-result-night');
        $('.input').toggleClass('input-night text-night');
        $('.result').toggleClass('text-night');
        $('.btn').toggleClass('.btn-night');
        
    })
    
})
