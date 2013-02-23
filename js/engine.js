const hoverColor = '#8ebabf';
const clickColor = '#bddfe3';
const killableColor = '#edb4c1';
var currentColor ='white';
var isWhiteDown = true;
var boxColor = '#9fd0d6'//'#'+Math.floor(Math.random()*16777215).toString(16);
var minutesToWait = 1;
var mns = minutesToWait;
if(minutesToWait % 10 == minutesToWait){
    mns = '0' + minutesToWait;
}
$(document).ready(function(){
	//alert(playerSide);
	
			
    $('.clock_white , .clock_black').html(mns + ':00');
    $('.clock_white').addClass('clock_running');
    displayBoardMarks();
    $('.wrapper').css('box-shadow' , '0 0 25px ' + boxColor).css('-webkit-box-shadow' , boxColor + ' 0px 0px 25px');
    if($.browser.msie){
        $('body').html("Sorry this site doesn't run on Internet Explorer. Visit us using Firefox, Chrome, Opera or Safari :)");
        return;
    }    
    setColors();    
    makeDraggables(currentColor);
    $('#colorpicker').css('background-color' , boxColor).ColorPicker({
        color: boxColor,
        onShow: function (colpkr) {
            $(colpkr).css('z-index' , '2000');
            $(colpkr).fadeIn(500);
            return false;
        },
        onHide: function (colpkr) {
            $(colpkr).fadeOut(500);
            return false;
        },
        onChange: function (hsb, hex, rgb) {
            $('#colorpicker').css('background-color' , '#'+hex);
            $('.wrapper').css({
                'box-shadow' : '0 0 25px #'+hex,
                '-webkit-box-shadow' : '0 0 25px #'+hex
            });
            boxColor = '#' + hex;
            setColors();
        }

		
    });
    $('#flip').hover(function abc(ev){
        $(this).css('background-position' , 'bottom left');
    }, function abc(ev){
        $(this).css('background-position' , 'top left');
    });
	

	

		if(playerSide == "black")
		{
			alert("damn it");
			flipTheBoard();
		}
	
    
});
function draggable(piece, color){
if(currentColor != playerSide)
{
	$(".wrapper>div>div").draggable().draggable('destroy');
	unbind();
	setColors();
	return;
}
    $(".wrapper>div>div." + piece +"." + color).draggable({
        revert:'invalid',
        stack: '.wrapper>div>div',
        containment:'.wrapper',
        zIndex: 1000,
        helper : function(){
            var helper = $('#hiddenHelper').clone();
            helper.addClass("chess_piece "+ piece + " " + color).css({
                'display':'block' ,
                'cursor' : 'pointer'
            });
            return helper;
        },
        start: function(){
            pieceId = $(this).attr('id');
            pieceColor = $(this).attr('color');
            pieceName = $(this).attr('piece');
            position  = getAllowedPositions(pieceId, pieceColor, pieceName);
            try{
                $('#hiddenHelper').css('cursor' , 'move');
                //ps = getPosition($(this));
                //alert(pieceId);
                kingId = $('.wrapper>div>div[piece=king][color=' + currentColor + ']').attr('id');
            
                //alert(position);
                totalPos = position.split(' ');
                //position = getPosSelector(position);
                //alert(position);
                $('#' + pieceId).removeAttr('piece').removeAttr('color');
                notAllowed = "";
                //alert(kingId + ' ' + pieceColor);
                //alert(position);
                if(pieceName != 'king'){
                    //alert(position);
                    $(getPosSelector(position)).each(function(){
                        //alert(position);
                        pc = $(this).attr('piece');
                        clr = $(this).attr('color');
                        $(this).attr('piece' , pieceName).attr('color' , pieceColor);
                        if(isCheck(kingId, pieceColor)){
                            notAllowed += $(this).attr('id') + ' ';
                        }
                        if(pc){
                            $(this).attr('piece' , pc).attr('color' , clr);
                        }
                        else {
                            $(this).removeAttr('piece').removeAttr('color');
                        }
                    });

                }
                else if(pieceName == 'king'){
                    notAllowed = '';
                }
                notAllowedPos = $.trim(notAllowed).split(' ');
                //alert(position);
                //alert('Total: ' + position + ' ' + totalPos.length + ' Not Allowed:' + notAllowed + ' ' + notAllowedPos.length);
                if(notAllowedPos.length!=0 && notAllowedPos[0]!=""){
                    //totalPos = new Array();
                    position = "";
                    for(i=0;i<totalPos.length;i++){
                        if(notAllowedPos.indexOf(totalPos[i]) == -1){
                            position += totalPos[i] + ' ';
                        }
                    }
                //alert(position);
                //position = getPosSelector(position);
                //alert('Total Allowed: ' + position);
                }

                $(this).attr('piece' , pieceName).attr('color' , pieceColor);
                if(position!='' || position!= '#'){
                    $('.wrapper>div>div').droppable().droppable('destroy');
                    setColors();
                    //alert(position);
                    makeDropables(position);
                }
            }
            catch(exc){
                alert('Error ' + position );
            }
        },
        stop:function(){
            setColors();
			
        }
    });
       
}
function unbind(){
    $('.wrapper>div>div').bind('click',function(){}).unbind('click');
}
function bind(){
if(currentColor != playerSide)
{
	$(".wrapper>div>div").draggable().draggable('destroy');
	unbind();
	$('#statusPiece').removeClass(getOtherColor(currentColor)).addClass(currentColor);
    $('#statusMessage').html( currentColor.toUpperCase() + ' moves');
    $('#systemMessage').html( getOtherColor(currentColor).toUpperCase() + ' waiting');
	setColors();
	return;
}
    $('.wrapper>div>div[color=' + currentColor + ']').bind('click', function(){
        ///////////////////////////////////////////////////////
        pieceId = $(this).attr('id');
        pieceColor = $(this).attr('color');
        pieceName = $(this).attr('piece');
        kingId = $('.wrapper>div>div[piece=king][color=' + currentColor + ']').attr('id');
        kingValid = "";
        /////////////////////////////////////////////////////////
        unbind();
        bind();
        //$(this).unbind('mouseenter mouseleave').css('cursor' , 'auto');
        setColors();
        item = $(this);
        //position = getPosition(item);
        ///////////////////////////////////////////////////////////
        position  = getAllowedPositions(pieceId, pieceColor, pieceName);
        totalPos = position.split(' ');
        position = getPosSelector(position);
        //alert(position);
        $('#' + pieceId).removeAttr('piece').removeAttr('color');
        notAllowed = "";
        //alert(kingId + ' ' + pieceColor);
        if(pieceName != 'king'){
            $(position).each(function(){
                pc = $(this).attr('piece');
                clr = $(this).attr('color');
                $(this).attr('piece' , pieceName).attr('color' , pieceColor);
                if(isCheck(kingId, pieceColor)){
                    notAllowed += $(this).attr('id') + ' ';
                }
                if(pc){
                    $(this).attr('piece' , pc).attr('color' , clr);
                }
                else {
                    $(this).removeAttr('piece').removeAttr('color');
                }
            });
        }
        else if(pieceName == 'king'){
            notAllowed = '';
        }
        notAllowedPos = $.trim(notAllowed).split(' ');
        //alert('Total: ' + position + ' ' + totalPos.length + ' Not Allowed:' + notAllowed + ' ' + notAllowedPos.length);
        if(notAllowedPos.length!=0 && notAllowedPos[0]!=""){
            //totalPos = new Array();
            position = "";
            for(i=0;i<totalPos.length;i++){
                if(notAllowedPos.indexOf(totalPos[i]) == -1){
                    position += totalPos[i] + ' ';
                }
            }
             
            position = getPosSelector(position);
        //alert('Total Allowed: ' + position);
        }
        if(pieceName){
            $(this).attr('piece' , pieceName).attr('color' , pieceColor);
        }
        ///////////////////////////////////////////////////////////////////////////////
        if(position!='#' || position!=""){
            $(position).each(function(){
                clr = clickColor;
                if($(this).attr('color')){
                    clr = killableColor;
                }
                $(this).css({
                    'background-color' : clr
                });
            });
            $(position).bind('click' , function(){
                $(position).css('cursor','auto');
                move(item, $(this));
            });
        }
    });
    setColors();
}
function setMissingColors(){
    $('.wrapper>div>div[id!=hiddenHelper]').each( function(){
        if($(this).attr('color') && $(this).attr('piece')){
            $(this).addClass('chess_piece ' + ' ' + $(this).attr('color') + ' ' + $(this).attr('piece')).addClass('Column');
        }
    });
}
function makeDraggables(color){

    unbind();
    draggable('pawn', color);
    draggable('king', color);
    draggable('queen', color);
    draggable('rook', color);
    draggable('bishop', color);
    draggable('knight', color);
    bind();
    $('.wrapper div').unbind('mouseenter mouseleave').not('.ui-draggabe').css('cursor' , 'auto');
    setColors();
    var color;
    $('.ui-draggable').hover(function(env){
        color = $(this).css('background-color');
        $(this).css('background-color', hoverColor);
    }, function(ev){
        $(this).css('background-color', color);
    }).css('cursor' , 'pointer');
}
function makeDropables(p){
    p = getPosSelector(p);
    //alert(p);
    //alert(p);
    if(p!= '#' && p!=''){
         
        $(p).droppable({
            snap:'true',
            snapTolerance:'50',
            drop: function(event,ui){
                move(ui.draggable , $(this));
                $(ui.helper).remove();
            },
            deactivate : function(event, ui){
                setColors();
            }
        }).each(function(){
            clr = clickColor;
            if($(this).attr('color')){
                clr = killableColor;
            }
            $(this).css({
                'background-color' : clr 
            });
        });
    }
}
function getAllowedPositions(position, color, piece){
    var columns = new Array('' , 'a' , 'b', 'c', 'd' , 'e', 'f', 'g' , 'h');
    if(isWhiteDown){
        columns = new Array('','h' , 'g', 'f', 'e' , 'd', 'c', 'b' , 'a');
    }
    var allowedPositions = "";
    var test = $.trim(position).charAt(0);
    //column = columns.indexOf(test);
    for(i=0;i<columns.length;i++){
        if(columns[i] == test)
            column = i;
    }
    row = parseInt($.trim(position).charAt(1));
    if(isNaN(row) || column<1 || column>8 || $.trim(position).length != 2)
    {
        return'';
    }
    switch($.trim(color)){
        case 'white':
            switch($.trim(piece)){
                case 'pawn':
                    allowedPositions += getPawnMoves(row, column, columns, 'white');
                    break;
                case 'king':
                    allowedPositions += getKingMoves(row, column, columns, 'white');
                    break;
                case 'queen':
                    allowedPositions += getBishopMoves(row, column, columns, 'white');
                    allowedPositions += getRookMoves(row, column, columns, 'white');
                    break;
                case 'bishop':
                    allowedPositions += getBishopMoves(row, column, columns, 'white')
                    break;
                case 'rook':
                    allowedPositions += getRookMoves(row, column, columns, 'white');
                    break;
                case 'knight':
                    allowedPositions += getKnightMoves(row, column, columns, 'white');
                    break;
                default:
                    return '';
                    break;
            }
            break;
        case 'black':
            switch($.trim(piece)){
                case 'pawn':
                    allowedPositions += getPawnMoves(row, column, columns, 'black');
                    break;
                case 'king':
                    allowedPositions += getKingMoves(row, column, columns, 'black');
                    break;
                case 'queen':
                    allowedPositions += getBishopMoves(row, column, columns, 'black');
                    allowedPositions += getRookMoves(row, column, columns, 'black');
                    break;
                case 'bishop':
                    allowedPositions += getBishopMoves(row, column, columns, 'black');
                    break;
                case 'rook':
                    allowedPositions += getRookMoves(row, column, columns, 'black');
                    break;
                case 'knight':
                    allowedPositions += getKnightMoves(row, column, columns, 'black');
                    break;
                default:
                    return'';
                    break;
            }
            break;
        default:
            return'';
            break;

    }
    return $.trim(allowedPositions);
}
function setColors(){
    $(".wrapper>div:odd>div[id!=hiddenHelper]:odd").css('background-color', '#fff');
    $(".wrapper>div:even>div[id!=hiddenHelper]:even").css('background-color', '#fff');
    $(".wrapper>div:odd>div[id!=hiddenHelper]:even").css('background-color', boxColor);
    $(".wrapper>div:even>div[id!=hiddenHelper]:odd").css('background-color', boxColor);
    setMissingColors();
    try{
        king = $('.wrapper>div>div[piece=king][color=' + currentColor + ']');
        if(king.attr('id') && isCheck(king.attr('id'), currentColor)){
            king.css('background-color' , killableColor);
            //        if(isCheckmate()){
            //            $('#statusMessage').html("<span style='color:" + killableColor + ";'>"  + currentColor.toUpperCase() + ' was checked mate</span>');
            //            $('#systemMessage').html(getOtherColor(currentColor) + ' won');
            //            $('.wrapper>div>div').draggable().draggable('destroy').unbind('click mouseenter mouseleave').css('cursor', 'auto');
            //        }
            //        else if(isStealmate()){
            //
            //        }
            //        else{
            $('#statusMessage').html("<span style='color:" + killableColor + ";'>"  + currentColor.toUpperCase() + ' saves check</span>');
        //       }
        }
    }
    catch(e){
        alert('got yeh');
    }
}

function getBishopMoves(row, column, columns, color){
    pos = "";
    rowA = parseInt(row+1);
    rowS = parseInt(row-1);
    col = column;
    r = row;
    opColor = "black";
    if(color == 'black')
        opColor = 'white';
    for(i=column; i<8; i++){
        ++col;
        --r;
        if(r<1)break;
        if($('#' + columns[col] + r).attr('color') == color)
            break;
        else if($('#' + columns[col] + r).attr('color') == opColor)
        {
            pos += (columns[col]) + (r) + " ";
            break;
        }
        pos += (columns[col]) + (r) + " ";
        if(r==1)
            break;
    }
    r= row;
    col = column;
    for(i=column; i>1; i--){
        --col;
        ++r;
        if($('#' + columns[col] + r).attr('color') == color)
            break;
        else if($('#' + columns[col] + r).attr('color') == opColor)
        {
            pos += (columns[col]) + (r) + " ";
            break;
        }
        pos += (columns[col]) + (r) + " ";
        if(r==8)
            break;
    }
    r= row;
    col = column;
    for(i=column; i>1; i--){
        --col;
        --r;
        if(r<1)break;
        if($('#' + columns[col] + r).attr('color') == color)
            break;
        else if($('#' + columns[col] + r).attr('color') == opColor)
        {
            pos += (columns[col]) + (r) + " ";
            break;
        }
        pos += (columns[col]) + (r) + " ";
        if(r==1)
            break;
    }
    r= row;
    col = column;
    for(i=column; i<8; i++){
        ++col;
        ++r;
        if($('#' + columns[col] + r).attr('color') == color)
            break;
        else if($('#' + columns[col] + r).attr('color') == opColor)
        {
            pos += (columns[col]) + (r) + " ";
            break;
        }
        pos += (columns[col]) + (r) + " ";
        if(r==8)
            break;
    }
        
    return pos;
}
function getKingMoves(row, column, columns, color){
    posKing = "";
    rows = new Array();
    cols = new Array();
    rows[0] = row -1;
    cols[0] = column;
    rows[1] = row +1;
    cols[1] = column;
    rows[2] = row;
    cols[2] = column -1;
    rows[3] = row;
    cols[3] = column + 1;
    rows[4] = row +1;
    cols[4] = column +1;
    rows[5] = row +1;
    cols[5] = column -1;
    rows[6] = row -1;
    cols[6] = column -1;
    rows[7] = row -1;
    cols[7] = column +1;
    // alert(checkForCheck(columns[cols[0]] + rows[0], color));
    if(!(rows[0] < 1 || cols[0] < 1 || rows[0] > 8 || cols[0] > 8 || $('#' + columns[cols[0]] + rows[0]).attr('color') == color)){
        if(isCheck(columns[cols[0]]+rows[0] , color)){
        // continue;
        }
        else{
            posKing = posKing + columns[cols[0]] + rows[0] + " ";
        }
    }
    if(!(rows[1] < 1 || cols[1] < 1 || rows[1] > 8 || cols[1] > 8 || $('#' + columns[cols[1]] + rows[1]).attr('color') == color)){
        if(isCheck(columns[cols[1]]+rows[1] , color)){
        //alert(columns[cols[1]]+rows[1]);
        // continue;
        }
        else{
            posKing = posKing + columns[cols[1]] + rows[1] + " ";
        }
    }
    if(!(rows[2] < 1 || cols[2] < 1 || rows[2] > 8 || cols[2] > 8 || $('#' + columns[cols[2]] + rows[2]).attr('color') == color)){
        if(isCheck(columns[cols[2]]+rows[2] , color)){
        //alert(columns[cols[2]]+rows[2]);
        // continue;
        }
        else{
            posKing = posKing + columns[cols[2]] + rows[2] + " ";
        }
    }
    if(!(rows[3] < 1 || cols[3] < 1 || rows[3] > 8 || cols[3] > 8 || $('#' + columns[cols[3]] + rows[3]).attr('color') == color)){
        if(isCheck(columns[cols[3]]+rows[3] , color)){
        //alert(columns[cols[3]]+rows[3]);
        // continue;
        }
        else{
            posKing = posKing + columns[cols[3]] + rows[3] + " ";
        }
    }
    if(!(rows[4] < 1 || cols[4] < 1 || rows[4] > 8 || cols[4] > 8 || $('#' + columns[cols[4]] + rows[4]).attr('color') == color)){
        if(isCheck(columns[cols[4]]+rows[4] , color)){
        //alert(columns[cols[4]]+rows[4]);
        // continue;
        }
        else{
            posKing = posKing + columns[cols[4]] + rows[4] + " ";
        }
    }
    if(!(rows[5] < 1 || cols[5] < 1 || rows[5] > 8 || cols[5] > 8 || $('#' + columns[cols[5]] + rows[5]).attr('color') == color)){
        if(isCheck(columns[cols[5]]+rows[5] , color)){
        //alert(columns[cols[5]]+rows[5]);
        // continue;
        }
        else{
            posKing = posKing + columns[cols[5]] + rows[5] + " ";
        }
    }
    if(!(rows[6] < 1 || cols[6] < 1 || rows[6] > 8 || cols[6] > 8 || $('#' + columns[cols[6]] + rows[6]).attr('color') == color)){
        if(isCheck(columns[cols[6]]+rows[6] , color)){
        //alert(columns[cols[6]]+rows[6]);
        // continue;
        }
        else{
            posKing = posKing + columns[cols[6]] + rows[6] + " ";
        }
    }
    if(!(rows[7] < 1 || cols[7] < 1 || rows[7] > 8 || cols[7] > 8 || $('#' + columns[cols[7]] + rows[7]).attr('color') == color)){
        if(isCheck(columns[cols[7]]+rows[7] , color)){
        //alert(columns[cols[7]]+rows[7]);
        // continue;
        }
        else{
            posKing = posKing + columns[cols[7]] + rows[7] + " ";
        }
    }
    return posKing;
}
function getPawnMoves(row, column, columns, color){
    allowedPositions = "";
    opColor = 'black';
    rowS = row-1;
    start = 7;
    first = 5;
    if(color == 'black'){
        opColor = 'white';
        rowS = row+1;
        start = 2;
        first = 4;
    }
    if($('#' + columns[column] + (rowS)).css('background-image') == "none"){
        if(row == start && $('#' + columns[column] + (first)).css('background-image') == "none"){
            allowedPositions += columns[column] + (rowS) + " ";
            allowedPositions += columns[column] + (first) + " ";
        }
        else{
            allowedPositions += columns[column] + (rowS) + " ";
        }
    }
    if(column!=1 && $('#' + columns[column-1] + (rowS)).css('background-image') != "none" && $('#' + columns[column-1] + (rowS)).attr('color') == opColor){
        allowedPositions += columns[column-1] + (rowS) + " ";
    }
    if(column!=8 && $('#' + columns[column+1] + (rowS)).css('background-image') != "none" && $('#' + columns[column+1] + (rowS)).attr('color') == opColor){
        allowedPositions += columns[column+1] + (rowS) + " ";
    }
    return allowedPositions;
}
function getRookMoves(row, column, columns, color){
    pos = "";
    rowA = parseInt(row+1);
    rowS = parseInt(row-1);
    col = column;
    r = row;
    opColor = "black";
    if(color == 'black')
        opColor = 'white';
    for(i=column; i<8; i++){
        ++col;
        if($('#' + columns[col] + r).attr('color') == color)
            break;
        else if($('#' + columns[col] + r).attr('color') == opColor)
        {
            pos += (columns[col]) + (r) + " ";
            break;
        }
        pos += (columns[col]) + (r) + " ";
    }
    r= row;
    col = column;
    for(i=column; i>1; i--){
        --col;
        if($('#' + columns[col] + r).attr('color') == color)
            break;
        else if($('#' + columns[col] + r).attr('color') == opColor)
        {
            pos += (columns[col]) + (r) + " ";
            break;
        }
        pos += (columns[col]) + (r) + " ";
    }
    r= row;
    col = column;
    for(i=row; i>1; i--){
        --r;
        if(r<1)break;
        if($('#' + columns[col] + r).attr('color') == color)
            break;
        else if($('#' + columns[col] + r).attr('color') == opColor)
        {
            pos += (columns[col]) + (r) + " ";
            break;
        }
        pos += (columns[col]) + (r) + " ";
    }
    r= row;
    col = column;
    for(i=row; i<8; i++){
        ++r;
        if($('#' + columns[col] + r).attr('color') == color)
            break;
        else if($('#' + columns[col] + r).attr('color') == opColor)
        {
            pos += (columns[col]) + (r) + " ";
            break;
        }
        pos += (columns[col]) + (r) + " ";
    }

    return pos;
}
function getKnightMoves(row, column, columns, color){
    pos = "";
    rows = new Array();
    cols = new Array();
    rows[0] = row -2;
    cols[0] = column +1;
    rows[1] = row -2;
    cols[1] = column -1;
    rows[2] = row -1;
    cols[2] = column -2;
    rows[3] = row - 1;
    cols[3] = column + 2;
    rows[4] = row +1;
    cols[4] = column -2;
    rows[5] = row +1;
    cols[5] = column +2;
    rows[6] = row +2;
    cols[6] = column -1;
    rows[7] = row +2;
    cols[7] = column +1;
    for(i=0; i<8; i++){
        if(!(rows[i] < 1 || cols[i] < 1 || rows[i] > 8 || cols[i] > 8 || $('#' + columns[cols[i]] + rows[i]).attr('color') == color))
            pos = pos + columns[cols[i]] + rows[i] + " ";
    }
    return pos;
}

function isCheck(posPiece , kingColor){
    check = false;
    columns = new Array('','a' , 'b', 'c', 'd' , 'e', 'f', 'g' , 'h');
    if(isWhiteDown){
        columns = new Array('','h' , 'g', 'f', 'e' , 'd', 'c', 'b' , 'a');
    }
    row = parseInt(posPiece.charAt(1));
    column = parseInt(columns.indexOf(posPiece.charAt(0), 0));
    otherColor = 'black';
    rowA = row - 1;
    if(kingColor == 'black'){
        otherColor = 'white';
        rowA = row + 1;
    }
    if(isNaN(row) || column<1 || column>8 || $.trim(posPiece).length != 2){
        alert('invalid');
        return false;
    }
    //for pawn
    //    $('body').append('<br/>' + columns[column] + row + ' ' + columns[column - 1] + rowA + ' ' + columns[column + 1] + rowA + ' ' + otherColor + ($('#' + columns[column - 1] + rowA).attr('color') == otherColor && $('#' + columns[column - 1] + rowA).attr('piece') == 'pawn') + ' ' + ($('#' + columns[column + 1] + rowA).attr('color') == otherColor && $('#' + columns[column + 1] + rowA).attr('piece') == 'pawn'));
    else if(($('#' + columns[column - 1] + rowA).attr('color') == otherColor && $('#' + columns[column - 1] + rowA).attr('piece') == 'pawn')){
        check = true;
    }
    else if(($('#' + columns[column + 1] + rowA).attr('color') == otherColor && $('#' + columns[column + 1] + rowA).attr('piece') == 'pawn')){
        check = true;
    }
    //for knight
    else if(($('#' + columns[column + 1] + (row + 2)).attr('color') == otherColor && $('#' + columns[column + 1] + (row + 2)).attr('piece') == 'knight')){
        check = true;
    }
    else if(($('#' + columns[column - 1] + (row + 2)).attr('color') == otherColor && $('#' + columns[column - 1] + (row + 2)).attr('piece') == 'knight')){
        check = true;
    }
    else if(($('#' + columns[column - 2] + (row + 1)).attr('color') == otherColor && $('#' + columns[column - 2] + (row + 1)).attr('piece') == 'knight')){
        check = true;
    }
    else if(($('#' + columns[column + 2] + (row + 1)).attr('color') == otherColor && $('#' + columns[column + 2] + (row + 1)).attr('piece') == 'knight')){
        check = true;
    }
    else if(($('#' + columns[column - 1] + (row - 2)).attr('color') == otherColor && $('#' + columns[column - 1] + (row - 2)).attr('piece') == 'knight')){
        check = true;
    }
    else if(($('#' + columns[column + 1] + (row - 2)).attr('color') == otherColor && $('#' + columns[column + 1] + (row - 2)).attr('piece') == 'knight') || ($('#' + columns[column - 2] + (row  - 1)).attr('color') == otherColor && $('#' + columns[column - 2] + (row - 1)).attr('piece') == 'knight') || ($('#' + columns[column + 2] + (row - 1)).attr('color') == otherColor && $('#' + columns[column + 2] + (row - 1)).attr('piece') == 'knight')){
        check = true;
    }
    else if(($('#' + columns[column - 2] + (row - 1)).attr('color') == otherColor && $('#' + columns[column - 2] + (row - 1)).attr('piece') == 'knight')){
        check = true;
    }
    else if(($('#' + columns[column + 2] + (row - 1)).attr('color') == otherColor && $('#' + columns[column + 2] + (row - 1)).attr('piece') == 'knight')){
        check = true;
    }
    //for King
    else if(($('#' + columns[column - 1] + (row + 1)).attr('color') == otherColor && $('#' + columns[column - 1] + (row + 1)).attr('piece') == 'king')){
        check = true;
    }
    else if(($('#' + columns[column] + (row + 1)).attr('color') == otherColor && $('#' + columns[column] + (row + 1)).attr('piece') == 'king')){
        check = true;
    }
    else if(($('#' + columns[column + 1] + (row + 1)).attr('color') == otherColor && $('#' + columns[column + 1] + (row + 1)).attr('piece') == 'king')){
        check = true;
    }   
    else if(($('#' + columns[column + 1] + (row)).attr('color') == otherColor && $('#' + columns[column + 1] + (row)).attr('piece') == 'king')){
        check = true;
    }    
    else if(($('#' + columns[column - 1] + (row)).attr('color') == otherColor && $('#' + columns[column - 1] + (row)).attr('piece') == 'king')){
        check = true;
    }    
    else if(($('#' + columns[column + 1] + (row - 1)).attr('color') == otherColor && $('#' + columns[column + 1] + (row - 1)).attr('piece') == 'king')){
        check = true;
    }    
    else if(($('#' + columns[column - 1] + (row - 1)).attr('color') == otherColor && $('#' + columns[column - 1] + (row - 1)).attr('piece') == 'king')){
        check = true;
    }    
    else if(($('#' + columns[column] + (row - 1)).attr('color') == otherColor && $('#' + columns[column] + (row - 1)).attr('piece') == 'king')){
        check = true;
    }
    //for bishop
    if(!check){
        strPos = getBishopMoves(row, column, columns, kingColor);
        //strPos = $.trim(strPos);
        //strPos = getAllowedPositions(posPiece, kingColor, 'king');
        //alert(str);
        //strPos = "c6 b5 a4 e6 f5 g4 h3";
        strPos = getPosSelector(strPos);
        //strPos = strPos.replace(/ /g, ",#");
        //$("body").append('<br/>' + strPos);
        if(strPos!='#'){
            try{
                $(strPos).each(function(){
                    if($(this).attr('piece')){
                        if(($(this).attr('piece') == 'bishop' || $(this).attr('piece') == 'queen') && $(this).attr('color') == otherColor){
                            //alert($(this).attr('id'));
                            check = true;
                        }
                    }
                });
            }
            catch(ex) {}//alert('saala comma ');}
        }
    }
    //for rook
    if(!check){
        strPos = getRookMoves(row, column, columns, kingColor);
        //strPos = $.trim(strPos);
        //strPos = getAllowedPositions(posPiece, kingColor, 'king');
        //alert(str);
        //strPos = "c6 b5 a4 e6 f5 g4 h3";
        strPos = getPosSelector(strPos);
        //strPos = strPos.replace(/ /g, ",#");
        //$("body").append('<br/>' + strPos);
        if(strPos!='#'){
            try{
                $(strPos).each(function(){
                    if($(this).attr('piece')){
                        if(($(this).attr('piece') == 'rook' || $(this).attr('piece') == 'queen') && $(this).attr('color') == otherColor){
                            //alert($(this).attr('id'));
                            check = true;
                        }
                    }
                });
            }
            catch(ex) {
            }//alert('saala comma ');}
        }


    //if(check){ alert('game lost');}
    }
    //final value
    //alert(check);
    return check;
}
function getPosSelector(str){
    //alert(str);
    str = $.trim(str).split(' ');
    //alert(str);
    str2 = "";
    for(i=0; i<str.length; i++){
        str2 += '#' + str[i] + ", ";
    }
    //alert (str2);
    str2 = $.trim(str2);
    if(str2.charAt(str2.length-1) == ',')
    {
        str2 = str2.substring(0, str2.length-1);
    }
    if(str2 == '#')
        str2 = '';
    return str2;
}

function flipTheBoard(){
    newIds = new Array();
    newColors = new Array();
    newPieces = new Array();
    if(!isWhiteDown){
        var columns = new Array('','h' , 'g', 'f', 'e' , 'd', 'c', 'b' , 'a');
        idCount = 0;
        for(index =1; index<=8; index++){
            for(ind = 1; ind<=8; ind++){
                newIds[idCount] = columns[ind] + index;
                newColors[idCount] = $('#' + newIds[idCount]).attr('color');
                newPieces[idCount] = $('#' + newIds[idCount]).attr('piece');
                idCount++;
            }
        }
        isWhiteDown = true;
    }
    else{
        var columns2 = new Array('','a' , 'b', 'c', 'd' , 'e', 'f', 'g' , 'h');
        idCount = 0;
        for(index =8; index>=1; index--){
            for(ind = 1; ind<=8; ind++){
                newIds[idCount] = columns2[ind] + index;
                newColors[idCount] = $('#' + newIds[idCount]).attr('color');
                newPieces[idCount] = $('#' + newIds[idCount]).attr('piece');
                idCount++;
            }
        }
        isWhiteDown = false;
    }
    index = 0;

    

    $('.wrapper>div>div[id!=hiddenHelper]').css('display' , 'none').each( function(){
        $(this).attr('id', newIds[index]);
        if(newColors[index] && newPieces[index]){
            $(this).attr('color', newColors[index]) ;
            $(this).attr('piece', newPieces[index]);
            $(this).removeClass().addClass('chess_piece Column ' + newColors[index] + " " + newPieces[index])
        }
        else{
            $(this).removeClass().addClass('Column').removeAttr('piece').removeAttr('color');
        }
        index++;
        setColors();
    }).fadeIn('slow');
    //$('#hiddenHelper').removeClass('white').removeClass('black').addClass(currentColor);

    $('#hiddenHelper').removeClass().addClass('Column');
    $('.wrapper>div>div').draggable().draggable('destroy').droppable().droppable('destroy');
    makeDraggables(currentColor);
    displayBoardMarks();
//setColors();
}
function playSounds(src){
    $('audio').remove();
    var elem = document.createElement('audio');
    var canPlayAudio = !!elem.canPlayType && elem.canPlayType('audio/ogg; codecs="vorbis"');
    if(canPlayAudio){
        $('body').append($('<audio id="sound_player">').attr('src', APP_URL + src));
        $('#sound_player').get(0).play();
    }
}

function displayBoardMarks(){
    
    $('.numberMarks').html('');
    $('.alphaMarks').html('');
    letters = ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'];
    if(!isWhiteDown) {        
        for(i=8;i>0;i--){
            $('.alphaMarks').append($('<div>').addClass('chess_mark').text(letters[i-1]).css({
                'margin-left' : '58px' ,
                'float' : 'left'
            }));
            $('.alphaMarks>div').eq(0).css({
                'margin-left' : '28px'
            });
            $('.numberMarks').append($('<div>').addClass('chess_mark').text(i).css({
                'margin-top' : '50px'
            }));
            $('.numberMarks>div').eq(0).css({
                'margin-top' : '20px'
            });
        }
    } else {        
        for(i=1;i<9;i++){
            $('.alphaMarks').append($('<div>').addClass('chess_mark').text(letters[i-1]).css({
                'margin-left' : '58px' ,
                'float' : 'left'
            }));
            $('.alphaMarks>div').eq(0).css({
                'margin-left' : '28px'
            });
            $('.numberMarks').append($('<div>').addClass('chess_mark').text(i).css({
                'margin-top' : '52px'
            }));
            $('.numberMarks>div').eq(0).css({
                'margin-top' : '20px'
            });
        }
    }
}

function move(from, to){    
if(!from.attr('color')){
return;
}
    //alert(from + " " + to);
    color = from.attr('color');    
    piece = from.attr('piece');
    if(piece == 'pawn' && (to.parent().attr('id') == '1' || to.parent().attr('id') == '8')){        
        strCB = "<div class='A Column chess_piece queen " + color + "'  piece ='queen' color='" + color + "' ></div><div class='B Column chess_piece knight " + color + "'  piece ='knight' color='" + color + "' ></div><div class='C Column chess_piece rook " + color + "' piece ='rook' color='" + color + "' ></div><div class='D Column chess_piece bishop " + color + "' piece ='bishop' color='" + color + "' ></div>";
        //strCB = "<div id='box'>hello</div>";
        //$('body').append(strCB);
        $('#box').html(strCB);       
        $('#box>div[color=' + color+']').bind('click' , function(){
            to.removeClass().addClass('Column chess_piece ' + $(this).attr('color') + " " + $(this).attr('piece')).attr('piece', $(this).attr('piece')).attr('color', $(this).attr('color'));
            $.colorbox.close();
        });
        $.colorbox({
            inline: true,
            title : 'Select Piece',
            overlayClose: false,
            escKey: false,
            arrowKey: false,
            href : '#box',
            height : '145px',
            width : '305px',
            open : true,
            onOpen : function(){
                $('#cboxClose').remove();
            }
        });
    }
    if(to.attr('piece'))
        playSounds('sounds/aah.ogg');
    else
        playSounds('sounds/alert.ogg');
    if(currentColor=='white'){
        currentColor = 'black';        
    }
    else{
        currentColor ='white';
    }
    $('.clock_' + color ).removeClass('clock_running');
    $('.clock_' + currentColor).addClass('clock_running');
    $('#statusPiece').removeClass(color).addClass(currentColor);
    $('#statusMessage').html( currentColor.toUpperCase() + ' moves');
    $('#systemMessage').html( getOtherColor(currentColor).toUpperCase() + ' waiting');
    if(to.attr('piece')){
        $('#' +currentColor+ 'Graveyard').html($('#' +currentColor+ 'Graveyard').html() + "<div class='tomb'><div class='chess_piece " + to.attr('piece') + " " + currentColor+ "'></div></div>");
    }
    to.attr('color' , getOtherColor(currentColor)).attr('piece', piece).removeClass();
    from.removeClass().removeAttr('color').removeAttr('piece').addClass('Column');
    $('.wrapper>div>div').draggable().draggable('destroy').droppable().droppable('destroy');
    unbind();
    makeDraggables(currentColor);
    setColors();
    $('#hiddenHelper').removeClass().addClass('Column');
    $('.clock_' + color).html(mns + ':00');
	
	recordMove(gameID, player, from.attr('id'), to.attr('id'));
}

function setTimers(timer, args){
    //var totalSecs = minutesToWait * 60;
    strTime = $('.clock_'+currentColor).html();
    strTime = strTime.split(':');
    mins = strTime[0];
    secs = strTime[1];
    if(mins.charAt(0) == '0'){
        mins = parseInt(mins.charAt(1));
    }
    if(secs.charAt(0) == '0'){
        secs = parseInt(secs.charAt(1));
    }
    mins = parseInt(mins);
    secs = parseInt(secs);
    remainingSecs = mins * 60 + secs - 1;
    // alert(mins + '*' + '60 + ' + secs + ' - 1 =' + remainingSecs);
    if(remainingSecs == 0){
        color = 'black';
        if(currentColor == 'black'){
            color = 'white';
        }
        timer.stop();
		

			var _URL_ENGINE2 = "" +APP_URL + "_engine/";
			uri2 = _URL_ENGINE2 + "?m=timeout&gameID=" + gameID;
			//alert  (uri2);
			$("#etc").html(uri2);
			 $.ajax({
			  type: "post",
			  url: uri2,
			   beforeSend:function(request){ },
					success: function (html) { 						
					}    
			 });

			 
		
        $('.clock_' + currentColor).addClass('clock_outoftime');
        $('#statusMessage').html( currentColor.toUpperCase() + ' was timed out');
        $('#systemMessage').html( color.toUpperCase() + ' is victorious');
        $('div').draggable().draggable('destroy');
        $('#hiddenHelper').remove();
        $('.wrapper>div>div').unbind('mouseenter mouseleave').not('.ui-draggabe').css('cursor' , 'auto');
        unbind();
        setColors();
    }
    displaySecs = remainingSecs % 60;
    displayMinutes = parseInt(remainingSecs/60);
    //alert(displayMinutes);
    if(displaySecs % 10 == displaySecs){
        displaySecs = '0' + displaySecs;
    }
    if(displayMinutes % 10 == displayMinutes){
        displayMinutes = '0' + displayMinutes;
    }
    $('.clock_' + currentColor).html(displayMinutes + ':' + displaySecs);
//alert(displayMinutes + ':' + displaySecs);
}

function isCheckmate(){
    var AllPositions = "";
    notAllowed = "";
    kingId = $('.wrapper>div>div[piece=king][color=' + currentColor + ']').attr('id');
    alert(kingId);
    kingMoves ="";
    $(".wrapper>div>div[color=" + currentColor +  "]").each(function(){
        pieceId = $(this).attr('id');
        pieceColor = $(this).attr('color');
        pieceName = $(this).attr('piece');
        position  = getAllowedPositions(pieceId, pieceColor, pieceName);
        totalPos = position.split(' ');
        //alert(position);
        $('#' + pieceId).removeAttr('piece').removeAttr('color');
        //alert(kingId + ' ' + pieceColor);
        //alert('Selector: ' + position);
        if(pieceName != 'king' && position!=''){
            $(getPosSelector(position)).each(function(){
                pc = $(this).attr('piece');
                clr = $(this).attr('color');
                //alert(pieceId + pc + clr);
                $(this).attr('piece' , pieceName).attr('color' , pieceColor);
                if(isCheck(kingId, pieceColor)){
                    notAllowed += $(this).attr('id') + ' ';
                //alert(notAllowed);
                }
                if(pc){
                    $(this).attr('piece' , pc).attr('color' , clr);
                }
                else {
                    $(this).removeAttr('piece').removeAttr('color');
                }
                
            });
        }
        else if(pieceName == 'king'){
            notAllowed += $.trim(position) + ' ';
            kingMoves = position;
        }
        //alert(pieceId + ' NOt allowed:' + notAllowed);
        notAllowedPos = $.trim(notAllowed).split(' ');
        //alert('Total: ' + position + ' ' + totalPos.length + ' Not Allowed:' + notAllowed + ' ' + notAllowedPos.length);
        if(notAllowedPos.length!=0 && notAllowedPos[0]!=""){
            //totalPos = new Array();
            position = "";
            for(i=0;i<totalPos.length;i++){
                if(notAllowedPos.indexOf(totalPos[i]) == -1 && parseInt(totalPos[i].charAt(1)) > 0 && parseInt(totalPos[i].charAt(1)) <9 && totalPos[i].length == 2){
                    position += totalPos[i] + ' ';
                //alert(position);
                }
            }
            $(getPosSelector(kingMoves)).each(function(){
                if($(this).attr('color') == getOtherColor(currentColor)){
                    pc = $(this).attr('piece');
                    clr = $(this).attr('color');
                    $(this).removeAttr('color');
                    $(this).removeAttr('piece');
                    if(!isCheck(kingId, currentColor)){
                        position += $(this).attr('id') + ' ';
                    }
                    $(this).attr('piece' , pc);
                    $(this).attr('color' , clr);
                }
            });
        //alert('Total Allowed: ' + position);
        }

        $(this).attr('piece' , pieceName).attr('color' , pieceColor);
        AllPositions += position;

    });
    if($.trim(AllPositions) == ''){
        return true;
    }
    else
        return false;
}

function getOtherColor(color){
    if(color== 'white')
        return 'black';
    else
        return 'white';
}
function isStealmate(){
        var AllPositions = "";
    notAllowed = "";
    kingId = $('.wrapper>div>div[piece=king][color=' + currentColor + ']').attr('id');
    $(".wrapper>div>div[color=" + currentColor +  "][piece!=king]").each(function(){
        pieceId = $(this).attr('id');
        pieceColor = $(this).attr('color');
        pieceName = $(this).attr('piece');
        position  = getAllowedPositions(pieceId, pieceColor, pieceName);
        totalPos = position.split(' ');
        //alert(position);
        $('#' + pieceId).removeAttr('piece').removeAttr('color');
        //alert(kingId + ' ' + pieceColor);
        //alert('Selector: ' + position);
        if(position!=''){
            $(getPosSelector(position)).each(function(){
                pc = $(this).attr('piece');
                clr = $(this).attr('color');
                //alert(pieceId + pc + clr);
                $(this).attr('piece' , pieceName).attr('color' , pieceColor);
                if(isCheck(kingId, pieceColor)){
                    notAllowed += $(this).attr('id') + ' ';
                    //alert(notAllowed);
                }
                if(pc){
                    $(this).attr('piece' , pc).attr('color' , clr);
                }
                else {
                    $(this).removeAttr('piece').removeAttr('color');
                }

            });
        }
        //alert(pieceId + ' NOt allowed:' + notAllowed);
        notAllowedPos = $.trim(notAllowed).split(' ');
        //alert('Total: ' + position + ' ' + totalPos.length + ' Not Allowed:' + notAllowed + ' ' + notAllowedPos.length);
        if(notAllowedPos.length!=0 && notAllowedPos[0]!=""){
            //totalPos = new Array();
            position = "";
            for(i=0;i<totalPos.length;i++){
                if(notAllowedPos.indexOf(totalPos[i]) == -1 && parseInt(totalPos[i].charAt(1)) > 0 && parseInt(totalPos[i].charAt(1)) <9 && totalPos[i].length == 2){
                    position += totalPos[i] + ' ';
                    //alert(position);
                }
            }
        //alert('Total Allowed: ' + position);
        }

        $(this).attr('piece' , pieceName).attr('color' , pieceColor);
        AllPositions += position;

    });
    if($.trim(AllPositions) == ''){
        if($.trim(getAllowedPositions($('.wrapper>div>div[piece=king][color=' + currentColor + ']').attr('id'), currentColor, 'king'))== ""){
            return true;
        }
        else{
            return false;

        }
    }
    else
        return false;
}
function getOtherColor(currentColor){
	if(currentColor == "white")
	return 'black';
	else
	return 'white';
}